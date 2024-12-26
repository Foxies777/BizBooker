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

module.exports={
    createService,
    getServicesByBusinessId,
}