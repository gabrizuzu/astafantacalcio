# asta/models.py

from django.db import models

class Utente(models.Model):
    username = models.CharField(max_length=30)
    crediti = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)

    def __str__(self):
        return self.username

class Giocatore(models.Model):
    Id = models.CharField(max_length=50, unique=True, primary_key=True)
    ruolo = models.CharField(max_length=20)
    rm = models.CharField(max_length=20)
    nome = models.CharField(max_length=50)
    team = models.CharField(max_length=50)
    prezzo = models.DecimalField(max_digits=10, decimal_places=2)
    prezzoattuale = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    def __str__(self):
        return self.nome

class Squadra(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    crediti = models.DecimalField(max_digits=10, decimal_places=2, default=500.0)
    lista_giocatori = models.ManyToManyField(Giocatore, blank=True)

    def __str__(self):
        return self.nome