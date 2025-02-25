import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('GOTRIP SERVER RUNNING');
});

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('MongoDB is connected');
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
    setTimeout(connectWithRetry, 5000);
  });
