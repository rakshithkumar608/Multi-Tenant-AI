from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import os

from services.vectorstore import create_vector_store
from services.llm import generate_answer

app = FastAPI()
@app.get("/")
def read_root():
    return {"Hello": "World"}


class Query(BaseModel):
    question: str
    tenant_id: str



@app.post("/ask")
def ask(query: Query):
    answer = generate_answer(query.question, query.tenant_id)
    return {"answer": answer}



@app.post("/upload")
async def upload_file(tenant_id: str, file: UploadFile = File(...)):
    folder = f"data/documents/{tenant_id}"
    os.makedirs(folder, exist_ok=True)

    file_path = os.path.join(folder, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())


    create_vector_store(tenant_id)

    return {"message": "Uploaded & trained ✅"}