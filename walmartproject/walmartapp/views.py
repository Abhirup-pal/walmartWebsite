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




# data = pd.read_csv('final_dataset_0.csv')

# with open('final_dataset_embeddings.pkl', 'rb') as f:
#     embeddings = pickle.load(f)

# data['embeddings'] = embeddings
# model = SentenceTransformer('all-MiniLM-L6-v2')


# def getRecommendations(*args): #dummy version
#     query_embedding = model.encode("bra")

#     # # Calculate similarities and get top-N
#     sim_scores = data['embeddings'].apply(lambda x: cosine_similarity([query_embedding], [x]).flatten()[0])
#     top_indices = sim_scores.nlargest(10).index
#     res= data.iloc[top_indices]
#     res = res.reset_index()
#     res = res.loc[:, ['article_id', 'prod_name', 'price']]

#     ## convert to json
#     # res = res.to_json(orient='records')
#     # return res

#     # df = pd.read_csv('final_dataset_0.csv')

#     # sample = df.sample(15).loc[:, ['article_id', 'prod_name', 'price']]
#     # sample_to_json = json.loads(sample.to_json(orient='records'))
#     # print(JsonResponse(sample_to_json,safe=False))
#     # return JsonResponse(sample_to_json,safe=False)

#     res_to_json=json.loads(res.to_json(orient='records'))
#     return JsonResponse(res_to_json,safe=False)


data2 = pd.read_csv('final_dataset_0.csv')
data2['article_id'] = data2['article_id'].apply(lambda x: '0' + str(x))

base_model = ResNet50(weights='imagenet')
model = Model(inputs=base_model.input, outputs=base_model.get_layer('avg_pool').output)

def extract_features(img_path, model=model, target_size=(224, 224)):
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
    query_features = extract_features(query_image_path, model)
    query_features_pca = pca.transform([query_features])
    similarities = cosine_similarity(query_features_pca, image_features).flatten()
    top_indices = similarities.argsort()[-top_n:][::-1]
    return [image_paths[i] for i in top_indices]


def getRecommendations(*args):
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


    
    



