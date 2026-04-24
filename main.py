from fastapi import FastAPI
from pydantic import BaseModel
from runner import execute_code
 
app = FastAPI()
 
class CodeRequest(BaseModel):
    language: str
    code: str
 
@app.post("/run")
def run_code(request: CodeRequest):
    output = execute_code(request.language, request.code)
    return {"output": output}