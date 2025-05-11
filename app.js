import express from 'express';
import axios from 'axios';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Configura la chiave API
dotenv.config();

// Express
const app = express();
const PORT = process.env.PORT || 3000;

// Servizio front-end
app.use("/", express.static("public"));

// Middleware JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Istanza OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Variabile per il contesto (lettura solo una volta all'avvio)
let context = '';

// Funzione per caricare il contesto dal file JSON
const loadContext = () => {
    const contextPath = path.join('C:', 'Users', 'livi9', 'Desktop', 'progetti', 'batch_JSON', 'estrazioni', 'estrazione.json');
    try {
        const fileContent = fs.readFileSync(contextPath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        // Costruire un contesto basato sui dati del JSON
        context = jsonData.map(item => {
            return `Cocktail: ${item.name}, Ingredients: ${item.ingredients}`;
        }).join("\n");  // Combina tutti i cocktail in un'unica stringa, separati da newline

        console.log('Contesto caricato correttamente');
    } catch (error) {
        console.error('Errore nel caricamento del contesto:', error);
    }
};

// Carica il contesto all'avvio del server
loadContext();

// Rete API (endpoint)
app.post('/api/chatbot/', async (req, res) => {
    // Verifica se il contesto è stato caricato correttamente
    if (!context) {
        return res.status(500).json({ error: 'Contesto non caricato correttamente' });
    }

    // Messaggio dell'utente
    const { message } = req.body;
    if (!message) return res.status(404).json({ error: "Messaggio vuoto" });

    try {
        // Richiesta a OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: context },
                { role: 'system', content: 'puoi solamente rispondere a domande inerenti ai cocktail, sei un bartender.' },
                { role: 'user', content: message }
            ],
            max_tokens: 200
        });

        const reply = response.choices[0].message.content;
        return res.status(200).json({ reply });

    } catch (err) {
        console.error('Errore:', err);
        return res.status(500).json({ error: 'Errore nella risposta' });
    }
});

// Avvio del server
app.listen(PORT, () => {
    console.log('Server in esecuzione sulla porta: ' + PORT);
});
