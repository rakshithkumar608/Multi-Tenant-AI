from .vectorstore import load_vector_store

def retrieve_context(query, tenant_id):
    db = load_vector_store(tenant_id)
    
    docs = db.similarity_search(query, k=4)
    
    context = "\n".join([doc.page_content for doc in docs])
    
    return context