# Generated by Django 5.1 on 2024-08-22 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('asta', '0004_squadra'),
    ]

    operations = [
        migrations.RenameField(
            model_name='giocatore',
            old_name='squadra',
            new_name='team',
        ),
        migrations.RemoveField(
            model_name='squadra',
            name='crediti_iniziali',
        ),
        migrations.AddField(
            model_name='squadra',
            name='crediti',
            field=models.DecimalField(decimal_places=2, default=500.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='squadra',
            name='lista_giocatori',
            field=models.ManyToManyField(blank=True, to='asta.giocatore'),
        ),
        migrations.AlterField(
            model_name='squadra',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.DeleteModel(
            name='Offerta',
        ),
    ]
