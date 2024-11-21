"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://root:example@shared-db:27017/video-app?authSource=admin'
};
