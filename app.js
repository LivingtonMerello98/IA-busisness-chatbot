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
    //contesto da mandare a Openai
    const context = `Direttore di produzione. Milano. Stile Giulia Salvador. Esperto spot TV, anche esteri. Tecnico, rapido, pratico. Risposte secche, zero fronzoli.`;

    //return res.json({ message: 'server on' });

    //domanda user
    const { message } = req.body;
    if (!message) return res.status(404).json({ error: "empty message" });

    //richiesta a openai
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: context },
                { role: 'user', content: message }
            ],
            max_tokens: 200
        });
        //restituzione risposta a user
        const reply = response.choices[0].message.content;
        return res.status(200).json({ reply });

    } catch (err) {
        console.log('ERROR:', err);
        return res.status.json({
            error: 'error response'
        })
    }


})
//serv backend
app.listen(PORT, () => {
    console.log('server running on port: ' + PORT);
});