import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import { fileURLToPath } from 'url'
import path from 'path'

// Configurations
// const __filename = fileURLToPath(import.meta.url) <-- may delete later
// const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })) // allows cross origin reqs but can't access res content
app.use(morgan('common'))
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Your running on ${process.env.PORT} 😼`)
})