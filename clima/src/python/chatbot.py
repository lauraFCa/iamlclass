import random
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MultiLabelBinarizer
import nltk
from nltk.tokenize import word_tokenize
import spacy

# Baixar recursos necessários do nltk
nltk.download('punkt')

# Carregar modelo de linguagem do spacy
nlp = spacy.load('pt_core_news_sm')

# Função para extrair palavras
def word_extractor(text):
    words = word_tokenize(text.lower())
    return words

# Treinamento do classificador
def train_classifier():
    train_data = [
        ("Como está o tempo hoje?", ["current_weather", "temperature_forecast"]),
        ("Qual é a previsão do tempo para amanhã?", ["weather_forecast"]),
        ("Está chovendo agora?", ["current_weather"]),
        ("Vai chover amanhã?", ["weather_forecast"]),
        ("Qual a temperatura atual?", ["current_temperature"]),
        ("Qual será a temperatura amanhã?", ["temperature_forecast"]),
        ("Faz calor amanhã?", ["temperature_forecast"]),
        ("Faz frio aqui", ["current_weather", "current_temperature"]),
        ("Vai nevar em São Paulo na quarta?", ["weather_forecast"]),
        ("Qual é a temperatura agora em Nova York?", ["current_temperature"]),
        ("Vai chover no Rio de Janeiro amanhã?", ["weather_forecast"]),
        ("Está nublado em São Paulo?", ["current_weather"]),
        ("Vai fazer frio na quarta-feira?", ["temperature_forecast"]),
        ("Previsão do tempo para hoje à noite", ["weather_forecast", "temperature_forecast"]),
        ("Quantos graus está fazendo agora?", ["current_temperature"]),
        ("Qual será a máxima de amanhã?", ["temperature_forecast"]),
        ("Quais são as chances de chuva hoje?", ["current_weather", "weather_forecast"]),
        ("Como estará o tempo no fim de semana?", ["weather_forecast", "temperature_forecast"]),
        ("Vai nevar no inverno?", ["weather_forecast", "temperature_forecast"]),
        ("Qual é a sensação térmica agora?", ["current_temperature"]),
        ("O que esperar do clima para a próxima semana?", ["weather_forecast", "temperature_forecast"]),
        ("Como estará o clima no Natal?", ["weather_forecast", "temperature_forecast"]),
        ("Vai ventar forte hoje?", ["current_weather"]),
        ("A umidade está alta agora?", ["current_weather"]),
        ("Quando será a próxima tempestade?", ["weather_forecast"]),
        ("Qual será a temperatura na semana que vem?", ["temperature_forecast"]),
        ("Vai chover na semana que vem?", ["weather_forecast"]),
        ("Como estava o tempo no mês passado?", ["current_weather"]),
        ("Qual era a temperatura no mês passado?", ["current_temperature"]),
        ("Qual é a previsão do tempo para a próxima semana?", ["weather_forecast"]),
        ("Vai nevar na próxima semana?", ["weather_forecast"]),
        ("Como estará o clima na próxima semana?", ["weather_forecast", "temperature_forecast"]),
        ("Estava muito quente no mês passado?", ["current_temperature"]),
        ("Qual será a máxima da próxima semana?", ["temperature_forecast"]),
        ("A previsão para a semana que vem é de chuva?", ["weather_forecast"]),
        ("A previsão para a próxima semana é de calor intenso?", ["weather_forecast", "temperature_forecast"]),
        ("Semana que vem vai fazer tanto calor quanto fez hoje?", ["weather_forecast", "temperature_forecast", "current_temperature"]),
        ("Amanhã qual será a temperatura em São Paulo?", ["temperature_forecast"]),
        ("Amanhã qual a temperatura na Baixada?", ["temperature_forecast"]),
        ("Amanhã qual a temperatura na Cidade?", ["temperature_forecast"]),
        ("Semana que vem qual a temperatura na Cidade?", ["temperature_forecast"]),
        ("Terça feira qual a temperatura no Galeão?", ["temperature_forecast"]),
        ("Segunda-feira qual a temperatura em Santos Lagos?", ["temperature_forecast"]),
        ("Na próxima segunda-feira vai chover no Rio de Janeiro?", ["weather_forecast"]),
        ("No próximo mês teremos dias quentes em Brasília?", ["weather_forecast", "temperature_forecast"]),
        ("Na semana que vem, como estará o clima em Salvador?", ["weather_forecast", "temperature_forecast"]),
        ("Qual é a previsão do tempo para o próximo fim de semana?", ["weather_forecast"]),
        ("Ontem, como estava o clima em Recife?", ["current_weather"]),
        ("Próxima quarta-feira terá temperaturas baixas em Florianópolis?", ["temperature_forecast"]),
        ("No próximo feriado, vai chover em Belo Horizonte?", ["weather_forecast"]),
        ("No próximo dia útil, qual será a temperatura em Manaus?", ["temperature_forecast"]),
        ("Daqui a dois dias, como estará o tempo em Porto Alegre?", ["weather_forecast", "temperature_forecast"])
    ]

    X_train = [data[0] for data in train_data]
    y_train = [data[1] for data in train_data]
    
    vectorizer = CountVectorizer(tokenizer=word_extractor, binary=True)
    X_train_counts = vectorizer.fit_transform(X_train)
    
    mlb = MultiLabelBinarizer()
    y_train_bin = mlb.fit_transform(y_train)
    
    classifier = OneVsRestClassifier(SGDClassifier(max_iter=1000, tol=1e-3))
    classifier.fit(X_train_counts, y_train_bin)
    
    return vectorizer, classifier, mlb

