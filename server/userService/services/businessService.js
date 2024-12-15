const axios = require("axios")

const getBusinessById = async (businessId) => {
    try {
        const response = await axios.get(
            `http://localhost:5001/api/business/${businessId}`
        )
        return response.data
    } catch (error) {
        console.error(
            `Failed to fetch business with ID ${businessId} from business service:`,
            error.message
        )
        throw new Error("Failed to fetch business from business service")
    }
}

module.exports = {
    getBusinessById,
}
