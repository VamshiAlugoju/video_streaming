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
const dotenv_1 = __importDefault(require("dotenv"));
const Video_1 = __importDefault(require("./models/Video"));
dotenv_1.default.config();
// MongoDB URI
const dbURI = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/video-app?authSource=admin';
console.log(dbURI, ">>>>>>>>>>>>>>>>");
// Create Express app
const app = (0, express_1.default)();
// Get all videos metadata
app.get('/videos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield Video_1.default.find();
    res.json(videos);
}));
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("pong");
}));
// Start server
const port = process.env.PORT || 4002;
mongoose_1.default.connect(dbURI).then(() => {
    console.log("db connected Fr Fr fr fr");
    app.listen(port, () => {
        console.log("hellof'sfjsdpojf'osd");
        console.log(`View service running on port ${port}`);
    });
}).catch(err => {
    console.log(err);
});
