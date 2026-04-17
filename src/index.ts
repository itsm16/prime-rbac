import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './modules/auth/auth.route.js';
import jobRoutes from './modules/jobs/jobs.route.js';

const PORT = process.env.PORT || 3000;

const app = express()

// middlewares
app.use(cookieParser())
app.use(cors({origin: process.env.ORIGIN, credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)

app.get("/health", (req, res)=> {
    res.json({
        message: "runs"
    })
})

app.listen(PORT, ()=> {console.log("running on " + PORT)})

