const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const inviteRouter = require('./routes/inviteRoutes');
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
)

// Подключение к MongoDB
mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

app.use(bodyParser.json())

app.use("/api/invite", inviteRouter);
app.options('*', cors())

app.listen(PORT, () => {
    console.log(`BusinessService running on port ${PORT}`)
})