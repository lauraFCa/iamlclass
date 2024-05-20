# Weather Forecast Chatbot

This is a simple weather forecast chatbot built with Express.js and a custom chatbot module.

- [About NeuroJS](./docs/Sobre.md)  
- [Using NeuroJS](./docs/Uso.md)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- neurojs
- compromise
- natural

## Running the Application

To start the server, run the following command in your terminal:

```bash
npm run dev
```

The server will start on port 3000 or the port specified in your environment variables.

Open the `index.html` file, and the chatbot page will appear. Just type in the questions and get all answers.

Everyting related to the AI is on `chatbot.js` file.

## API Endpoints

- `GET /` - Welcome message
- `POST /chat` - Process user input and return chatbot response

## Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [cors](https://www.npmjs.com/package/cors) - Middleware to enable CORS

