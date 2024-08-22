#astafantacalcio/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('asta/', include('asta.urls')),  # Assicurati che questa riga sia presente
]
