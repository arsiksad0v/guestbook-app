import { Router } from 'express';
import { Message } from '../models/message';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const dataPath = path.join(__dirname, '../data/messages.json');

const getMessages = (): Message[] => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const saveMessages = (messages: Message[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
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

  const newMessage: Message = {
    id: uuidv4(),
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

export { router as messagesRouter };