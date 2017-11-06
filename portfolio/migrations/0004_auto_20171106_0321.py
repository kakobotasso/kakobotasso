# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_auto_20171106_0320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='texto',
            name='texto',
            field=models.CharField(max_length=700),
            preserve_default=True,
        ),
    ]
