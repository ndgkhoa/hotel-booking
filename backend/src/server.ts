import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db'
import authRoutes from './routes/auth'
import usersRoutes from './routes/users'
import hotelsRoutes from './routes/hotels'
import bookingsRoutes from './routes/bookings'
import cookieParser from 'cookie-parser'
import cloudinaryConfig from './config/cloudinary'
import path from 'path'

connectDB()
cloudinaryConfig()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/auth', authRoutes)
app.use('/api/hotels', hotelsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/bookings', bookingsRoutes)

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
