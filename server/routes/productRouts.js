const express = require('express')

const router = express.Router()

const {Product} = require('../models/productModel')
const User = require('../models/userTypeModel')

router.get('/products', async (req, res) => {
    try {
        const { provideremail } = req.query;

        // If provider email is not provided in the query, return an error response
        if (!provideremail) {
            return res.status(400).json({ error: 'Provider email is required' });
        }

        // Fetch products from the database based on the provider email
        const products = await Product.find({ provideremail });

        // Send the products as a response
        res.status(200).json({ data: products });
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/products-by-categories', async (req, res) => {
    try {
        const { provideremail } = req.query;

        // If provider email is not provided in the query, return an error response
        if (!provideremail) {
            return res.status(400).json({ error: 'Provider email is required' });
        }

        // Aggregate to group products by category and filter by provider email
        const productsByCategories = await Product.aggregate([
            { $match: { provideremail } }, // Filter products by provider email
            {
                $group: {
                    _id: '$category',
                    products: { $push: '$$ROOT' }
                }
            },
            { $project: { name: '$_id', products: 1, _id: 0 } }
        ]);

        res.status(200).json({ data: productsByCategories });
    } catch (err) {
        console.error('Error fetching products by categories:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to add a new user
router.post('/add-user', async (req, res) => {
    try {
        const { email, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user=await User.create({email,role})

        res.status(200).json({msg: user});
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


    
});
module.exports = router