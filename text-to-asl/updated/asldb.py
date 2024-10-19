from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
import torch
import intel_extension_for_pytorch as ipex  # Intel Extension for PyTorch
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# Initialize the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Apply Intel optimizations to the SentenceTransformer model
model = ipex.optimize(model)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["word_embeddings_db"]
collection = db["word_vectors"]

def get_most_similar_word(query_word):
    """
    Find the most similar word in the MongoDB collection using cosine similarity.
    """
    # Generate the embedding for the query word using Intel-optimized model
    query_vector = model.encode([query_word])[0]

    # Retrieve all word vectors from MongoDB
    all_words = list(collection.find({}, {"word": 1, "vector": 1}))

    # Calculate cosine similarities
    similarities = []
    for word_doc in all_words:
        word_vector = np.array(word_doc["vector"])
        similarity = cosine_similarity([query_vector], [word_vector])[0][0]
        similarities.append((word_doc["word"], similarity))

    # Get the word with the highest similarity
    most_similar_word = max(similarities, key=lambda x: x[1])

    return most_similar_word[0]  # Return the word only

def store_word_vector(word):
    """
    Generate and store the vector embedding for a word in MongoDB.
    """
    # Generate the embedding using Intel-optimized model
    embedding = model.encode([word])[0]
    
    # Convert the numpy array to a list for MongoDB storage
    vector = embedding.tolist()
    
    # Prepare the document
    document = {
        "word": word,
        "vector": vector
    }
    
    # Insert or update the document in MongoDB
    result = collection.update_one(
        {"word": word},
        {"$set": document},
        upsert=True
    )
    
    if result.upserted_id:
        print(f"Inserted new document for word: {word}")
    else:
        print(f"Updated existing document for word: {word}")

# store_word_vector("mine")

@app.route('/search', methods=['GET'])
def search_word():
    """
    Endpoint to search for the most similar word using a GET request.
    Example: /search?word=hello
    """
    try:
        # Get the word from the query parameter in the URL
        query_word = request.args.get('word')

        if not query_word:
            return jsonify({"error": "No word provided"}), 400

        # Get the most similar word
        most_similar_word = get_most_similar_word(query_word)

        return jsonify({"word": most_similar_word}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
