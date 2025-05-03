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
app.post('/api/translate', async (req, res) => {

    //prompt def
    const { text, targetLang } = req.body
    //def ruolo
    const promptSystem1 = "Traduttore professionale.";
    const promptSystem2 = "Rispondi solo con la traduzione. Niente altro.";
    const promptUser = `Traduci in ${targetLang}: ${text}`;
    //call openIA
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: promptSystem1 },
                { role: "system", content: promptSystem2 },
                { role: "user", content: promptUser },
            ],
            max_tokens: 500,
            response_format: { type: 'text' }
        })

        const translateText = completion.choices[0].message.content;
        return res.status(200).json({ translateText });
    } catch (error) {
        console.log(err);
        return res.status(500).json({ error: "errore di traduzione" });
    }
});

//serv backend
app.listen(PORT, () => {
    console.log('server running on port: ' + PORT);
});
