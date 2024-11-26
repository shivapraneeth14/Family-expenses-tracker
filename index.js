import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connect from './src/Db/Index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'Public/uploads')));
// app.use('/models', express.static(path.join(__dirname, 'Public/models')));
app.use(cookieParser());
app.use(express.static('Public'));

let isDatabaseConnected = false;
async function establishConnection() {
    if (!isDatabaseConnected) {
      try {
        await connect();
        isDatabaseConnected = true;
        console.log("Database connected successfully");
      } catch (err) {
        console.error("MongoDB connection error:", err);
      }
    } else {
      console.log("Database is already connected");
    }
  }
  
  // Establish connection and start the server
  establishConnection()
    .then(() => {
      app.listen(PORT, () => {
        console.log(process.env.FRONTEND_URL);
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log('Routes are: /api/register, /api/login');
      });
    })
    .catch((err) => {
      console.error("Error while establishing the connection:", err);
    });