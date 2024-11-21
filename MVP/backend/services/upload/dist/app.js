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
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
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
// Setup file upload using multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
// Upload route
app.post('/upload', upload.single('video'), uploadController);
// Start server
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`Upload service running on port ${port}`);
});
function uploadController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded');
                return;
            }
            const video = new Video_1.default({
                filename: req.file.filename,
                path: req.file.path
            });
            yield video.save();
            res.send('Video uploaded successfully');
        }
        catch (err) {
            res.status(500).json(err);
        }
    });
}
