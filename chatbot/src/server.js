import express, { json } from 'express';
import { intentClassifier, train, extractKeywords, getWeatherResponse } from './chatbot.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Bem-vindo ao Chatbot de Previsão do Tempo!" });
});


app.post('/chat', (req, res) => {
    train();
    
    const userInput = req.body['Q'];
    if (userInput) {

        let classifiedIntents = intentClassifier.classify(userInput);
        let keywords = extractKeywords(userInput);
        console.log(classifiedIntents);

        let response;
        if (!keywords.hasWeatherTerm) {
            response = "Por favor, faça perguntas relacionadas ao clima!";
        } else {
            if (classifiedIntents.length > 0) {
                response = getWeatherResponse(classifiedIntents, keywords);
            } else {
                response = "Desculpe, não entendi sua pergunta. Pode reformular?";
            }
        }

        res.json({ userInput, response });
    } else {
        res.json({ message: "A pergunta não pode estar em branco!" });

    }

});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
