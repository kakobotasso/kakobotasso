from django.shortcuts import render

from .models import Artigo


def index(request):
    artigos_list = Artigo.objects.order_by('-data_pub')
    context = {
        'artigos': artigos_list,
    }
    return render(request, 'portfolio/index.html', context)
