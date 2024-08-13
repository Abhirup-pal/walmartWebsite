from django.db import models

class Item(models.Model):
    article_id = models.CharField(max_length=20)   
    prod_name = models.CharField(max_length=100)
    price =  models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.prod_name