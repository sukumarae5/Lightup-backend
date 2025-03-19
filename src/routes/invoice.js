const express = require('express');
const router = express.Router();
const db = require('../config/db');
const pdf = require('html-pdf');

router.get('/invoice/pdf/:transaction_id', async (req, res) => {
    const { transaction_id } = req.params;

    try {
        const [paymentInfo] = await db.query(
            `SELECT 
                pay.transaction_id,
                pay.payment_method,
                pay.payment_status,
                pay.amount,
                pay.created_at,
                u.id AS user_id,
                u.name AS customer_name,
                u.phone_number
            FROM payments pay
            JOIN users u ON pay.user_id = u.id
            WHERE pay.transaction_id = ?
            ORDER BY pay.created_at DESC
            LIMIT 1`, 
            [transaction_id]
        );

        if (paymentInfo.length === 0) return res.status(404).json({ message: 'Invoice not found' });

        const generalInfo = {
            transaction_id: paymentInfo[0].transaction_id,
            payment_method: paymentInfo[0].payment_method,
            payment_status: paymentInfo[0].payment_status,
            amount: paymentInfo[0].amount,
            created_at: paymentInfo[0].created_at,
            customer_name: paymentInfo[0].customer_name,
            phone_number: paymentInfo[0].phone_number
        };

        // Fetch latest order for the user
        const [orderInfo] = await db.query(
            `SELECT o.id AS order_id
            FROM orders o
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
            LIMIT 1`, 
            [paymentInfo[0].user_id] 
        );

        if (orderInfo.length === 0) return res.status(404).json({ message: 'No orders found for this payment' });

        const orderId = orderInfo[0].order_id;

        // Fetch order items including price
        const [products] = await db.query(
            `SELECT pr.name AS product_name, oi.quantity, pr.price, (oi.quantity * pr.price) AS total_price
            FROM order_items oi
            JOIN products pr ON pr.id = oi.product_id
            WHERE oi.order_id = ?`, 
            [orderId]
        );

        let totalAmount = products.reduce((sum, p) => sum + p.total_price, 0);

        // HTML template for PDF
        const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="text-align: center; color: #333;">LightUp</h1>
            <h2 style="text-align: center;">Invoice</h2>
            <p><strong>Transaction ID:</strong> ${generalInfo.transaction_id}</p>
            <p><strong>Customer Name:</strong> ${generalInfo.customer_name}</p>
            <p><strong>Phone Number:</strong> ${generalInfo.phone_number}</p>
            <p><strong>Payment Method:</strong> ${generalInfo.payment_method}</p>
            <p><strong>Status:</strong> ${generalInfo.payment_status}</p>
            <p><strong>Paid On:</strong> ${new Date(generalInfo.created_at).toLocaleString()}</p>
            <h3>Items Purchased:</h3>
            <table border="1" cellspacing="0" cellpadding="8" width="100%" style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price (₹)</th>
                        <th>Total (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map((p, index) => `
                        <tr>
                            <td style="text-align: center;">${index + 1}</td>
                            <td>${p.product_name}</td>
                            <td style="text-align: center;">${p.quantity}</td>
                            <td style="text-align: center;">${p.price.toLocaleString('en-IN')}</td>
                            <td style="text-align: center;">${p.total_price.toLocaleString('en-IN')}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="4" style="text-align: right; font-weight: bold;">Grand Total:</td>
                        <td style="text-align: center; font-weight: bold;">₹${totalAmount.toLocaleString('en-IN')}</td>
                    </tr>
                </tbody>
            </table>
            <p style="margin-top: 20px; text-align: center;">Thank you for shopping with LightUp!</p>
        </div>
    `;
    

        pdf.create(htmlContent, { format: 'A4' }).toStream((err, stream) => {
            if (err) {
                console.error('PDF generation error:', err);
                return res.status(500).json({ message: 'Failed to generate PDF' });
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=Invoice_${transaction_id}.pdf`);
            stream.pipe(res);
        });

    } catch (error) {
        console.error('Error generating invoice:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
