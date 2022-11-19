const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5050
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server started on ${port}`))