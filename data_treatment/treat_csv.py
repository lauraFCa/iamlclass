"""

It takes the path of the CSV file as input and returns the path of the treated file.

Parameters:
- csv_file_path: The path of the CSV file to be treated.

Returns:
- outp: The path of the treated file.
"""
def treat_csv(csv_file_path):
    """This function treats a CSV file by modifying its content and saving it to a new file.

    Args:
        csv_file_path (str): The path of the CSV file to be treated.

    Returns:
        str: The path of the treated file.
    """
    with open(csv_file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    new_lines = []

    i = 0
    for line in lines:
        print(f"fix line {i}")
        # line = re.sub(r'(?<!")([^,"]+)(?!,")', r'"\1"', line)
        new_first_line = line.strip()
        if i == 0:
            parts = line.strip().split(",")
            parts[0] = '"Index"'
            new_first_line = ",".join(parts)

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
    csv_file = csv_file_path.split("\\")[1]
    outp = f"treated\\new_{csv_file}"
    with open(outp, "w", encoding="utf-8") as file:
        for line in new_lines:
            print("saving line in file")
            file.write(line + "\n")

    return outp


# Treat the CSV file
treat_csv("og\\dadosPNADc_brutos2019_1.csv")
