from fastapi import FastAPI
from pydantic import BaseModel
from runner import execute_code
from fastapi.middleware.cors import CORSMiddleware
 
app = FastAPI()
 
# Allow frontend to connect with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
class CodeRequest(BaseModel):
    language: str
    code: str
    input_data: str = ""
 
@app.get("/")
def home():
    return {"message": "Multi-Language Code Execution Engine Running"}
 
@app.post("/run")
def run_code(request: CodeRequest):
    output = execute_code(
        request.language,
        request.code,
        request.input_data
    )
    return {"output": output}
 