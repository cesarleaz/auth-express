import './db.js'
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";

import { authRouter } from './routes/auth.router.js'

import { PORT } from './config.js'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
