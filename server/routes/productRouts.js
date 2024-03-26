const express = require('express')

const router = express.Router()

const Product = require('../models/productModel')
const User = require('../models/userTypeModel')

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})

router.get('/products-by-categories', async(req, res) => {
    try {
        const products = await Product.aggregate([
            { $match: {}},
            { $group: {
                _id: '$category',
                products: { $push: '$$ROOT'}
            }},
            { $project: { name: '$_id', products: 1, _id: 0}}
        ])
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})


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