import webbrowser
import subprocess
import os

html_file_path = 'src/index.html'

webbrowser.open_new_tab(f'file://{os.path.abspath(html_file_path)}')

npm_command = 'npm run dev'

subprocess.run(npm_command, shell=True, check=True)