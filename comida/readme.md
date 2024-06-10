# Chatbot de Receitas

Este projeto implementa um servidor backend utilizando Express.js para um chatbot de receitas.  
O servidor é capaz de receber mensagens de usuários, classificar a intenção por trás da mensagem e responder com informações relevantes sobre a receita ou ingrediente passado.

Importante: Chatbot funciona em ingles devido a API usada: `Spoonacular`

## Tecnologias Utilizadas

- **HTML/CSS e JavaScript**: Front-end do chatbot (interface).
- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express.js**: Framework para aplicativos web Node.js.
- **Cors**: Middleware para habilitar CORS (Compartilhamento de Recursos de Origem Cruzada).
- **neuro.js**: Uma biblioteca de aprendizado de máquina para JavaScript.
- **natural**: Uma biblioteca de processamento de linguagem natural para Node.js.
- [API de receitas](https://api.spoonacular.com/recipes/)

## Estrutura do Código - server.js

O arquivo `server.js` contém o código principal para configurar e executar o servidor Express, composto de:

- **Importações**: Importa as dependências necessárias e módulos locais como o `chatbot.js`, que contém a lógica para treinamento, classificação de intenções e obtenção de respostas do chatbot.
- **Configuração do Servidor**: Cria uma instância do aplicativo Express, define a porta e configura middlewares para parsing de JSON e habilitação de CORS.
- **Rota GET `/`**: Define uma rota raiz que responde com uma mensagem de boas-vindas.
- **Rota POST `/chat`**: Recebe mensagens do usuário, classifica a intenção da mensagem, obtém uma resposta do chatbot baseada na classificação e retorna essa resposta ao usuário.

## Estrutura do Código - chatbot.js

Utiliza técnicas de processamento de linguagem natural (PLN) e aprendizado de máquina para classificar as intenções por trás das mensagens dos usuários.

### Classificador de Texto

```js
var TextClassifier = neuro.classifiers.multilabel.BinaryRelevance.bind(0, 
    {
        binaryClassifierType: neuro.classifiers.Winnow.bind(0, 
        { 
            retrain_count: 10 
        })
    }
);
```

Utiliza a classe `BinaryRelevance` de `neuro.js` para criar um classificador de texto.  
Este classificador é configurado para usar o algoritmo `Winnow` para classificação binária.

### Extrator de Palavras

```js
var WordExtractor = function (input, features) {
    const tokenizer = new natural.WordTokenizer();
    tokenizer.tokenize(input.toLowerCase()).forEach(function (word) {
        features[word] = 1;
    });
};
```

Define uma função `WordExtractor` que utiliza o `WordTokenizer` de `natural` para extrair palavras de uma entrada de texto e transformá-las em características para o classificador.

### Classificador de Intenções

```js
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
    classifierType: TextClassifier,
    normalizer: neuro.features.LowerCaseNormalizer,
    featureExtractor: WordExtractor
});
```

Cria uma instância de `EnhancedClassifier` de `neuro.js`, configurando-a com o classificador de texto, um normalizador para converter o texto para minúsculas e o extrator de palavras definido anteriormente.

### Função de Treinamento

```js
function train() {
    intentClassifier.trainBatch([
        { input: "what can I do with apple and chocolate?", output: ["apple", "chocolate"] },
        //...
    ]);
}
```

A função `train` é responsável por treinar o classificador de intenções com um conjunto de dados de exemplo.  
Os dados de treinamento incluem entradas de texto e as intenções correspondentes, que são usadas para ensinar o classificador a reconhecer padrões nas mensagens dos usuários.


## Interface do Chatbot

Arquivo `index.html` é a interface do usuário para um chatbot.  
Utiliza HTML, Bootstrap para estilização e ícones do Font Awesome para criar uma interface de chat simples e interativa.

**Cabeçalho (`<head>`)**

- *Meta Tags*: Inclui a codificação de caracteres e a tag de viewport para responsividade.
- *Bootstrap*: Link para a folha de estilos do Bootstrap, permitindo o uso de componentes e grid system do Bootstrap.
- *Font Awesome*: Link para a folha de estilos do Font Awesome, usada para adicionar ícones estilizados, como o ícone de envio de mensagem.
- *Estilos Personalizados*: Link para uma folha de estilos CSS externa para personalizações específicas do projeto.
- *Título*: Define o título da página como "Chatbot".

**Corpo (`<body>`)**

- *Container do Chat*: Um container `div` que engloba a área de mensagens e o campo de entrada de texto. Inclui:
  - *Área de Mensagens*: Uma `div` onde as mensagens do chat serão exibidas.
  - *Spinner de Carregamento*: Um spinner do Bootstrap que é mostrado enquanto as mensagens estão sendo carregadas ou processadas.
- *Campo de Entrada de Texto*: Uma `input-group` do Bootstrap que contém o campo de texto onde o usuário pode digitar suas mensagens e um botão para enviar a mensagem.
- *Mensagem de Erro*: Uma `div` para exibir mensagens de erro ao usuário.


### Funcionalidades

- **Envio de Mensagens**: O usuário pode digitar uma mensagem no campo de entrada e pressionar o botão de enviar ou a tecla Enter para enviar a mensagem ao chatbot.
- **Exibição de Mensagens**: As mensagens enviadas e as respostas do chatbot são exibidas na área de mensagens.
- **Feedback de Carregamento**: Um spinner é exibido enquanto a mensagem está sendo processada, proporcionando um feedback visual ao usuário.


## Como Funciona

1. O chatbot é treinado com exemplos de mensagens dos usuários e suas intenções correspondentes.  
2. Quando uma nova mensagem é recebida, o chatbot:
    - processa o texto, 
    - extrai características relevantes e 
    - utiliza o classificador de intenções para determinar a intenção por trás da mensagem.  
3. Com base nessa intenção, o chatbot pode então responder de maneira apropriada.


Possíveis perguntas:
1. what can i do with chocolate and apples?
2. what can I make with bananas?
3. how to cook tomato beef?
4. what desserts can I make with strawberries?
5. how to prepare tofu for grilling?
6. how long does it take to bake a potato?


## Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [cors](https://www.npmjs.com/package/cors) - Middleware to enable CORS
- [neurojs](https://neuro.js.org/) - Neuro.js is machine learning framework for building AI assistants and chat-bots.
