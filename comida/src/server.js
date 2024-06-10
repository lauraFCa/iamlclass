import express, { json } from 'express';
import { intentClassifier, train, getAIResponse } from './chatbot.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "Bem-vindo ao Chatbot de Receitas!" });
});


app.post('/chat', async (req, res) => {
    train();

    const userInput = req.body['Q'];
    if (userInput) {

        let classifiedIntents = intentClassifier.classify(userInput);

        let response;

        if (classifiedIntents.length > 0) {
            response = await getAIResponse(classifiedIntents);
        } else {
            response = "Sorry, I didnt get your question - can you ask again?";
        }
        console.log(response)
        res.json({ userInput, response });
    } else {
        res.json({ message: "Question cannot be empty" });

    }

});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
