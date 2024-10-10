// businessService/services/authService.js
const axios = require('axios');

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user from authService');
    }
};

module.exports = {
    getUserById,
};
