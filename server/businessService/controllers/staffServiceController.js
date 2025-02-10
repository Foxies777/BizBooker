const StaffService = require("../models/StaffService");
const Service = require("../models/Service");
const User = require("../models/User");

// Добавление услуг сотруднику
const addServicesToStaff = async (req, res) => {
    try {
        const { staffId, serviceIds } = req.body;

        if (!staffId || !serviceIds || !Array.isArray(serviceIds)) {
            return res
                .status(400)
                .send({ message: "staffId и serviceIds обязательны." });
        }

        const staff = await User.findById(staffId);
        if (!staff) {
            return res.status(404).send({ message: "Сотрудник не найден." });
        }

        const services = await Service.find({ _id: { $in: serviceIds } });
        if (services.length !== serviceIds.length) {
            return res
                .status(400)
                .send({ message: "Некоторые услуги не найдены." });
        }

        // Добавление услуг
        const staffServices = serviceIds.map((serviceId) => ({
            staffId,
            serviceId,
        }));
        console.log(staffServices);
        
        await StaffService.insertMany(staffServices);
        console.log('Успешно');
        
        res.status(200).send({ message: "Услуги успешно добавлены сотруднику." });
    } catch (error) {
        console.error("Ошибка при добавлении услуг сотруднику:", error);
        res.status(500).send({ message: "Ошибка сервера." });
    }
};
const updateServicesForStaff = async (req, res) => {
    try {
        const { staffId, serviceIds } = req.body;

        if (!staffId || !Array.isArray(serviceIds)) {
            return res.status(400).json({ message: "staffId и serviceIds обязательны." });
        }

        const staff = await User.findById(staffId);
        if (!staff) {
            return res.status(404).json({ message: "Сотрудник не найден." });
        }

        const services = await Service.find({ _id: { $in: serviceIds } });
        if (services.length !== serviceIds.length) {
            return res.status(400).json({ message: "Некоторые услуги не найдены." });
        }

        // Удаляем старые услуги сотрудника
        await StaffService.deleteMany({ staffId });

        // Добавляем новые услуги
        const staffServices = serviceIds.map((serviceId) => ({
            staffId,
            serviceId,
        }));

        await StaffService.insertMany(staffServices);

        res.status(200).json({ message: "Услуги успешно обновлены." });
    } catch (error) {
        console.error("Ошибка при обновлении услуг сотрудника:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
};
// Получение всех услуг сотрудника
const getStaffServices = async (req, res) => {
    try {
        const { staffId } = req.params;

        const services = await StaffService.find({ staffId }).populate("serviceId");

        res.status(200).send(services);
    } catch (error) {
        console.error("Ошибка при получении услуг сотрудника:", error);
        res.status(500).send({ message: "Ошибка сервера." });
    }
};

module.exports = {
    addServicesToStaff,
    updateServicesForStaff,
    getStaffServices,
};
