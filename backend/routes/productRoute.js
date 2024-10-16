const express = require('express')
const Product = require('../models/productsModel');

const router = express.Router();

router.get('/', async (req, res) => {   // get all meds
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error getting products" });
    }
});

router.get('/:id', async (req, res)=>{      // get by the meds/id
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product)
            return res.status(404).json({message: "Product not found"})
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: "error retrieving product..",error})
    }
});

router.patch('/:id', async (req, res)=>{
    try {
        const productId = req.params.id;
        const updatedStock = req.body.stock;

        const product = await Product.findByIdAndUpdate(productId,
            {stock: updatedStock},
            {new: true}
        );
        if(!product)
            return res.status(404).json({message: "product not found"});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: "error retrieving product..",error})
    }
})

module.exports = router;