import neuro from 'neuro.js';
import natural from 'natural';
import nlp from 'compromise';


var TextClassifier = neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: neuro.classifiers.Winnow.bind(0, { retrain_count: 10 })
});


var WordExtractor = function (input, features) {
    const tokenizer = new natural.WordTokenizer();
    tokenizer.tokenize(input.toLowerCase()).forEach(function (word) {
        features[word] = 1;
    });
};


var intentClassifier = new neuro.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});



function train() {
    intentClassifier.trainBatch([
        { input: "Como está o tempo hoje?", output: ["current_weather", "temperature_forecast"] },
        { input: "Qual é a previsão do tempo para amanhã?", output: ["weather_forecast"] },
        { input: "Está chovendo agora?", output: ["current_weather"] },
        { input: "Vai chover amanhã?", output: ["weather_forecast"] },
        { input: "Qual a temperatura atual?", output: ["current_temperature"] },
        { input: "Qual será a temperatura amanhã?", output: ["temperature_forecast"] },
        { input: "Faz calor amanhã?", output: ["temperature_forecast"] },
        { input: "Faz frio aqui", output: ["current_weather", "current_temperature"] },
        { input: "Vai nevar em São Paulo na quarta?", output: ["weather_forecast"] },
        { input: "Qual é a temperatura agora em Nova York?", output: ["current_temperature"] },
        { input: "Vai chover no Rio de Janeiro amanhã?", output: ["weather_forecast"] },
        { input: "Está nublado em São Paulo?", output: ["current_weather"] },
        { input: "Vai fazer frio na quarta-feira?", output: ["temperature_forecast"] },
        { input: "Previsão do tempo para hoje à noite", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Quantos graus está fazendo agora?", output: ["current_temperature"] },
        { input: "Qual será a máxima de amanhã?", output: ["temperature_forecast"] },
        { input: "Quais são as chances de chuva hoje?", output: ["current_weather", "weather_forecast"] },
        { input: "Como estará o tempo no fim de semana?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Vai nevar no inverno?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Qual é a sensação térmica agora?", output: ["current_temperature"] },
        { input: "O que esperar do clima para a próxima semana?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Como estará o clima no Natal?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Vai ventar forte hoje?", output: ["current_weather"] },
        { input: "A umidade está alta agora?", output: ["current_weather"] },
        { input: "Quando será a próxima tempestade?", output: ["weather_forecast"] },
        { input: "Qual será a temperatura na semana que vem?", output: ["temperature_forecast"] },
        { input: "Vai chover na semana que vem?", output: ["weather_forecast"] },
        { input: "Como estava o tempo no mês passado?", output: ["current_weather"] },
        { input: "Qual era a temperatura no mês passado?", output: ["current_temperature"] },
        { input: "Qual é a previsão do tempo para a próxima semana?", output: ["weather_forecast"] },
        { input: "Vai nevar na próxima semana?", output: ["weather_forecast"] },
        { input: "Como estará o clima na próxima semana?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Estava muito quente no mês passado?", output: ["current_temperature"] },
        { input: "Qual será a máxima da próxima semana?", output: ["temperature_forecast"] },
        { input: "A previsão para a semana que vem é de chuva?", output: ["weather_forecast"] },
        { input: "A previsão para a próxima semana é de calor intenso?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Semana que vem vai fazer tanto calor quanto fez hoje?", output: ["weather_forecast", "temperature_forecast", "current_temperature"] },
        { input: "Amanhã qual será a temperatura em São Paulo?", output: ["temperature_forecast"] },
        { input: "Amanhã qual a temperatura na Baixada?", output: ["temperature_forecast"] },
        { input: "Amanhã qual a temperatura na Cidade?", output: ["temperature_forecast"] },
        { input: "Semana que vem qual a temperatura na Cidade?", output: ["temperature_forecast"] },
        { input: "Terça feira qual a temperatura no Galeão?", output: ["temperature_forecast"] },
        { input: "Segunda-feira qual a temperatura em Santos Lagos?", output: ["temperature_forecast"] },
        { input: "Na próxima segunda-feira vai chover no Rio de Janeiro?", output: ["weather_forecast"] },
        { input: "No próximo mês teremos dias quentes em Brasília?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Na semana que vem, como estará o clima em Salvador?", output: ["weather_forecast", "temperature_forecast"] },
        { input: "Qual é a previsão do tempo para o próximo fim de semana?", output: ["weather_forecast"] },
        { input: "Ontem, como estava o clima em Recife?", output: ["current_weather"] },
        { input: "Próxima quarta-feira terá temperaturas baixas em Florianópolis?", output: ["temperature_forecast"] },
        { input: "No próximo feriado, vai chover em Belo Horizonte?", output: ["weather_forecast"] },
        { input: "No próximo dia útil, qual será a temperatura em Manaus?", output: ["temperature_forecast"] },
        { input: "Daqui a dois dias, como estará o tempo em Porto Alegre?", output: ["weather_forecast", "temperature_forecast"] }
    ]);
}


function extractKeywordsWithLib(question) {
    let doc = nlp(question.toLowerCase());
    console.log('doc');
    console.log(doc.topics().json())
    let dateMatch = doc.dates().out('text');
    let locationMatch = doc.places().out('text');
    let weatherTerms = ["clima", "tempo", "temperatura", "calor", "frio", "chuva", "chove", "chover", "sol", "nublado", "céu", "brisa", "neve", "neva", "nevar", "vento", "ventar", "umidade", "precipitação", "ventania", "graus", "pressão atmosférica", "tempestade", "nascer do sol", "pôr do sol"];
    const hasWeatherTerm = weatherTerms.some(term => doc.has(term));

    return {
        date: dateMatch || null,
        location: locationMatch || null,
        hasWeatherTerm: hasWeatherTerm
    };
}


/**
 * Extracts keywords from a question.
 * @param {string} question - The input question.
 * @returns {Keywords} The extracted keywords.
 */
function extractKeywords(question) {
    const weatherTerms = ["Clima", "Tempo", "Temperatura", "Calor",
        "Frio", "Chuva", "chover", "Chove", "Sol", "Nublado", "Céu", "Brisa",
        "Neve", "nevar", "neva", "Vento", "ventar", "venta", "Umidade", "Precipitação", "Ventania",
        "Graus", "Pressão atmosférica", "Tempestade",
        "nascer do sol", "pôr do sol",];
    const weatherTermsRegex = new RegExp(weatherTerms.join("|"), "gi");

    const dateRegex = /(hoje|manh[aã]|amanh[ãa]|ontem|tarde|cedo|segunda|ter[çc]a|quarta|quinta|sexta|semana que vem|m[eê]s que vem|ano que vem)/;
    let dateMatch = question.toLowerCase().match(dateRegex);

    // find location
    //const locationRegex = /\b(em|no|na|de|do|da|aqui)\s+([a-zA-Z\s]+)\b/gi;

    let locationMatch = question.toLowerCase().replace(weatherTermsRegex, "");

    console.log("locationMatch", locationMatch);
    console.log("dateMatch", dateMatch);
    const beforeRegex = /^.*\b(em|no|vai)\b\s+/i;
    const afterRegex = /\s+\b(na|no|est[áa]|vai|faz)\b.*$/i;
    let tempResult = locationMatch.replace(beforeRegex, '');
    let finalResult = tempResult.replace(afterRegex, '');
    finalResult = finalResult.replace(dateRegex, "");

    const loc = finalResult.trim().replace("?", "");


    const hasWeatherTerm = weatherTerms.some(term => question.toLowerCase().includes(term.toLowerCase()));
    console.log(dateMatch ? dateMatch[0].toLowerCase() : "nao tem date match");
    console.log(loc ? loc : "nao tem location match");
    return {
        date: dateMatch ? dateMatch[0].toLowerCase() : null,
        location: loc ? loc : null,
        hasWeatherTerm: hasWeatherTerm
    };
}

// Generate a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generates a response based on the classified intents and extracted keywords.
 * @param {string[]} intents - The classified intents.
 * @param {Keywords} keywords - The extracted keywords.
 * @returns {string} The generated response.
 */
function getWeatherResponse(intents, keywords) {
    let responses = [];
    const local = keywords.location ? ` em ${keywords.location} ` : "";
    intents.forEach(intent => {
        switch (intent) {
            case 'current_weather':
                responses.push(keywords.location ?
                    `O tempo em ${keywords.location} está claro e ensolarado.` :
                    "O tempo está claro e ensolarado.");
                break;
            case 'weather_forecast':
                responses.push(keywords.date ?
                    `A previsão para ${keywords.date} ${local} é de chuva com possibilidade de trovoadas.` :
                    `A previsão para amanhã ${local} é de chuva com possibilidade de trovoadas.`);
                break;
            case 'current_temperature':
                responses.push(keywords.location ?
                    `A temperatura atual em ${keywords.location} é de ${getRandomNumber(23, 37)}°C.` :
                    `A temperatura atual é de ${getRandomNumber(12, 37)}°C.`);
                break;
            case 'temperature_forecast':
                responses.push(keywords.date ?
                    `A temperatura ${keywords.date}${local}será em torno de ${getRandomNumber(12, 37)}°C.` :
                    `A temperatura amanhã${local}será em torno de ${getRandomNumber(12, 37)}°C.`);
                break;
            default:
                responses.push("Desculpe, não entendi sua pergunta. Pode reformular?");
                break;
        }
    });

    return responses.join(" ");
}



export { intentClassifier, train, extractKeywords, getWeatherResponse };
