from fastapi import FastAPI, UploadFile, File
import os

from services.vectorstore import create_vector_store

app = FastAPI()

@app.post("/upload")
async def upload_file(tenant_id: str, file: UploadFile = File(...)):
    folder = f"data/documents/{tenant_id}"
    os.makedirs(folder, exist_ok=True)

    file_path = os.path.join(folder, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # 🔥 AUTO TRAIN
    create_vector_store(tenant_id)

    return {"message": "Uploaded & trained ✅"}