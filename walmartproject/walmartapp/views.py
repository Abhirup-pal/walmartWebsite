from rest_framework import viewsets
from .models import Item
import pandas as pd
import json
from django.http import JsonResponse

def getRecommendations(*args): #dummy version
    df = pd.read_csv('final_dataset_0.csv')

    sample = df.sample(15).loc[:, ['article_id', 'prod_name', 'price']]
    sample_to_json = json.loads(sample.to_json(orient='records'))
    print(JsonResponse(sample_to_json,safe=False))
    return JsonResponse(sample_to_json,safe=False)