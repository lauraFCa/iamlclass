import pandas as pd
import unicodedata
from unidecode import unidecode


def remover_acentos(txt):
    """This function removes accents from a given text.

    Args:
        txt (any): The text to remove accents from.

    Returns:
        any: The text without accents.
    """
    if isinstance(txt, str):
        x = "".join(
            c
            for c in unicodedata.normalize("NFD", txt)
            if unicodedata.category(c) != "Mn"
        )
        return x
    else:
        return txt



def check_string(val):
    """This function checks if a value is a string and returns the value without accents.

    Args:
        val (any): The value to check and remove accents from.

    Returns:
        any: f"{unidecode(val)}" if the value is a string.
                val if the value is not a string.
    """
    if isinstance(val, str):
        return f"{unidecode(val)}"
    elif val is not None or str(val) != "nan":
        return val



def csv_to_arff(csv_file, arff_file):
    """This function converts a CSV file to an ARFF file (target on values for Apriori algorithm)

    Args:
        csv_file (str): The path of the CSV file to be converted.
        arff_file (str): The path of the ARFF file to be created.

    Returns:
        bool: True if the conversion is successful.
    """

    print("Converting CSV to ARFF")
    df = pd.read_csv(csv_file, low_memory=False, encoding="utf-8")
    print("CSV read")

    # Remove columns with all NaN values
    df = df.dropna(axis=1, how="all")

    df = df.map(remover_acentos)

    print("df mapped")

    cols_values = []
    for col in df:
        non_none = df[col].dropna()
        uniq_col = non_none.unique()
        uniq = [check_string(text1) for text1 in uniq_col]

        cols_values.append(uniq)

    with open(arff_file, "w", encoding="utf-8") as f:

        f.write("@relation data\n")

        indx = 0
        for col_name, dtype in zip(df.columns, df.dtypes):
            f.write(
                f"@attribute {col_name} {{{cols_values[indx]}}}\n".replace(
                    "[", ""
                ).replace("]", "")
            )
            indx += 1

        f.write("\n@data\n")
        for _, row in df.iterrows():
            row_data = ",".join(
                (
                    f'"{remover_acentos(val)}"'
                    if isinstance(val, str) and " " in val
                    else str(remover_acentos(val))
                )
                for val in row
            )
            f.write(row_data + "\n")


    with open(arff_file, "r", encoding="utf-8") as file:
        lines = file.readlines()
    
    new_lines = [line.replace("nan", "?") for line in lines]

    with open(arff_file, "w") as file:
        file.writelines(new_lines)


    return True


# Convert the CSV file to ARFF format
csv_to_arff("q2.csv", "q2.arff")
