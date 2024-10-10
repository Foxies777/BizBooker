const Business = require("../models/Business");
const Category = require("../models/Category");
const { getUserById } = require("../services/userService");

// Создание нового бизнеса
const createBusiness = async (req, res) => {
    const { name, description, category, address, phone, email, userId } =
        req.body;
    console.log(req.body);
    
    try {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist" });
        }

        // Получение информации о пользователе от authService
        const user = await getUserById(userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const newBusiness = new Business({
            name,
            description,
            category,
            address,
            phone,
            email,
        });

        const savedBusiness = await newBusiness.save();

        await axios.put(`http://localhost:5000/api/users/${userId}`, {
            businessId: savedBusiness._id,
        });

        res.status(201).json(savedBusiness);
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: error.message });
    }
};

const getBusiness = async (req, res) => {
    const { id } = req.params;

    try {
        const business = await Business.findById(id).populate("category");
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        res.status(200).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find().populate("category");
        res.status(200).json(businesses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBusiness,
    getBusiness,
    getAllBusinesses,
};
