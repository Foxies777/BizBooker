const axios = require("axios");
const Invitation = require("../models/Invitation");
const StaffBusiness = require("../models/StaffBusiness");
const Business = require("../models/Business");
const User = require("../models/User");
const StaffService = require("../models/StaffService");
const Category = require("../models/Category");
const { getUserById } = require("../services/userService");

// Создание нового бизнеса
const createBusiness = async (req, res) => {
    const { name, description, category, address, phone, email, userId } =
        req.body;
    console.log(req.body);

    try {
        // Проверка существования категории
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist" });
        }

        // Получение информации о пользователе
        const user = await getUserById(userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Создание нового бизнеса
        const newBusiness = new Business({
            name,
            description,
            category,
            address,
            phone,
            email,
        });

        // Инициализация businessId, если оно не существует
        const businessIds = user.businessId || [];
        const savedBusiness = await newBusiness.save();
        console.log("Business: ", savedBusiness);

        // Обновление информации о пользователе с использованием axios
        const updatedUser = {
            businessId: [...businessIds, savedBusiness._id],
            role: "business",
        };
        console.log(updatedUser);

        await axios.put(
            `http://localhost:5000/api/users/${userId}`,
            updatedUser
        );

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
        console.error(`Error fetching business with ID ${id}:`, error);
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
const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const updatedBusiness = req.body;

    try {
        const business = await Business.findByIdAndUpdate(id, updatedBusiness, {
            new: true,
        });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        res.status(200).json(business);
    } catch (error) {
        console.error(`Error updating business with ID ${id}:`, error);
        res.status(400).json({ message: error.message });
    }
};

const getBusinessStaff = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "ID бизнеса обязателен." });
        }

        const invitations = await Invitation.find({
            businessId: id,
            status: "pending",
        }).populate("userId", "name email phone");

        const staffRelations = await StaffBusiness.find({
            businessId: id,
        }).populate("staffId", "name email phone");

        // Получаем услуги для каждого сотрудника
        const staffServices = await StaffService.find({
            staffId: { $in: staffRelations.map((relation) => relation.staffId._id) },
        }).populate("serviceId", "name description");

        // Формируем данные для ответа
        const pendingStaff = invitations.map((invite) => ({
            id: invite._id,
            name: invite.userId?.name || "N/A",
            email: invite.userId?.email || "N/A",
            phone: invite.userId?.phone || "N/A",
            status: "pending",
        }));

        const activeStaff = staffRelations.map((relation) => {
            const services = staffServices
                .filter((service) => service.staffId.equals(relation.staffId._id))
                .map((service) => ({
                    id: service.serviceId._id,
                    name: service.serviceId.name
                }));

            return {
                id: relation.staffId._id,
                name: relation.staffId.name,
                email: relation.staffId.email,
                phone: relation.staffId.phone,
                status: "active",
                services,
            };
        });

        res.status(200).send({ pendingStaff, activeStaff });
    } catch (error) {
        console.error("Ошибка при получении сотрудников бизнеса:", error);
        res.status(500).send({ message: "Ошибка сервера." });
    }
};


// module.exports = { getBusinessStaff };

module.exports = {
    createBusiness,
    getBusiness,
    getAllBusinesses,
    updateBusiness,
    getBusinessStaff,
};
