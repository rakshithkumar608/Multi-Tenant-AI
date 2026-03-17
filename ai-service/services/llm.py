import os
from groq import Groq
from dotenv import load_dotenv

from .rag import retrieve_context

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_answer(question, tenant_id=None):
    context = retrieve_context(question, tenant_id)
    
    prompt = f"""
    You are an AI assistant for a company.
    
    So when ur giving answers to users, use relevant emojis 😊
    
    Answer ONLY from the context below.
    If not found, say "I don't know"
    
    Context:
    {context}
    
    Question:
    {question}
    """
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    
    return response.choices[0].message.content