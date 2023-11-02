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

    // Agrega un evento clic al botón "Hacer Formulario"
    const showFormButton = document.getElementById('showFormButton');
    const formularioContainer = document.getElementById('formulario-container');

    showFormButton.addEventListener('click', function() {
        // Muestra el formulario y oculta el botón "Hacer Formulario"
        showFormButton.style.display = 'none';
        formularioContainer.style.display = 'block';

        // Obtén la referencia a la tabla de instrucciones en el HTML
        const instructionTableBody = document.querySelector('#instructionTable tbody');

        // Llena la tabla de instrucciones con filas para cada compostera
        composterasData.forEach((compostera, index) => {
            const row = instructionTableBody.insertRow();
            const cellCompostera = row.insertCell(0);
            const cellInstrucciones = row.insertCell(1);

            cellCompostera.textContent = `Compostera ${index + 1}`;
            cellInstrucciones.innerHTML = `<input type="text" class="form-control" id="instrucciones${index + 1}">`;
        });
    });

    // Función para generar el PDF del formulario y la tabla de monitoreo
    function generateFormPDF() {
        const formInstructions = [];

        // Obtener instrucciones de todas las composteras
        composterasData.forEach((compostera, index) => {
            const composteraId = index + 1;
            const instructionId = `instrucciones${composteraId}`;
            const instructionText = document.getElementById(instructionId).value;
            formInstructions.push({ Compostera: `Compostera ${composteraId}`, Instrucciones: instructionText });
        });

        const formData = [
            { text: 'Tabla de Monitoreo de Compostaje', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    body: composterasData.map((compostera, index) => [
                        `Compostera ${index + 1}`,
                        compostera.Desechos,
                        compostera.Volumen,
                        compostera.Humedad,
                    ]),
                },
            },
            { text: 'Formulario de Instrucciones', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    body: [formInstructions],
                },
            },
        ];

        const documentDefinition = {
            content: formData,
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                },
            },
        };

        pdfMake.createPdf(documentDefinition).open();
    }

    // Agrega un evento clic al botón "Imprimir Formulario"
    const printFormButton = document.getElementById('printFormButton');
    printFormButton.addEventListener('click', function() {
        generateFormPDF();
    });
};
