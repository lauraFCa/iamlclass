import pandas as pd
import unicodedata


def remover_acentos(txt):
    if isinstance(txt, str):
        x = "".join(
            c
            for c in unicodedata.normalize("NFD", txt)
            if unicodedata.category(c) != "Mn"
        )
        return x
    else:
        return txt


def csv_to_arff(csv_file, arff_file):
    df = pd.read_csv(csv_file)

    with open(arff_file, "w", encoding="utf-8") as f:

        f.write("@relation data\n")

        for col_name, dtype in zip(df.columns, df.dtypes):
            if col_name == "UF":
                f.write(f"@attribute {col_name} " + "{'', '', }\n")
            else:
                f.write(f"@attribute {col_name}" + "{t}\n")

        # Escrever os dados ARFF
        f.write("\n@data\n")
        for _, row in df.iterrows():
            row_data = ",".join(str(remover_acentos(val)) for val in row)
            f.write(row_data + "\n")

    return True


csv_file = "binario2.csv"  # Substitua pelo caminho do seu arquivo CSV
arff_file = "saida2.arff"  # Nome do arquivo ARFF de saída
csv_to_arff(csv_file, arff_file)
