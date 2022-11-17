const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 6000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server started on ${port}`))