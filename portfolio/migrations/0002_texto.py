# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Texto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('texto', models.CharField(max_length=255)),
                ('tipo', models.CharField(max_length=255, choices=[(b'titulo', b'T\xc3\xadtulo'), (b'rodape', b'Rodap\xc3\xa9'), (b'sobre_profissional', b'Sobre - Profissional'), (b'sobre_pessoal', b'Sobre - Pessoal')])),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
