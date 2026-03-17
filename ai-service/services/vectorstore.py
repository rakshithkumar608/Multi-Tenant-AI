import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter

from .embeddings import get_embeddings

BASE_DOCS = "data/documents"
BASE_VECTOR = "data/vectorstore"


def create_vector_store(tenant_id):
    docs_path = f"{BASE_DOCS}/{tenant_id}"
    vector_path = f"{BASE_VECTOR}/{tenant_id}"

    documents = []

    for file in os.listdir(docs_path):
        file_path = os.path.join(docs_path, file)

        if file.endswith(".txt"):
            loader = TextLoader(file_path)
        elif file.endswith(".pdf"):
            loader = PyPDFLoader(file_path)
        else:
            continue

        documents.extend(loader.load())

    # 🔥 OPTIMIZATION: CHUNKING
    splitter = CharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    split_docs = splitter.split_documents(documents)

    embeddings = get_embeddings()

    db = FAISS.from_documents(split_docs, embeddings)

    os.makedirs(vector_path, exist_ok=True)
    db.save_local(vector_path)

    return db


def load_vector_store(tenant_id):
    vector_path = f"{BASE_VECTOR}/{tenant_id}"

    embeddings = get_embeddings()

    # ✅ If DB not exists → create automatically
    if not os.path.exists(os.path.join(vector_path, "index.faiss")):
        print(f"⚡ Creating vector DB for tenant: {tenant_id}")
        return create_vector_store(tenant_id)

    # ✅ Else load normally
    return FAISS.load_local(
        vector_path,
        embeddings,
        allow_dangerous_deserialization=True
    )