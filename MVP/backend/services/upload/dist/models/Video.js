"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Video Schema
const videoSchema = new mongoose_1.default.Schema({
    filename: String,
    path: String,
    createdAt: { type: Date, default: Date.now }
});
const Video = mongoose_1.default.model('Video', videoSchema);
exports.default = Video;
