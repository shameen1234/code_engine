import subprocess
import os
import uuid
 
TEMP_DIR = "temp"
 
os.makedirs(TEMP_DIR, exist_ok=True)
 
 
def execute_code(language, code):
    file_id = str(uuid.uuid4())
 
    try:
        if language == "python":
            file_path = f"{TEMP_DIR}/{file_id}.py"
 
            with open(file_path, "w") as f:
                f.write(code)
 
            result = subprocess.run(
                ["python", file_path],
                capture_output=True,
                text=True,
                timeout=3
            )
 
        elif language == "cpp":
            cpp_file = f"{TEMP_DIR}/{file_id}.cpp"
            exe_file = f"{TEMP_DIR}/{file_id}.exe"
 
            with open(cpp_file, "w") as f:
                f.write(code)
 
            compile = subprocess.run(
                ["g++", cpp_file, "-o", exe_file],
                capture_output=True,
                text=True,
                timeout=5
            )
 
            if compile.returncode != 0:
                return compile.stderr
 
            result = subprocess.run(
                [exe_file],
                capture_output=True,
                text=True,
                timeout=3
            )
 
        elif language == "javascript":
            js_file = f"{TEMP_DIR}/{file_id}.js"
 
            with open(js_file, "w") as f:
                f.write(code)
 
            result = subprocess.run(
                ["node", js_file],
                capture_output=True,
                text=True,
                timeout=3
            )
 
        else:
            return "Unsupported language"
 
        if result.returncode == 0:
            return result.stdout
        else:
            return result.stderr
 
    except subprocess.TimeoutExpired:
        return "Error: Execution Time Limit Exceeded"
 