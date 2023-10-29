const composterasData = [];

window.onload = function() {
    const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR79tIXCBGmZqLO9xpC-gfLY3ho4I19YUOHo4nnrKQ9pxULjhwN78d6J1UiBp0Ul7M-s3CvBYm1TMDh/pub?gid=136483845&single=true&output=tsv";
   
    fetch(googleSheetUrl)
        .then((response) => response.text())
        .then((data) => {
            
            // Divide los datos en líneas
            const lines = data.split('\n');
            
            // Obtén la primera fila (encabezados)
            const headers = lines[0].split('\t');

            // Obtén la última fila (dato más reciente)
            const lastRow = lines[lines.length - 1].split('\t');

            // Combina los encabezados y la última fila en una matriz de matriz
            const jsonData = [headers, lastRow];


            // Procesar los datos
            const reportDate = jsonData[1][0].split(' ')[0];
            const cantComposteras = (Object.keys(jsonData[0]).length - 1) / 3;
            
            for (let i = 1; i <= cantComposteras; i++) {
                const compostera = {
                    Desechos: jsonData[1][cantComposteras * 0 + i],
                    Volumen: jsonData[1][cantComposteras * 1 + i],
                    Humedad: jsonData[1][cantComposteras * 2 + i],
                };
                composterasData.push(compostera);
            }
            
            // Obtener la referencia a la tabla en el HTML
            const tableBody = document.getElementById('compostera-data');
            document.querySelector('h1').textContent = `Monitoreo de Compostaje - ${reportDate}`;
            // Llenar la tabla con los datos
            composterasData.forEach((compostera, index) => {
                const row = tableBody.insertRow();
                const cellCompostera = row.insertCell(0);
                const cellDesechos = row.insertCell(1);
                const cellVolumen = row.insertCell(2);
                const cellHumedad = row.insertCell(3);
                
                cellCompostera.textContent = `N° ${index + 1}`;
                cellDesechos.textContent = compostera.Desechos;
                cellVolumen.textContent = compostera.Volumen;
                cellHumedad.textContent = compostera.Humedad;
            });
            
            // Inicializa DataTables en la tabla
            $(document).ready(function() {
                $('#dataTable').DataTable({
                    dom: '',
                });
            });
        });
};
