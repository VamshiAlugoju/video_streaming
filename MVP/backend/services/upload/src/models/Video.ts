import mongoose from "mongoose";
// Video Schema
const videoSchema = new mongoose.Schema({
    filename: String,
    path: String,
    createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);
export default Video;