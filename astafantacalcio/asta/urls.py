# astafantacalcio/asta/urls.py

from django.urls import path
from .views import get_giocatore_in_asta, get_squadre, rilancia_giocatore, aggiudica_giocatore, aggiungi_squadre, get_giocatori

urlpatterns = [
    path('giocatore-in-asta/', get_giocatore_in_asta, name='get_giocatore_in_asta'),
    path('squadre/', get_squadre, name='get_squadre'),
    path('rilancia/<int:giocatore_id>/', rilancia_giocatore, name='rilancia_giocatore'),
    path('aggiudica/<int:giocatore_id>/', aggiudica_giocatore, name='aggiudica_giocatore'),
    path('aggiungi-squadre/', aggiungi_squadre, name='aggiungi_squadre'),
    path('giocatori/', get_giocatori, name='get_giocatori'),
]
