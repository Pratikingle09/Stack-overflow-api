const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoutes = require('./routes/users')
const questionRoutes = require('./routes/Questions')
const answerRoutes = require('./routes/Answers')
dotenv.config()

const app = express()

app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)

app.get('/',(req,res)=>{
    res.send("this is a stack overflow clone api")
})


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is running on ${PORT}`)
    })
}).catch((err)=>{
    console.log(err.message)
})


