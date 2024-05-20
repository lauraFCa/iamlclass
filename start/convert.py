import pandas as pd
from tabulate import tabulate

def markdown_to_df(markdown_text):
    lines = markdown_text.strip().split('\n')
    headers = [header.strip() for header in lines[0].strip('|').split('|')]
    data = []
    for line in lines[2:]:
        row = [item.strip() for item in line.strip('|').split('|')]
        data.append(row)
    return pd.DataFrame(data, columns=headers)

def df_to_arff(df, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        # Escrevendo o cabeçalho ARFF
        f.write('@relation table\n\n')
        
        # Escrevendo os atributos ARFF
        for column in df.columns:
            f.write('@attribute {} string\n'.format(column))
        f.write('\n@data\n')
        
        # Escrevendo os dados ARFF
        for index, row in df.iterrows():
            f.write(','.join(row.values) + '\n')

def markdown_to_arff(markdown_text, arff_filename):
    df = markdown_to_df(markdown_text)
    df_to_arff(df, arff_filename)


markdown_text = """
| Tamanho da casa (pés quadrados) | Tamanho do lote | Quartos | Granito | Banheiro reformado? | Preço de venda |
| ------------------------------- | --------------- | ------- | ------- | ------------------- | -------------- |
| 3529                            | 9191            | 6       | 0       | 0                   | $205,000       |
| 3247                            | 10061           | 5       | 1       | 1                   | $224,900       |
| 4032                            | 10150           | 5       | 0       | 1                   | $197,900       |
| 2397                            | 14156           | 4       | 1       | 0                   | $189,900       |
| 2200                            | 9600            | 4       | 0       | 1                   | $195,000       |
| 3536                            | 19994           | 6       | 1       | 1                   | $325,000       |
| 2983                            | 9365            | 5       | 0       | 1                   | $230,000       |
| 3198                            | 9669            | 5       | 1       | 1                   | ???            |
"""


arff_filename = 'ex2.arff'
markdown_to_arff(markdown_text, arff_filename)
print("Conversão concluída! O arquivo ARFF foi salvo como:", arff_filename)
