import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { messagesRouter } from './routes/messages';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${8000}`);
});