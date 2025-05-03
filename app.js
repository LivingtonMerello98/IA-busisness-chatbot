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
    const context = `Sei un assistente di supporto per un supermercato 'Esselunga'
                    informazioni sul supermercato:
                    -Ubicazione: Duomo numero 77, Milano
                    -Orario: da lunedì a sabato dalle 9 alle 21
                    -Prodotti: Pane, Latte, Uova, Frutta, Verdura, Carne e bibite
                    -Marchi: Mulino Bianco, Parmalat, Dole, Cocacola, Sprite
                    -Metodi di Pagamento: Cash, Carta
                Puoi solo rispondere a domande inerenti all'attività e i prodotti. risposte altre domande sono vietate`
    //return res.json({ message: 'server on' });

    //domanda user
    //richiesta a openai
    //restituzione risposta a user
})
//serv backend
app.listen(PORT, () => {
    console.log('server running on port: ' + PORT);
});
