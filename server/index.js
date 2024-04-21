import express from 'express';
import { PORT, DB } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON data in the body of the request
app.use(express.json());

// Middleware to allow cross-origin requests
// Option 1: Allow all requests
app.use(cors());
// Option 2: Allow requests from specific origins
// app.use(cors({
//     origin: 'http://localhost:5555',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));



app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Hello World');
});

app.use('/books', booksRoute);

mongoose
    .connect(DB)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error.message);
    });