# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_texto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='texto',
            name='texto',
            field=models.CharField(max_length=500),
            preserve_default=True,
        ),
    ]
