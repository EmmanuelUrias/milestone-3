const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user.js')
const goalRoutes = require('./routes/goal')
const expenseRoutes = require('./routes/expense')
//const path = require('path')

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

if(process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
}

//Routes 
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/goal', goalRoutes)
app.use('/expense', expenseRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Your running on ${process.env.PORT} 😼`)
})