from django.contrib import admin

from portfolio.models import Artigo, Texto


class ArtigoAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['titulo', 'link']}),
        ('Date information', {'fields': ['data_pub']}),
    ]
    list_filter = ['data_pub']
    search_fields = ['titulo']


class TextoAdmin(admin.ModelAdmin):
    search_fields = ['tipo']


admin.site.register(Artigo, ArtigoAdmin)
admin.site.register(Texto, TextoAdmin)