vectorizer, classifier, mlb = train_classifier()

# Função para extrair palavras-chave
def extract_keywords(question):
    doc = nlp(question.lower())
    date_match = [ent.text for ent in doc.ents if ent.label_ == "DATE"]
    location_match = [ent.text for ent in doc.ents if ent.label_ == "GPE"]
    weather_terms = ["clima", "tempo", "temperatura", "calor", "frio", "chuva", "chove", "chover", "sol", "nublado", "céu", "brisa", "neve", "neva", "nevar", "vento", "ventar", "umidade", "precipitação", "ventania", "graus", "pressão atmosférica", "tempestade", "nascer do sol", "pôr do sol"]
    has_weather_term = any(term in question.lower() for term in weather_terms)
    
    return {
        'date': date_match[0] if date_match else None,
        'location': location_match[0] if location_match else None,
        'hasWeatherTerm': has_weather_term
    }

# Função para gerar resposta baseada nas intenções classificadas e palavras-chave extraídas
def get_weather_response(intents, keywords):
    responses = []
    local = f" em {keywords['location']} " if keywords['location'] else ""
    
    for intent in intents:
        if intent == 'current_weather':
            responses.append(f"O tempo{local}está claro e ensolarado.")
        elif intent == 'weather_forecast':
            date = keywords['date'] if keywords['date'] else "amanhã"
            responses.append(f"A previsão para {date}{local}é de chuva com possibilidade de trovoadas.")
        elif intent == 'current_temperature':
            temperature = random.randint(23, 37)
            responses.append(f"A temperatura atual{local}é de {temperature}°C.")
        elif intent == 'temperature_forecast':
            date = keywords['date'] if keywords['date'] else "amanhã"
            temperature = random.randint(12, 37)
            responses.append(f"A temperatura {date}{local}será em torno de {temperature}°C.")
        else:
            responses.append("Desculpe, não entendi sua pergunta. Pode reformular?")
    
    return " ".join(responses)





question = "Qual é a previsão do tempo para amanhã?"
keywords = extract_keywords(question)
X_test_counts = vectorizer.transform([question])
predicted_intents_bin = classifier.predict(X_test_counts)
predicted_intents = mlb.inverse_transform(predicted_intents_bin)
response = get_weather_response(predicted_intents[0], keywords)
print(response)


question = "Chove hoje?"
keywords = extract_keywords(question)
X_test_counts = vectorizer.transform([question])
predicted_intents = classifier.predict(X_test_counts)
response = get_weather_response(predicted_intents[0], keywords)
print(response)

question = "Chove amanhã em juiz de fora?"
keywords = extract_keywords(question)
X_test_counts = vectorizer.transform([question])
predicted_intents = classifier.predict(X_test_counts)
response = get_weather_response(predicted_intents[0], keywords)
print(response)

