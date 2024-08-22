# astafantacalcio/asta/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from asta.models import Giocatore, Squadra
import json

@csrf_exempt
def aggiungi_squadre(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            crediti_iniziali = data.get('creditiIniziali')
            numero_partecipanti = int(data.get('numeroPartecipanti', 0))
            nomi_squadre = data.get('nomiSquadre')

            if not crediti_iniziali or not nomi_squadre or len(nomi_squadre) != numero_partecipanti:
                return JsonResponse({'error': 'Dati mancanti o errati'}, status=400)

            # Elimina tutte le squadre esistenti
            Squadra.objects.all().delete()

            # Aggiungi le nuove squadre
            for nome in nomi_squadre:
                squadra = Squadra(nome=nome, crediti=500)
                squadra.save()

            return JsonResponse({'success': True, 'message': 'Squadre aggiunte con successo!'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON malformato'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Metodo non supportato'}, status=405)

    
def get_giocatori(request):
    giocatori = Giocatore.objects.all().values('Id','rm','ruolo','nome','team', 'prezzo')
    return JsonResponse(list(giocatori), safe=False)


def get_giocatore_in_asta(request):
    # Recupera il giocatore corrente in asta
    giocatore_in_asta = Giocatore.objects.first()
    print(giocatore_in_asta)
    if giocatore_in_asta:
        data = {'id': giocatore_in_asta.Id, 'nome': giocatore_in_asta.nome, 'prezzo': str(giocatore_in_asta.prezzo), 'squadra': giocatore_in_asta.team ,'ruolo': giocatore_in_asta.rm, 'prezzoattuale' : 0}
        return JsonResponse(data)
    return JsonResponse({'error': 'Nessun giocatore in asta'}, status=404)

def get_squadre(request):
    squadre = Squadra.objects.all().values('id', 'nome')
    return JsonResponse(list(squadre), safe=False)

@csrf_exempt
def rilancia_giocatore(request, giocatore_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        prezzo = data.get('prezzo')
        try:
            giocatore = Giocatore.objects.get(id=giocatore_id)
            giocatore.prezzo = prezzo
            giocatore.save()
            return JsonResponse({'success': True})
        except Giocatore.DoesNotExist:
            return JsonResponse({'error': 'Giocatore non trovato'}, status=404)
    return JsonResponse({'error': 'Metodo non permesso'}, status=405)

@csrf_exempt
def aggiudica_giocatore(request, giocatore_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        squadra_id = data.get('squadra')
        try:
            giocatore = Giocatore.objects.get(id=giocatore_id)
            squadra = Squadra.objects.get(id=squadra_id)
            squadra.lista_giocatori.add(giocatore)
            squadra.crediti -= giocatore.prezzoattuale
            return JsonResponse({'success': True})
        except (Giocatore.DoesNotExist, Squadra.DoesNotExist):
            return JsonResponse({'error': 'Giocatore o squadra non trovato'}, status=404)
    return JsonResponse({'error': 'Metodo non permesso'}, status=405)
