//impo depend.
import express from 'express';
import axios from 'axios';
import OpenAI from 'openai';
import dotenv from 'dotenv';

//conf api key
dotenv.config();

//expresss
const app = express();
const PORT = process.env.PORT || 3000;

//serv. front
app.use("/", express.static("public"));

//middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//istanza openIA con api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


//rute /endpoint / url
app.post('/api/chatbot/', async (req, res) => {
    return res.json({ message: 'server on' });
})
//serv backend
app.listen(PORT, () => {
    console.log('server running on port: ' + PORT);
});
