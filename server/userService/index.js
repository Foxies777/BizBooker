const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
require("dotenv").config()

const app = express()

// Подключение к MongoDB
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

app.use(bodyParser.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
)

app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`UserService running on port ${PORT}`)
})
