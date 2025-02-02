const Business = require("../models/Business");
const Service = require("../models/Service");

const createService = async (req, res) => {
    const { name, description, duration, price, businessId } = req.body;
    try {
        const business = await Business.findById(businessId);
        if (!business) {            
            return res.status(400).json({ message: "Business does not exist" });
        }
        const newService = new Service({
            name,
            description, 
            duration,
            price,
            businessId
        })        
        const savedService = await newService.save()        
        res.status(201).json(savedService)
    } catch (err) {
        console.log(err);
        
        res.status(400).json({ message: err.message });
    }
};
const getServicesByBusinessId = async (req, res) => {
    const { id } = req.params;
    try {        
        const services = await Service.find({ businessId:id });
        res.status(200).json(services);
    } catch (err) {
        console.error(`Service does not exist: ${err.message}`);
        
        res.status(400).json({ message: err.message });
    }
}
const updateService = async (req, res) => {
    const { serviceId } = req.params;
    const updateData = req.body;

    try {
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        Object.assign(service, updateData);
        const updatedService = await service.save();

        res.status(200).json(updatedService);
    } catch (err) {
        console.error("Error updating service:", err);
        res.status(400).json({ message: err.message });
    }
};

// Удаление услуги
const deleteService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const service = await Service.findByIdAndDelete(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (err) {
        console.error("Error deleting service:", err);
        res.status(400).json({ message: err.message });
    }
};
module.exports={
    createService,
    getServicesByBusinessId,
    deleteService,
    updateService,
}