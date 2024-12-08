const Category = require('../models/Category')

const createCategory = async (req, res) => {
    const { name } = req.body
    console.log(name)
    
    try {
        const newCategory = new Category({
            name,
        })

        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllCategories = async (req, res) => {
    console.log('Getting all categories')
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
        
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createCategory,
    getAllCategories,
}
