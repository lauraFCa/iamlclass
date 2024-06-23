
/**
 * @fileoverview This file contains the implementation of a chatbot using neuro.js and natural language processing.
 * @module chatbot
 */

import neuro from 'neuro.js';
import natural from 'natural';


const key = "";

/**
 * Represents a text classifier for intent classification.
 */
var TextClassifier = neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: neuro.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

/**
 * Represents a word extractor for feature extraction.
 * @param {string} input - The input text.
 * @param {Object} features - The features object.
 */
var WordExtractor = function (input, features) {
    const tokenizer = new natural.WordTokenizer();
    tokenizer.tokenize(input.toLowerCase()).forEach(function (word) {
        features[word] = 1;
    });
};

/**
 * Represents an intent classifier using neuro.js.
 */
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    normalizer: neuro.features.LowerCaseNormalizer,
    featureExtractor: WordExtractor
});

/**
 * Trains the intent classifier with predefined training data.
 */
function train() {
    intentClassifier.trainBatch([
        { input: "what can I do with apple and chocolate?", output: ["apple", "chocolate"] },
        { input: "what to do with apple and chocolate?", output: ["apple", "chocolate"] },
        { input: "what can I do with cheetos?", output: ["cheetos"] },
        { input: "what to do with cheetos?", output: ["cheetos"] },
        { input: "what can I do with banana?", output: ["banana"] },
        { input: "what to do with banana?", output: ["banana"] },
        { input: "what can I do with bananas?", output: ["bananas"] },
        { input: "what to do with bananas?", output: ["bananas"] },
        { input: "what can I do with apples?", output: ["apples"] },
        { input: "what to do with apples?", output: ["apples"] },
        { input: "what can I do with lemons?", output: ["lemons"] },
        { input: "what to do with lemons?", output: ["lemons"] },
        { input: "what can I do with sauce?", output: ["sauce"] },
        { input: "what to do with sauce?", output: ["sauce"] },
        { input: "what can I do with tomato?", output: ["tomato"] },
        { input: "what to do with tomato?", output: ["tomato"] },
        { input: "what can I do with tomatos?", output: ["tomato"] },
        { input: "what to do with tomatos?", output: ["tomato"] },
        { input: "what can I do with carrots?", output: ["carrots"] },
        { input: "what to do with carrots?", output: ["carrots"] },
        { input: "what to do with dough?", output: ["dough"] },
        { input: "what to do with apples and cinamon?", output: ["apples", "cinamon"] },
        { input: "what can I do with dough?", output: ["dough"] },
        { input: "what can I make with banana?", output: ["banana"] },
        { input: "what can I make with apples?", output: ["apples"] },
        { input: "what can I make with lemons?", output: ["lemons"] },
        { input: "what can I make with sauce?", output: ["sauce"] },
        { input: "what can I make with tomato?", output: ["tomato"] },
        { input: "what can I make with carrots?", output: ["carrots"] },
        { input: "what can I make with dough?", output: ["dough"] },
        { input: "what can I make with spaghetti?", output: ["spaghetti"] },
        { input: "what can I do with banana and strawberry?", output: ["banana", "strawberry"] },
        { input: "what can I do with bananas and pasta?", output: ["banana", "pasta"] },
        { input: "what to do with sweet potato?", output: ["sweet potato"] },
        { input: "what to do with basil?", output: ["basil"] },
        { input: "what to do with sesame?", output: ["sesame"] },
        { input: "what to do with milk and egg?", output: ["milk", "egg"] },
        { input: "what to do with lemon?", output: ["lemon"] },
        { input: "how to cook chicken?", output: ["chicken"] },
        { input: "how to cook pumpkin?", output: ["pumpkin"] },
        { input: "how to cook beans?", output: ["beans"] },
        { input: "how to cook vegetables?", output: ["vegetables"] },
        { input: "how to cook rice?", output: ["rice"] },
        { input: "how to cook sugar?", output: ["sugar"] },
        { input: "how to cook fish?", output: ["fish"] },
        { input: "how to cook carrot?", output: ["carrot"] },
        { input: "how to cook beef?", output: ["beef"] },
        { input: "how to make apple pie?", output: ["apple", "pie"] },
        { input: "how to make chocolate pie?", output: ["chocolate", "pie"] },
        { input: "how to make orange pie?", output: ["orange", "pie"] },
        { input: "how to make banana pie?", output: ["banana", "pie"] },
        { input: "how to make apple pie with chocolate?", output: ["apple", "pie", "chocolate"] },
        { input: "how to make apple pie with lemon?", output: ["apple", "pie", "lemon"] },
        { input: "how to make apple pie with pumpkin?", output: ["apple", "pie", "pumpkin"] },
        { input: "how to make apple pie with coffe?", output: ["apple", "pie", "coffe"] },
        { input: "how to make apple pie with skittles?", output: ["apple", "pie", "skittles"] },
        { input: "how to make chocolate apple pie?", output: ["apple", "pie", "chocolate"] },
        { input: "how to make chocolate banana pie?", output: ["banana", "pie", "chocolate"] },
        { input: "how to make chocolate orange pie?", output: ["orange", "pie", "chocolate"] },
        { input: "how to make lemon apple pie?", output: ["apple", "pie", "lemon"] },
        { input: "how to make cinamon apple pie?", output: ["apple", "pie", "cinamon"] },
        { input: "how to make pepper apple pie?", output: ["apple", "pie", "pepper"] },
        { input: "how to make apple juice?", output: ["apple", "juice"] },
        { input: "how to make cactus juice?", output: ["cactus", "juice"] },
        { input: "how to make orange juice?", output: ["orange", "juice"] },
        { input: "how to make lemonade?", output: ["lemonade"] },
        { input: "how to make pineapple juice?", output: ["pineapple", "juice"] },
        { input: "how to make strawberry juice?", output: ["strawberry", "juice"] },
        { input: "how to make grape juice?", output: ["grape", "juice"] },
        { input: "how to make apple and cinamon juice?", output: ["apple", "cinamon", "juice"] },
        { input: "give me a recipe that uses ginger", output: ["ginger"] },
        { input: "give me a recipe that uses lettuce", output: ["lettuce"] },
        { input: "give me a recipe that uses tomato and olives", output: ["tomato", "olives"] },
        { input: "what dishes can I prepare with avocado?", output: ["avocado"] },
        { input: "how to make a carrot cake?", output: ["carrot cake"] },
        { input: "what goes well with salmon?", output: ["salmon"] },
        { input: "how many grams of protein are in chicken breast?", output: ["protein", "chicken breast"] },
        { input: "what desserts can I make with strawberries?", output: ["desserts", "strawberries"] },
        { input: "how to prepare quinoa?", output: ["quinoa"] },
        { input: "how long does it take to bake a potato?", output: ["bake", "potato"] },
        { input: "what can I make with chickpeas?", output: ["chickpeas"] },
        { input: "how to make pumpkin soup?", output: ["pumpkin soup"] },
        { input: "what fruits are good for making juice?", output: ["fruits", "juice"] },
        { input: "how to tell if an avocado is ripe?", output: ["avocado", "ripe"] },
        { input: "what spices go well with pork?", output: ["spices", "pork"] },
        { input: "how to make homemade tomato sauce?", output: ["homemade tomato sauce"] },
        { input: "how to prepare tofu for grilling?", output: ["tofu", "grilling"] },
    ]);
}


/**
 * Generates a response based on the classified intents and extracted keywords.
 * @async
 * @param {string[]} intents - The classified intents.
 * @returns {Promise<string|Object>} The generated response or an error message.
 */
async function getAIResponse(intents) {
    const falha = "It was not possible to fulfill your request. Please try again later";
    const baseEndpoint = "https://api.spoonacular.com/recipes/";

    let endpoint = baseEndpoint;
    let query = "complexSearch?query=" + intents.join(',');
    endpoint += query + `&apiKey=${key}`;

    const resp1 = await fetch(endpoint, {});
    if (resp1.status === 200) {
        const r = await resp1.json();
        const first = r.results[0];
        if (first) {
            endpoint = baseEndpoint;
            endpoint += `${first.id}/information?apiKey=${key}`;
            const receita = await fetch(endpoint, {});
            if (receita.status === 200) {
                const rec = await receita.json();
                return rec;
            } else {
                return falha;
            }
        } else {
            return "Sorry, I got nothing.."
        }
    } else {
        const r = await resp1.json();
        console.log(r);
        return falha;
    }
}

export { intentClassifier, train, getAIResponse };
