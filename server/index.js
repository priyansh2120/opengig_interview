import express from 'express';
import mongoose from 'mongoose';
import router from './tasks.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));

// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose
    .connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Start server only after MongoDB is connected
        app.listen(3002, () => {
            console.log('Server is running on http://localhost:3002');
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

// API routes
app.use('/tasks', router);

// Serve static files for the client
app.use(express.static(path.join(__dirname, "../client/build")));

// Fallback for React app routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});