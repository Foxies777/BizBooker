const Staff = require("../models/Staff")
const { getBusinessById, updateBusiness } = require("../service/businessService")
const addStaff = async (req, res) => {
    const { name, email, phone, service, businessId } = req.body
    console.log(req.body)

    try {
        const business = await getBusinessById(businessId)
        if (!business) {
            return res.status(400).json({ message: "Business does not exist" })
        }
        const staffBusinesses = Staff.businessIds || []
        if (staffBusinesses.includes(businessId)) {
            return res.status(400).json({ message: "Staff already exists for this business" })
        }
        const addStaffBusiness = [...staffBusinesses, businessId]
        const newStaff = new Staff({
            name,
            email,
            phone,
            service,
            businessId: addStaffBusiness,

        })
        const staffIds = business.staffId || []
        const savedStaff = await newStaff.save()
        const updatedBusiness = {
            staffId: [...staffIds, savedStaff._id],
        }
        await updateBusiness(businessId, updatedBusiness)

        res.status(201).json(savedStaff)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }
}

const getStaff = async (req, res) =>{
    const {id} = req.params
    try {
        const staff = await Staff.findById(id)
        if(!staff){
            return res.status(404).json({message: "Staff not found"})
        }
        res.status(200).json(staff)
    } catch (error) {
        console.error(`Error fetching staff with ID ${id}`, error)
        res.status(400).json({message: error.message})        
    }
}

module.exports = {
    addStaff,
    getStaff,
}