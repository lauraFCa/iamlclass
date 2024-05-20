import re

with open("tscripts\\seu_arquivo.csv", "r", encoding="utf-8") as file:
    lines = file.readlines()  

new_lines = []
current_line = ""

i = 0
for line in lines:
    print(f"fix line {i}")
    #line = re.sub(r'(?<!")([^,"]+)(?!,")', r'"\1"', line)
    new_first_line = line.strip()
    if i == 0:
        parts = line.strip().split(',')
        parts[0] = '"Index"'
        new_first_line = ','.join(parts)

    new_lines.append(new_first_line)
    if line.strip().startswith("Luís (MA)") or line.strip().startswith(
        "de Desenvolvimento da Grande Teresina (PI)"
    ):
        prev_line = lines[i - 1].strip() + " "
        new_line = prev_line + line.strip()
        new_lines.pop(len(new_lines) - 1)
        new_lines.pop(len(new_lines) + 1 - 2)
        new_lines.append(new_line)

    i += 1


with open("tscripts\\seu_arquivo_corrigido2.csv", "w", encoding="utf-8") as file:
    for line in new_lines:
        print("saving line in file")
        file.write(line + "\n")
