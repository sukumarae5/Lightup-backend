const productService=require('../services/productService')

exports.registerProducts =async (req,res) => {
 const {name,description,price,stock,image_url,category_id}=req.body;   
 if(!name || !description || !price || !stock || !image_url || !category_id){
    return res.status(400).json({
        error:'All fields (name,description,price,stock,image_url,category_id) are required'
    })
 }
 try {
    const productId= await productService.registerProduct({name,description,price,stock,image_url,category_id})

    res.status(201).json({message:'product registered successfully', productId})
 } catch (error) {
    console.error('error during registration', error.message)
    res.status(500).json({ error: 'Server error.',  });
 }
}

exports.getAllProducts = async (req,res) => {
    try {
        const products =await productService.fetchAllProducts();
        if(products.length===0){
            return res.status(404).json({message:'No products Found'})
        }
        res.status(200).json({products})
    } catch (error) {
        console.error('error fetching products', error)
        res.status(500).json({error:'server error'})
    }
}

exports.updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const { name, description, price, stock, image_url, category_id } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required in the URL.' });
    }

    if (!name || !description || !price || !stock || !image_url || !category_id) {
        return res.status(400).json({ error: 'All fields (name, description, price, stock, image_url, category_id) are required.' });
    }

    try {
        const result = await productService.updateProduct(productId, { name, description, price, stock, image_url, category_id });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found or no changes made.' });
        }

        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};

// **Delete Product**
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await productService.deleteProduct(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};