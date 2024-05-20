import pandas as pd
import unicodedata



def treat_csv(inp, out):
    with open(inp, "r", encoding="utf-8") as file:
        lines = file.readlines()  

    new_lines = []
    current_line = ""

    i = 0
    for line in lines:
        new_lines.append(line.strip())
        if line.strip().startswith("Luís (MA)") or line.strip().startswith("de Desenvolvimento da Grande Teresina (PI)"):
            prev_line = lines[i-1].strip() + " "
            new_line = prev_line + line.strip()
            new_lines.pop(len(new_lines)-1)
            new_lines.pop(len(new_lines)+1-2)
            new_lines.append(new_line)

        i +=1


    with open(out, "w", encoding="utf-8") as file:
        for line in new_lines:
            file.write(line + "\n")



def remover_acentos(txt):
    if(isinstance(txt, str)):
        x = ''.join(c for c in unicodedata.normalize('NFD', txt) if unicodedata.category(c) != 'Mn')
        return x
    else:
        return txt



def csv_to_arff(csv_file, arff_file):
    df = pd.read_csv(csv_file, low_memory=False, encoding='utf-8')

    df.fillna(0, inplace=True)
    if df.columns[0] == '':
        df.columns.values[0] = 'Index'
    
    with open(arff_file, 'w', encoding='utf-8') as f:

        f.write('@relation data\n\n')


        for col_name, dtype in zip(df.columns, df.dtypes):
            if dtype == 'int64' or dtype == 'float64':
                f.write(f'@attribute {col_name} numeric\n')
            elif dtype == 'object':
                f.write(f'@attribute {col_name} string\n')

        f.write('\n@data\n')
        for _, row in df.iterrows():
            row_data = ','.join(f'"{remover_acentos(val)}"' if isinstance(val, str) and ' ' in val else str(remover_acentos(val)) for val in row)
            f.write(row_data + '\n')

filename = "dadosPNADc_brutos2019_1"
treated_csv = f"treated\\new_{filename}.csv"

#treat_csv(f"og\\{filename}.csv", treated_csv)
csv_to_arff(treated_csv, f"arff\\{filename}_3.arff")