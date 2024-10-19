# from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np
# words = ["I" , "table" , "student" , "book" , "on"]
# import socket
# import speech_recognition as sr
# import json
# model = SentenceTransformer('all-MiniLM-L6-v2') 
# import socket
# hostname = socket.gethostname()
# local_ip = socket.gethostbyname(hostname)
# print(f"Server IP Address: {local_ip}")

# def cosine_similarity_between_words(word1, word2):
#     word_embeddings = model.encode([word1, word2])
#     cosine_sim = cosine_similarity([word_embeddings[0]], [word_embeddings[1]])
#     return cosine_sim[0][0]


# def get_similar(lst):
#     ans = []
#     for j in lst:
#         currmax = 0 
#         currmaxind = 0
#         for i in words:
#             similarity = cosine_similarity_between_words(i, j)
#             if similarity > currmax:
#                 currmax = similarity
#                 currmaxind = i
#         ans.append(currmaxind)
#     return ans

# def recognize_speech():
#     recognizer = sr.Recognizer()
    
#     # Use the default microphone as the audio source
#     with sr.Microphone() as source:
#         print("Listening for speech...")
#         while True:
#             try:
#                 audio = recognizer.listen(source, timeout=5)  # Listen for up to 10 seconds
#                 # Recognize the speech using Google Web Speech API
#                 text =  recognizer.recognize_google(audio)
#                 print(f"Recognized speech: {text}")
#                 # Split the text into words and send each word separately
#                 words_list = text.split()
#                 for word in words_list:
#                     yield word  # Yield each word
                    
#             except sr.UnknownValueError:
#                 print("Sorry, I could not understand the audio.")
#             except sr.RequestError as e:
#                 print(f"Error with the speech recognition service; {e}")
#             except Exception as e:
#                 print(f"Unexpected error: {e}")

# def start_server():
#     server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     server_socket.bind(('localhost', 8765))
#     server_socket.listen(1)
#     print("Server listening on port 8765")

#     while True:
#         client_socket, addr = server_socket.accept()
#         print(f"Client connected from {addr}")

#         try:
#             for word in recognize_speech():
#                 print(f"Sending word to client: {word}")
#                 message = json.dumps({"word": get_similar([word])})
#                 client_socket.sendall(message.encode('utf-8'))
#                 print(f"Sent to client: {message}")
#         except Exception as e:
#             print(f"Error with client connection: {e}")
#         finally:
#             client_socket.close()

# if __name__ == "__main__":
#     start_server()


import socket
import speech_recognition as sr
import json
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

words = ["I", "table", "student", "book", "on"]
model = SentenceTransformer('all-MiniLM-L6-v2')

hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
print(f"Server IP Address: {local_ip}")

# Cosine similarity function
def cosine_similarity_between_words(word1, word2):
    word_embeddings = model.encode([word1, word2])
    cosine_sim = cosine_similarity([word_embeddings[0]], [word_embeddings[1]])
    return cosine_sim[0][0]

# Get the most similar words based on cosine similarity
def get_similar(lst):
    ans = []
    for j in lst:
        currmax = 0 
        currmaxind = 0
        for i in words:
            similarity = cosine_similarity_between_words(i, j)
            if similarity > currmax:
                currmax = similarity
                currmaxind = i
        ans.append(currmaxind)
    return ans

# Speech recognition function, yielding text as batches of words
def recognize_speech():
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Listening for speech...")
        while True:
            try:
                # audio = recognizer.listen(source, timeout=5)
                # text = recognizer.recognize_google(audio)
                text = input("Enter the sentence : ")
                print(f"Recognized speech: {text}")
                # Split the text into a list of words and return the list
                words_list = text.split()
                yield words_list  # Yield the entire list of words at once
            except sr.UnknownValueError:
                print("Sorry, I could not understand the audio.")
            except sr.RequestError as e:
                print(f"Error with the speech recognition service; {e}")
            except Exception as e:
                print(f"Unexpected error: {e}")

# Server-side socket communication
def start_server():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', 8765))
    server_socket.listen(1)
    print("Server listening on port 8765")

    while True:
        client_socket, addr = server_socket.accept()
        print(f"Client connected from {addr}")

        try:
            # Collecting words from recognize_speech in batches (as a list)
            for words_list in recognize_speech():
                print(f"Sending words to client: {words_list}")
                # Get similar words for the whole list and send as a single message
                similar_words = get_similar(words_list)
                message = json.dumps({"word": similar_words})  # Send the whole list
                client_socket.sendall(message.encode('utf-8'))
                print(f"Sent to client: {message}")
        except Exception as e:
            print(f"Error with client connection: {e}")
        finally:
            client_socket.close()

if __name__ == "__main__":
    start_server()
