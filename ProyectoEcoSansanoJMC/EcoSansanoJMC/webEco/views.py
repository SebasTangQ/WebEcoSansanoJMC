from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render())

def compostaje(request):
  template = loader.get_template('compostaje.html')
  return HttpResponse(template.render())

def contacto(request):
  template = loader.get_template('contacto.html')
  return HttpResponse(template.render())

def recoleccion(request):
  template = loader.get_template('recoleccion.html')
  return HttpResponse(template.render())