const neuro = require('neuro.js'); // Importe a biblioteca Neuro.js

// First, define our base classifier type (a multi-label classifier based on winnow):
var TextClassifier = neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: neuro.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
var WordExtractor = function (input, features) {
    input.split(" ").forEach(function (word) {
        features[word] = 1;
    });
};

// Initialize a classifier with the base classifier type and the feature extractor:
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    featureExtractor: WordExtractor
});

// Train and test:
intentClassifier.trainBatch([
    { input: "I want an apple", output: "apl" },
    { input: "I want a banana", output: "bnn" },
    { input: "I want chips", output: "cps" }
]);

console.dir(intentClassifier.classify("I want an apple and a banana")); // ['apl','bnn']
console.dir(intentClassifier.classify("I WANT AN APPLE AND A BANANA")); // []

