const express = require("express");
const router = express.Router();
const {
    sendInvitation,
    sendVerificationCode,
    verifyCodeAndAcceptInvitation,
    getUserInvitations
} = require("../controllers/inviteController");

router.post("/send", sendInvitation);
router.post("/accept", sendVerificationCode);
router.post("/verify", verifyCodeAndAcceptInvitation);
router.get("/user/:userId", getUserInvitations);

module.exports = router;
