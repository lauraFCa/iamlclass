const neuro = require('neuro.js'); // Importe a biblioteca Neuro.js

// Defina o classificador básico (um classificador multi-label baseado em Winnow)
//classificador para entender e responder a perguntas sobre o clima.
var TextClassifier = neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: neuro.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

// Defina o extrator de características - uma função que extrai características de uma entrada
var WordExtractor = function (input, features) {
    input.toLowerCase().split(" ").forEach(function (word) {
        features[word] = 1;
    });
};

// Inicialize um classificador com o tipo de classificador base e o extrator de características
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});

// Treine o classificador com exemplos de perguntas e suas intenções
intentClassifier.trainBatch([
    { input: "Como está o tempo hoje?", output: "current_weather" },
    { input: "Qual é a previsão do tempo para amanhã?", output: "weather_forecast" },
    { input: "Está chovendo agora?", output: "current_weather" },
    { input: "Vai chover amanhã?", output: "weather_forecast" },
    { input: "Qual a temperatura atual?", output: "current_temperature" },
    { input: "Qual será a temperatura amanhã?", output: "temperature_forecast" }
]);

// Função para obter a resposta baseada na intenção classificada
function getWeatherResponse(intent) {
    switch (intent) {
        case 'current_weather':
            return "O tempo está claro e ensolarado.";
        case 'weather_forecast':
            return "A previsão para amanhã é de chuva com possibilidade de trovoadas.";
        case 'current_temperature':
            return "A temperatura atual é de 25°C.";
        case 'temperature_forecast':
            return "A temperatura amanhã será em torno de 20°C.";
        default:
            return "Desculpe, não entendi sua pergunta. Pode reformular?";
    }
}

// Exemplos de classificação e resposta
function askWeatherQuestion(question) {
    let classifiedIntents = intentClassifier.classify(question);
    if (classifiedIntents.length > 0) {
        let response = getWeatherResponse(classifiedIntents[0]);
        console.log(`Pergunta: ${question}`);
        console.log(`Resposta: ${response}`);
    } else {
        console.log("Desculpe, não entendi sua pergunta. Pode reformular?");
    }
}

// Teste com algumas perguntas
askWeatherQuestion("Como está o tempo hoje?");
askWeatherQuestion("Qual é a previsão do tempo para amanhã?");
askWeatherQuestion("Qual a temperatura atual?");
