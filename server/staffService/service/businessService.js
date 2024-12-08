// businessService/services/authService.js
const axios = require('axios')

const getBusinessById = async (businessId) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/business/${businessId}`)
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch user from businessService')
    }
}
const updateBusiness = async (businessId, updateData) => {
    try {
        const response = await axios.put(`http://localhost:5001/api/business/${businessId}`, updateData)
        return response.data
    } catch (error) {
        throw new Error('Failed to update business in businessService')
    }
}

module.exports = {
    getBusinessById,
    updateBusiness,
}
