import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Video from './models/Video';
dotenv.config();

// MongoDB URI
const dbURI = process.env.MONGO_URI || 'mongodb://root:example@shared-db:27017/video-app?authSource=admin';

// Create MongoDB connection
mongoose.connect(dbURI, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



// Create Express app
const app = express();

// Stream video
app.get('/stream/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        res.status(404).send('Video not found');
        return
    }

    const videoPath = path.join(__dirname, '..', video?.path);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
        res.status(400).send('Range not provided');
        return;
    }

    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    res.status(206).header({
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4'
    });

    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

// Start server
const port = process.env.PORT || 4003;
app.listen(port, () => {
    console.log(`Stream service running on port ${port}`);
});
