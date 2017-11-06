# -*- coding: utf-8 -*-
from django.db import models


class Artigo(models.Model):
    titulo = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    data_pub = models.DateTimeField('data de publicação')

    def __str__(self):
        return self.titulo
