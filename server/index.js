import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from "./routes/ContactsRoutes.js"
import setupSocket from "./socket.js"

dotenv.config()
console.log("hi")
console.log('Allowed Origin:', process.env.ORIGIN);


const app = express()
const port = process.env.PORT || 3001
const databaseURL = process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ["GET","POST","PUT","PATCH","DELETE"],
        credentials:true,
    })
)

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes)

const server = app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`)
})

setupSocket(server)

mongoose.connect(databaseURL).then(() => console.log("db connection succesfull"))
    .catch(err => console.log(err.message))