const User = require("../models/user")
const Booking = require("../models/Booking")
const Service = require("../models/Service")
const Business = require("../models/Business")
const { getBusinessById } = require("../services/businessService")




const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" })
    }
}

const createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" })
    }
}

const updateUser = async (req, res) => {
    console.log(req);
    
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (user) {
            res.status(204).send()
        } else {
            res.status(404).json({ error: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" })
    }
}

const getUserBusinesses = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const businessPromises = user.businessId.map(async (businessId) => {
            return await getBusinessById(businessId)
        })

        const businesses = await Promise.all(businessPromises)

        res.status(200).json(businesses)
    } catch (error) {
        console.error(`Error in getUserBusinesses: ${error}`)
        res.status(500).json({ message: "Failed to get user businesses" })
    }
}
const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        // Получаем все записи пользователя
        const userBookings = await Booking.find({ userId })
            .populate("serviceId", "name duration price") // Данные об услуге
            .populate("staffId", "name surname") // Данные о сотруднике
            .populate("businessId", "name") // Название бизнеса
            .lean();

        if (!userBookings.length) {
            return res.status(404).json({
                message: "Записи для данного пользователя не найдены.",
            });
        }

        // Форматируем данные перед отправкой
        const formattedBookings = userBookings.map((booking) => ({
            businessName: booking.businessId.name,
            serviceName: booking.serviceId.name,
            serviceDuration: booking.serviceId.duration,
            servicePrice: booking.serviceId.price,
            staffName: `${booking.staffId.surname} ${booking.staffId.name}`,
            date: new Date(booking.startTime).toLocaleDateString("ru-RU"),
            startTime: new Date(booking.startTime).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            endTime: new Date(booking.endTime).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            status: translateStatus(booking.status),
        }));

        res.status(200).json(formattedBookings);
    } catch (error) {
        console.error("Ошибка при получении записей пользователя:", error);
        res.status(500).json({ message: "Не удалось получить записи пользователя." });
    }
};

// Функция перевода статусов на русский
const translateStatus = (status) => {
    const statusMap = {
        pending: "Ожидает",
        confirmed: "Подтверждено",
        completed: "Завершено",
        canceled: "Отменено",
    };
    return statusMap[status] || "Неизвестный статус";
};
module.exports = {
    getUserBusinesses,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserBookings,
}
