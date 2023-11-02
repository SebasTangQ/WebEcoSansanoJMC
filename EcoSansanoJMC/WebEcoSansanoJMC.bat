@echo off
echo Iniciando servidor EcoSansano...
cd D:\ProyectoEcoSansanoJMC\WebEcoSansanoJMC\EcoSansanoJMC\
start "EcoSansano" "microsoft-edge:http://127.0.0.1:8000"
python manage.py runserver
exit
