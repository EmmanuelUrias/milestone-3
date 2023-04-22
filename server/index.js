
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const authRoutes = require('./routes/auth.js')

// import { fileURLToPath } from 'url'
// import path from 'path'

// Configurations
// const __filename = fileURLToPath(import.meta.url) <-- may delete later
// const __dirname = path.dirname(__filename)

// Middleware
dotenv.config()
const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })) // allows cross origin reqs but can't access res content
app.use(morgan('common'))
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes 
app.use('/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Your running on ${process.env.PORT} 😼`)
})