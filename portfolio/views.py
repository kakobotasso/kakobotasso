from django.shortcuts import render

from .models import Artigo, Texto


def index(request):
    artigos_list = Artigo.objects.order_by('-data_pub')
    textos_list = Texto.objects.all
    context = {
        'artigos': artigos_list,
        'textos': textos_list,
    }
    return render(request, 'portfolio/index.html', context)
