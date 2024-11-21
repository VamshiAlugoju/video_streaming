import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video';
dotenv.config();

// MongoDB URI
const dbURI = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/video-app?authSource=admin';
console.log(dbURI, ">>>>>>>>>>>>>>>>")


// Create Express app
const app = express();

// Get all videos metadata
app.get('/videos', async (req: Request, res: Response) => {
    const videos = await Video.find();
    res.json(videos);
});

app.get("/ping", async (req, res) => {
    res.send("pong")
})

// Start server
const port = process.env.PORT || 4002;
mongoose.connect(dbURI).then(() => {
    console.log("db connected Fr Fr fr fr");
    app.listen(port, () => {
        console.log("hellof'sfjsdpojf'osd")
        console.log(`View service running on port ${port}`);
    });
}).catch(err => {
    console.log(err)
})
