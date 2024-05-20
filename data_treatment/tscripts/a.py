import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules


original_df = pd.read_csv('treated\\new_dadosPNADc_brutos2019_1.csv')
df = original_df.iloc[:, :20]

# columns = df.columns.tolist()
# dataset = df.values.tolist()

# uf_mapping = {uf: i+1 for i, uf in enumerate(df['UF'].unique())}

# # Mapeamento para Capital
# capital_mapping = {capital: i+1 for i, capital in enumerate(df['Capital'].unique())}

# # Mapeamento para Trimestre
# trimestre_mapping = {trimestre: i+1 for i, trimestre in enumerate(df['Trimestre'].unique())}

# # Aplicar mapeamento para UF, Capital e Trimestre
# df['UF'] = df['UF'].map(uf_mapping)
# df['Capital'] = df['Capital'].map(capital_mapping)
# df['Trimestre'] = df['Trimestre'].map(trimestre_mapping)

dist_uf = df['UF'].unique()
print(dist_uf)

# for col in df:
#     if(col != 'UF'):
#         df[col] = df[col].apply(lambda x: 't' if pd.notna(x) else '?')



# df.to_csv("final_df.csv", index=False)
