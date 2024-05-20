import pandas as pd

df = pd.read_csv('treated\\new_dadosPNADc_brutos2019_1.csv',low_memory=False, encoding='utf-8')


# Supondo que 'df' seja o seu DataFrame do pandas
# Supondo que 'nome_tabela' seja o nome desejado para a tabela no banco de dados
nome_tabela = "DadosPNADc_brutos2019_1"
# Gere o script CREATE TABLE
script_create_table = f"CREATE TABLE IF NOT EXISTS {nome_tabela} (\n"

for col in df.columns:
    print("col in df.colunms")
    # Determine o tipo de dados da coluna no banco de dados com base no tipo de dados do pandas
    dtype = df[col].dtype
    if dtype == 'int64':
        sql_type = 'INT'
    elif dtype == 'float64':
        sql_type = 'FLOAT'
    elif dtype == 'object':
        sql_type = 'VARCHAR(255)'  # Ajuste o tamanho conforme necessário
    else:
        # Ajuste para outros tipos de dados conforme necessário
        sql_type = 'VARCHAR(255)'
    
    # Adicione a linha de definição da coluna ao script
    script_create_table += f"    {col} {sql_type},\n"

# Remova a vírgula extra e feche a declaração CREATE TABLE
script_create_table = script_create_table[:-2] + "\n);"

# Gere o script INSERT INTO
script_insert_data = f"INSERT INTO {nome_tabela} ({', '.join(df.columns)}) VALUES\n"

for index, row in df.iterrows():
    print("index, row in df.iterrows()")
    values = [f"'{value}'" if isinstance(value, str) else str(value) for value in row]
    script_insert_data += f"({', '.join(values)}),\n"

# Remova a vírgula extra e feche a declaração INSERT INTO
script_insert_data = script_insert_data[:-2] + ";"

# Combine os scripts CREATE TABLE e INSERT INTO
final_script = script_create_table + "\n\n" + script_insert_data


with open('create_and_insert_script.sql', 'w') as f:
    f.write(final_script)

print("Script CREATE TABLE e INSERT INTO salvo com sucesso!")
