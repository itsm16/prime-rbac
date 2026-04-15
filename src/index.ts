import express from 'express'
import authRoutes from './modules/auth.route';

const PORT = process.env.PORT || 3000;

const app = express()


// routes
app.use("/api/auth", authRoutes)

app.get("/health", (req, res)=> {
    res.json({
        message: "runs"
    })
})

app.listen(PORT, ()=> {console.log("running on " + PORT)})

