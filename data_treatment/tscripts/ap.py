import numpy as np
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules


df = pd.read_csv('tscripts\\seu_arquivo_corrigido.csv')
print(df.head())
df.fillna(0, inplace=True)
print(df.head())

data_encoded = pd.get_dummies(df, columns=['UF'])
data_encoded = data_encoded.get_dummies(df, columns=['Capital'])

# def hot_encode(x):
#     if x <= 0:
#         return 0
#     if x >= 1:
#         return 1

# df_encoded = df.applymap(hot_encode)


# frq_items = apriori(df_encoded, min_support=0.05, use_colnames=True)
# rules = association_rules(frq_items, metric="lift", min_threshold=1)
# rules = rules.sort_values(['confidence', 'lift'], ascending=[False, False])
# print(rules.head())
