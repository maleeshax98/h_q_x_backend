require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const quizRoutes = require("./routes/quizRoutes")

const app = express()

app.use(cors());
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/quizes", quizRoutes)


mongoose.connect(process.env.MONGO_URI, {
    dbName: 'quizx',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(4000, () => {
        console.log('connected to db & listeneing on port 4000')
    })
}).catch((Err) => {
    console.log(Err)
})
