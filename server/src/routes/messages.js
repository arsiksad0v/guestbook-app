"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
exports.messagesRouter = router;
const dataPath = path_1.default.join(__dirname, '../data/messages.json');
const getMessages = () => {
    const data = fs_1.default.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};
const saveMessages = (messages) => {
    fs_1.default.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
};
router.get('/', (req, res) => {
    const messages = getMessages();
    res.json(messages);
});
router.post('/', (req, res) => {
    const { author = "Anonymous", content, imageUrl } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }
    const newMessage = {
        id: (0, uuid_1.v4)(),
        author,
        content,
        imageUrl,
        timestamp: new Date().toISOString(),
    };
    const messages = getMessages();
    messages.push(newMessage);
    saveMessages(messages);
    res.status(201).json(newMessage);
});
