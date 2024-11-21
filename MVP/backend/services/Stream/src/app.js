"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const Video_1 = __importDefault(require("./models/Video"));
dotenv_1.default.config();
// MongoDB URI
const dbURI = process.env.MONGO_URI || 'mongodb://root:example@shared-db:27017/video-app?authSource=admin';
// Create MongoDB connection
mongoose_1.default.connect(dbURI, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Create Express app
const app = (0, express_1.default)();
// Stream video
app.get('/stream/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const video = yield Video_1.default.findById(id);
    if (!video) {
        return res.status(404).send('Video not found');
    }
    const videoPath = path_1.default.join(__dirname, '..', video.path);
    const stat = fs_1.default.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send('Range not provided');
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
    const videoStream = fs_1.default.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
}));
// Start server
const port = process.env.PORT || 4003;
app.listen(port, () => {
    console.log(`Stream service running on port ${port}`);
});
