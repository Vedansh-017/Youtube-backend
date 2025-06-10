import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(cookieParser())

//
// Import routes
import userRouter from './routes/user.routes.js';
  

//routes decalartion
app.use("/api/v1/users",userRouter)

app.get("/test", (req, res) => {
    res.send("🎉 Server is working!");
  });

// Handle 404 errors

app.post("/testing", (req, res) => {
    console.log(req.body);
    res.send("Testing endpoint received data");
  })

export {app};