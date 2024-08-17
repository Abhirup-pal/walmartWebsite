from rest_framework import viewsets
from .models import Item
import pandas as pd
import json
from django.http import JsonResponse
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import json
import pickle

import matplotlib.pyplot as plt
from PIL import Image
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import Model
import os
from groq import Groq   


GROQ_API_KEY = ''

data = pd.read_csv('final_dataset_0.csv')

with open('final_dataset_embeddings.pkl', 'rb') as f:
    embeddings = pickle.load(f)

data['embeddings'] = embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')
data['article_id'] = data['article_id'].apply(lambda x: '0' + str(x))


def getRecommendations(request): #dummy version
    query = request.GET.get('query',"")
    query_embedding = model.encode(query)

    # # Calculate similarities and get top-N
    sim_scores = data['embeddings'].apply(lambda x: cosine_similarity([query_embedding], [x]).flatten()[0])
    top_indices = sim_scores.nlargest(10).index
    res= data.iloc[top_indices]
    res = res.reset_index()
    res = res.loc[:, ['article_id', 'prod_name', 'price']]
    res_to_json=json.loads(res.to_json(orient='records'))
    return JsonResponse(res_to_json,safe=False)


data2 = pd.read_csv('final_dataset_0.csv')
data2['article_id'] = data2['article_id'].apply(lambda x: '0' + str(x))

base_model = ResNet50(weights='imagenet')
model2 = Model(inputs=base_model.input, outputs=base_model.get_layer('avg_pool').output)

def extract_features(img_path, model, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_data = image.img_to_array(img)
    img_data = np.expand_dims(img_data, axis=0)
    img_data = preprocess_input(img_data)
    features = model.predict(img_data)
    return features.flatten()


image_features_pca = np.load('image_features.npz')['arr_0']

with open('image_paths.pkl', 'rb') as f:
    image_paths = pickle.load(f)

with open('pca.pkl', 'rb') as f:
    pca = pickle.load(f)




def find_similar_images(query_image_path, image_features, top_n=5):
    query_features = extract_features(query_image_path, model2)
    query_features_pca = pca.transform([query_features])
    similarities = cosine_similarity(query_features_pca, image_features).flatten()
    top_indices = similarities.argsort()[-top_n:][::-1]
    return [image_paths[i] for i in top_indices]


def getRecommendationsImage(request):
    query_image = '../walmart/backend/test.jpg'
    top_similar_images = find_similar_images(query_image, image_features_pca, top_n=10)
    ids=[]
    for i in range(0, len(top_similar_images)):
        x = top_similar_images[i].split('/')[1].split('.')[0]
        ids.append(x)
    data=data2[data2['article_id'].isin(ids)]
    filtered_data = data[['article_id', 'prod_name', 'price']]
    res_to_json=json.loads(filtered_data.to_json(orient='records'))
    return JsonResponse(res_to_json,safe=False)





def get_range_prices(request, data=data):
    query = request.GET.get('query'," ")
    age = request.GET.get('age'," ")
    gender = request.GET.get('gender'," ")
    price_min= int(request.GET.get('price_min'," "))
    price_max= int(request.GET.get('price_max'," "))

    query=query+" "+age
    query=query+" "+gender


    # data = data[(data['price'] >= price_min-500) & (data['price'] <= price_max+500)]
    query_embedding = model.encode(query)

    # # Calculate similarities and get top-N
    sim_scores = data['embeddings'].apply(lambda x: cosine_similarity([query_embedding], [x]).flatten()[0])
    top_indices = sim_scores.nlargest(10).index
    res= data.iloc[top_indices]
    res = res.reset_index()
    res = res.loc[:, ['article_id', 'prod_name', 'price']]
    res_to_json=json.loads(res.to_json(orient='records'))
    return JsonResponse(res_to_json,safe=False)


system_prompt = 'You are given the latitude and longitude of a particular location and a particular month. Figure out the place from the coordinates and predict the season of that particular place in that particular month. Output only the season in ONE word as 4 categories: Summer, Monsoon, Winter and Season Neutral.'


def getSeason(request):
    coordinates = request.GET.get('query'," ")
    month = request.GET.get('month'," ")
    user_prompt = f"Coordinates are: {coordinates}, month = {month}. Predict the season in 1 word."
    client = Groq(
        api_key=GROQ_API_KEY
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        model="llama-3.1-70b-versatile",
        temperature=0,
        max_tokens=1024,
    )

    season = chat_completion.choices[0].message.content.strip()
    
    return JsonResponse({'season': season})



    

