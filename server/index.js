import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());

app.get('/', (req, res) => {
    res.send("JWT Authentictaion API");
})

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`server running on port ${port}`);
});