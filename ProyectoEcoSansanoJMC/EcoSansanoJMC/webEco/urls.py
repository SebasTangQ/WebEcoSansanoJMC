from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('compostaje/', views.compostaje, name='compostaje'),
    path('contacto/', views.contacto, name='contacto'),
    path('recoleccion/', views.recoleccion, name='recoleccion'),
]