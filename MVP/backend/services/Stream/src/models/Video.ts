import mongoose from "mongoose";
// Video Schema

interface Ivideo {
    filename: string;
    path: string;
    createdAt: Date
}
const videoSchema = new mongoose.Schema<Ivideo>({
    filename: String,
    path: String,
    createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);
export default Video;