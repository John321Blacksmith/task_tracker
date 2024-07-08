# Generated by Django 5.0 on 2024-07-05 07:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Category')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, verbose_name='Project title')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Creation date')),
            ],
            options={
                'verbose_name': 'Project',
                'verbose_name_plural': 'Projects',
            },
        ),
        migrations.CreateModel(
            name='SimpleTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Task title')),
                ('description', models.TextField(verbose_name='Description')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Creation date')),
                ('is_completed', models.BooleanField(default=False, verbose_name='Completion state')),
                ('due_date', models.DateTimeField(verbose_name='Should be finished by')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.category', verbose_name='Category')),
            ],
            options={
                'verbose_name': 'Simple Tasks',
            },
        ),
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started_at', models.DateTimeField(auto_now_add=True, verbose_name='Start date')),
                ('ends_at', models.DateTimeField(verbose_name='Finish date')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.project', verbose_name='Included to project: ')),
            ],
            options={
                'verbose_name': 'Sprint',
                'verbose_name_plural': 'Sprints',
            },
        ),
        migrations.CreateModel(
            name='SprintTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Task title')),
                ('description', models.TextField(verbose_name='Description')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Creation date')),
                ('is_completed', models.BooleanField(default=False, verbose_name='Completion state')),
                ('sprint', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.sprint', verbose_name='Included to sprint')),
            ],
            options={
                'verbose_name': 'Sprint Task',
                'verbose_name_plural': 'Sprint Tasks',
            },
        ),
    ]