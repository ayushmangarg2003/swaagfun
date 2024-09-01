import express from "express";
import cors from "cors";
import dalleRoutes from './routes/dalleRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/dalle', dalleRoutes)
app.use('/api/gallery', galleryRoutes)

app.get('/', async (req, res) => {
    res.send('Hello world');
})


const startServer = async () => {
    try {
        app.listen(8080, () => {
            console.log("Server Running");
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();