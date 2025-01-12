const Invitation = require("../models/Invitation");
const VerificationCode = require("../models/VerificationCode");
const User = require("../models/User");
const StaffBusiness = require("../models/StaffBusiness");
const nodemailer = require("nodemailer");
const Business = require("../models/Business");

// Создание приглашения
const sendInvitation = async (req, res) => {
    try {
        const { email, phone, businessId } = req.body;

        if (!email && !phone) {
            return res
                .status(400)
                .send({ message: "Email или телефон обязателен." });
        }

        if (!businessId) {
            return res.status(400).send({ message: "Не указан бизнес." });
        }

        // Поиск пользователя
        const user = await User.findOne({ $or: [{ email }, { phone }] });

        if (!user) {
            return res.status(404).send({ message: "Пользователь не найден." });
        }
        if(user.role !== "staff"){
            return res.status(404).send({ message: "Пользователь не является сотрудником." });
        }
        // Проверка, является ли пользователь уже сотрудником указанного бизнеса
        const isAlreadyInBusiness = await StaffBusiness.findOne({
            staffId: user._id,
            businessId,
        });

        if (isAlreadyInBusiness) {
            return res
                .status(400)
                .send({ message: "Пользователь уже связан с этим бизнесом." });
        }

        // Создание приглашения
        const invitation = new Invitation({ userId: user._id, businessId });
        await invitation.save();

        console.log(invitation);

        res.status(200).send({ message: "Приглашение успешно отправлено." });
    } catch (error) {
        console.error("Ошибка при создании приглашения:", error);
        res.status(500).send({ message: "Внутренняя ошибка сервера." });
    }
};


// Отправка кода на email
const sendVerificationCode = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId);
        
        if (!userId) {
            return res.status(400).send({ message: "Не указан ID пользователя." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "Пользователь не найден." });
        }

        const code = Math.floor(1000 + Math.random() * 9000).toString();

        const verificationCode = new VerificationCode({
            userId,
            code,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 минут
        });
        await verificationCode.save();

        const transporter = nodemailer.createTransport({
            service: "Yandex",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        console.log(transporter, 'eeee\n', code, 'eeee\n', user.email);
        
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Код подтверждения",
            html: `<p>Ваш код подтверждения: <b>${code}</b>. Он действителен в течение 10 минут.</p>`,
        });

        res.status(200).send({ message: "Код подтверждения отправлен." });
    } catch (error) {
        console.error("Ошибка при отправке кода:", error);
        res.status(500).send({ message: "Внутренняя ошибка сервера." });
    }
};


// Проверка кода
const verifyCodeAndAcceptInvitation = async (req, res) => {
    try {
        const { userId, code, businessId } = req.body;

        if (!userId || !code || !businessId) {
            return res
                .status(400)
                .send({ message: "Неполные данные запроса." });
        }
        
        const verificationCode = await VerificationCode.findOne({
            userId,
            code,
            expiresAt: { $gt: new Date() },
            isUsed: false,
        });
        
        if (!verificationCode) {
            console.log('Verification11111');
            
            return res
                .status(400)
                .send({ message: "Неверный или просроченный код." });
        }

        verificationCode.isUsed = true;
        await verificationCode.save();
        console.log('ok1');
        const invitation = await Invitation.findOne({
            userId,
            businessId,
            status: "pending",
        });
        
        if (!invitation) {
            return res.status(404).send({ message: "Приглашение не найдено." });
        }

        // Проверяем, нет ли уже связи между сотрудником и бизнесом
        const existingRelation = await StaffBusiness.findOne({
            staffId: userId,
            businessId,
        });
        
        if (existingRelation) {
            return res
                .status(400)
                .send({ message: "Пользователь уже связан с этим бизнесом." });
        }

        // Добавляем связь между сотрудником и бизнесом
        const staffBusiness = new StaffBusiness({
            staffId: userId,
            businessId,
        });
        await staffBusiness.save();
        console.log('ok2');
        invitation.status = "accepted";
        await invitation.save();

        res.status(200).send({
            message:
                "Приглашение успешно принято и пользователь добавлен в бизнес.",
        });
    } catch (error) {
        console.error("Ошибка при проверке кода и добавлении в бизнес:", error);
        res.status(500).send({ message: "Внутренняя ошибка сервера." });
    }
};

const getUserInvitations = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).send({ message: "ID пользователя обязателен." });
        }

        // Получаем приглашения и подтягиваем название бизнесов
        const invitations = await Invitation.find({ userId, status: "pending" })
            .populate("businessId", "name") // Подтягиваем поле name из бизнесов
            .exec();
        
        res.status(200).send( invitations );
    } catch (error) {
        console.error("Ошибка при получении приглашений:", error);
        res.status(500).send({ message: "Ошибка сервера." });
    }
};



module.exports = {
    sendInvitation,
    sendVerificationCode,
    verifyCodeAndAcceptInvitation,
    getUserInvitations
};
