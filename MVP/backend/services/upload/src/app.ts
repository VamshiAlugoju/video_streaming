import express, { Request, Response } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
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

// Setup file upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('video'), uploadController);

// Start server
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Upload service running on port ${port}`);
});


async function uploadController(req: Request, res: Response) {
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded');
            return

        }
        const video = new Video({
            filename: req.file.filename,
            path: req.file.path
        });
        await video.save();
        res.send('Video uploaded successfully');
    } catch (err) {
        res.status(500).json(err)
    }
}