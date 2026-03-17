from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
import os

DATA_PATH = "data/documents"
VECTOR_PATH = "data/vectorstore"

def get_embeddings():
    return HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en"
    )

def create_vector_db():
    docs = []

    for file in os.listdir(DATA_PATH):
        if file.endswith(".txt"):
            loader = TextLoader(os.path.join(DATA_PATH, file))
            docs.extend(loader.load())

    if not docs:
        print("No documents found!")
        return

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    split_docs = splitter.split_documents(docs)

    embeddings = get_embeddings()

    db = FAISS.from_documents(split_docs, embeddings)
    db.save_local(VECTOR_PATH)

    print("Vector DB created!")

if __name__ == "__main__":
    create_vector_db()