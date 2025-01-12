const Staff = require("../models/Staff");
const {
    getBusinessById,
    updateBusiness,
} = require("../service/businessService");
const createStaff = async (req, res) => {
    const { surname, name, patronymic, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newStaff = new Staff({
            surname,
            name,
            patronymic,
            email,
            phone,
            password: hashedPassword,
        });
        await newStaff.save();
        const payload ={
            staffId: newStaff._id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1y",
        });
        res.status(201).json({token});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json(staff);
    } catch (error) {
        console.error(`Error fetching staff with ID ${id}`, error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createStaff,
    getStaff,
};
