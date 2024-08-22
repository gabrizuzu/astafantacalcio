# astafantacalcio/asta/management/commands/import_players.py

import pandas as pd
from django.core.management.base import BaseCommand
from asta.models import Giocatore

class Command(BaseCommand):
    help = 'Importa giocatori dal file Excel'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Percorso del file Excel')

    def handle(self, *args, **options):
        file_path = options['file_path']
        try:
            # Leggi il file Excel
            
            df = pd.read_excel(file_path, engine='openpyxl')
            print(df)
            # Assicurati che le colonne siano corrette. Modifica questi nomi in base al tuo file Excel
            for index, row in df.iterrows():
                Giocatore.objects.get_or_create(
                    Id=row['Id'],
                    ruolo=row['R'],
                    rm=row['RM'],
                    nome=row['Nome'],
                    squadra=row['Squadra'],
                    prezzo=row['prezzo']
                )
            
            self.stdout.write(self.style.SUCCESS('Importazione completata con successo!'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Errore durante l\'importazione: {e}'))
