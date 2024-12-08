const axios = require("axios")

const getStaffById = async (staffId) => {
    try {
        const response = await axios.get(
            `http://localhost:5002/api/staff/${staffId}`
        )
        return response.data
    } catch (error) {
        console.error(
            `Failed to fetch staff for ${staffId} from staff service`,
            error.massage
        )

        throw new Error("Failed to fetch staff from staffService")
    }
}

module.exports = {
    getStaffById,
}