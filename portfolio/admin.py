from django.contrib import admin

from portfolio.models import Artigo


class ArtigoAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['titulo', 'link']}),
        ('Date information', {'fields': ['data_pub']}),
    ]
    list_filter = ['data_pub']
    search_fields = ['titulo']


admin.site.register(Artigo, ArtigoAdmin)
