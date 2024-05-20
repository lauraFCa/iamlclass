import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules


original_df = pd.read_csv('tscripts\\seu_arquivo_corrigido.csv')
df = original_df.iloc[:, :20]

columns = df.columns.tolist()
dataset = df.values.tolist()


for col in df:
    df[col] = df[col].apply(lambda x: 1 if pd.notna(x) else 0)

df.to_csv("binario.csv", index=False)

print("df.head()")
print(df.head())

threshold = 0.4
transform_bol = True


print("freq_itens")
freq_itens = apriori(df, min_support=threshold)
print(freq_itens)


print("rules")
rules = association_rules(freq_itens, metric="lift", min_threshold=1.0)
print(rules)

print("filtered_rules")
filtered_rules = rules[rules["lift"] != 1.0].head(5)
print(filtered_rules)
