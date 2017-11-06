# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artigo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('titulo', models.CharField(max_length=255)),
                ('link', models.CharField(max_length=255)),
                ('data_pub', models.DateTimeField(verbose_name=b'data de publica\xc3\xa7\xc3\xa3o')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
