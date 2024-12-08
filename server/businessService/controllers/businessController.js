const axios = require("axios")

const Business = require("../models/Business")
const Category = require("../models/Category")
const { getUserById } = require("../services/userService")
const { getStaffById } = require("../services/staffService")

// Создание нового бизнеса
const createBusiness = async (req, res) => {
    const { name, description, category, address, phone, email, userId } = req.body
    console.log(req.body)

    try {
        // Проверка существования категории
        const categoryExists = await Category.findById(category)
        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist" })
        }

        // Получение информации о пользователе
        const user = await getUserById(userId)
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        // Создание нового бизнеса
        const newBusiness = new Business({
            name,
            description,
            category,
            address,
            phone,
            email,
        })
        
        // Инициализация businessId, если оно не существует
        const businessIds = user.businessId || []
        const savedBusiness = await newBusiness.save()
        console.log('Business: ', savedBusiness)

        // Обновление информации о пользователе с использованием axios
        const updatedUser = {
            businessId: [...businessIds, savedBusiness._id],
            role: "business",
        }
        console.log(updatedUser)

        await axios.put(
            `http://localhost:5000/api/users/${userId}`,
            updatedUser
        )

        res.status(201).json(savedBusiness)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}


const getBusiness = async (req, res) => {
    const { id } = req.params
    
    try {
        const business = await Business.findById(id).populate("category")
        if (!business) {
            return res.status(404).json({ message: "Business not found" })
        }
        res.status(200).json(business)
    } catch (error) {
        console.error(`Error fetching business with ID ${id}:`, error)
        res.status(400).json({ message: error.message })
    }
}
const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find().populate("category")
        res.status(200).json(businesses)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const updateBusiness = async (req, res) => {
    const { id } = req.params
    const updatedBusiness = req.body
    
    try {
        const business = await Business.findByIdAndUpdate(id, updatedBusiness, { new: true })
        if (!business) {
            return res.status(404).json({ message: "Business not found" })
        }
        res.status(200).json(business)
    } catch (error) {
        console.error(`Error updating business with ID ${id}:`, error)
        res.status(400).json({ message: error.message })
    }
}

const getBusinessStaffs = async (req, res) =>{
    try {
        const {id} = req.params
        const business = await Business.findById(id)
        if(!business){
            return res.status(404).json({message: 'Business not found'})
        }
        const staffPromises = business.staffId.map(async (staffId) =>{
            return await getStaffById(staffId)
        })
        const staffs = await Promise.all(staffPromises)
        res.status(200).json(staffs)
    } catch (error) {
        console.error(`Error in getBusinessStaffs: ${error}`)
        res.status(500).json({message: 'Failed to get staffs businessId'})
    }
}

module.exports = {
    createBusiness,
    getBusiness,
    getAllBusinesses,
    updateBusiness,
    getBusinessStaffs,
}
