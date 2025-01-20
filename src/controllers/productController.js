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
