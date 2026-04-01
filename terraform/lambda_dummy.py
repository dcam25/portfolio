import json
import os
import requests
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec

# Initialize OpenAI
openai_api_key = os.environ.get("OPENAI_API_KEY")
openai_client = OpenAI(api_key=openai_api_key)

# Initialize Pinecone
pinecone_api_key = os.environ.get("PINECONE_API_KEY")
pinecone_environment = os.environ.get("PINECONE_ENVIRONMENT")
pinecone_index_name = os.environ.get("PINECONE_INDEX_NAME")

if pinecone_api_key and pinecone_environment and pinecone_index_name:
    pc = Pinecone(api_key=pinecone_api_key)
    index = pc.Index(pinecone_index_name)
else:
    index = None

def handler(event, context):
    try:
        # Parse request body
        body = json.loads(event.get("body", "{}"))
        user_message = body.get("message", "")
        
        if not user_message:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Message is required"})
            }
        
        # Generate response using OpenAI
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        
        assistant_message = response.choices[0].message.content
        
        # Store in Pinecone if available
        if index:
            try:
                # Generate embedding
                embedding_response = openai_client.embeddings.create(
                    input=user_message,
                    model="text-embedding-3-small"
                )
                embedding = embedding_response.data[0].embedding
                
                # Generate unique ID
                import uuid
                vector_id = str(uuid.uuid4())
                
                # Upsert to Pinecone
                index.upsert(
                    vectors=[
                        {
                            "id": vector_id,
                            "values": embedding,
                            "metadata": {
                                "user_message": user_message,
                                "assistant_message": assistant_message,
                                "timestamp": context.get("aws_request_id", "unknown")
                            }
                        }
                    ]
                )
            except Exception as e:
                print(f"Error storing in Pinecone: {str(e)}")
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": assistant_message,
                "source": "openai"
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
