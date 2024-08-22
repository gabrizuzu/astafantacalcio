# asta/serializers.py

from rest_framework import serializers
from .models import Utente, Giocatore, Offerta

class GiocatoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Giocatore
        fields = '__all__'
