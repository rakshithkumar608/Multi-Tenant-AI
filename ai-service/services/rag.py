from .vectorstore import load_vector_store

def retrieve_context(query, tenant_id):
    """
    Retrieve relevant context for a question from the tenant's vector store.
    Returns an empty string if no documents or FAISS DB exist.
    """
    db = load_vector_store(tenant_id)

    # ⚠️ Handle empty or missing DB
    if db is None or len(getattr(db, "index_to_docstore_id", [])) == 0:
        print(f"⚠️ Vector store empty for tenant {tenant_id}")
        return ""  # safe empty context

    # Retrieve top 4 similar documents
    docs = db.similarity_search(query, k=4)

    if not docs:
        print(f"⚠️ No relevant documents found for query: {query}")
        return ""  # safe empty context

    # Combine page content into single string
    context = "\n".join([doc.page_content for doc in docs])
    return context