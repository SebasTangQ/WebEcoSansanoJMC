$(document).ready(function(){
    
    var row,checkBoxes;

    $("#btnBlockCombo").click(function(){

        checkBoxes = new Array();
        $.each($("input[name='checkboxes[]']:checked"),
        function(){
			show = $(this).parent().parent().is(":visible");
			if(show){
				value = $(this).val()
				checkBoxes.push(value.split(','))
			};
        });   
        checkBoxes = $.grep(checkBoxes, function (el, i) {
            
            if(el[1] === "FALLA TECNICA"){
                return false;
            } else if(el[1] === "MANTENCION") {
                return false;
            } else {
                return true;
            }
        });
        checkBoxes = checkBoxes.map(function(el){
            return el[0];
        });

        $('#lblTracto').text("Tractos: ");
        $('#tracto').attr({
            value: checkBoxes,
            style: "display: inline",
            disabled: "true"
        });

        $('#lblFecha').css('display','none');

        $('#lblObs').text("Observacion: MANTENCION");
        $('#menuObservaciones').css('display','none');
    
        $('#lblRUT').text("RUT: ");
        $('#rut').attr({
            value: "RUT Usuario",
            style: "display: inline",
            disabled: "true"
        });
    
        $('#lblNombre').text("Nombre: ".concat("Nombre Usuario"));
    
        $('.modal-header').attr({
            style: "background-color: #dc3545; color: black;",
        });
        $(".modal-title").text("Bloquear Tracto");
        $(".modal-body").css("background-color", "white");
        $('.modal-footer').attr({
            style: "background-color: white; display: block;",
        });

        $('#btnEdit').css("display","none");
        $('#btnCombo').css("display","inline");

        $("#ModalGeneral").modal("show");
    });
    
    $("#btnUnBlockCombo").click(function(){
    
        checkBoxes = new Array();
        $.each($("input[name='checkboxes[]']:checked"),
        function(){
			show = $(this).parent().parent().is(":visible");
			if(show){
				value = $(this).val()
				checkBoxes.push(value.split(','))
			};
        });
        checkBoxes = $.grep(checkBoxes, function (el, i) {
            if(el[1] === "SIN FALLA"){
                return false;
            } else if (el[1] == "DESBLOQUEADO") {
                return false;
            } else {
                return true
            }
        });
        checkBoxes = checkBoxes.map(function(el){
            return el[0];
        });

        $('#lblTracto').text("Tractos: ");
        $('#tracto').attr({
            value: checkBoxes,
            style: "display: inline",
            disabled: "true"
        });

        $('#lblFecha').css('display','none');
    
        $('#lblObs').text("Observacion: DESBLOQUEO");
        $('#menuObservaciones').css('display','none');
    
        $('#lblRUT').text("RUT: ");
        $('#rut').attr({
            value: "RUT Usuario",
            style: "display: inline",
            disabled: "true"
        });
    
        $('#lblNombre').text("Nombre: Nombre Usuario");
    
        $('.modal-header').attr({
            style: "background-color: #198754; color: white;",
        });
        $(".modal-title").text("Desbloquear Tracto");
        $(".modal-body").css("background-color", "white");
        $('.modal-footer').attr({
            style: "background-color: white; display: block;",
        });

        $('#btnEdit').css("display","none");
        $('#btnCombo').css("display","inline");

        $("#ModalGeneral").modal("show");
    
    });

    $(".btnBlock").click(function(){
    
        row = $(this).closest("tr"),
        item = row.children("td").map(function(){
            return ($(this));
        }).get();
        $('#lblTracto').text("Tracto: ");
        $('#tracto').attr({
            value: item[0][0].children[0].value.split(',')[0],
            style: "display: inline",
            disabled: "true"
        });
    
        $('#lblFecha').css('display','none');
    
        $('#lblObs').text("Observacion: ");
        $('#menuObservaciones').css('display','inline');
    
        $('#lblRUT').text("RUT: ");
        $('#rut').attr({
            value: "RUT Usuario",
            style: "display: inline",
            disabled: "true"
        });
    
        $('#lblNombre').text("Nombre: Nombre Usuario");
    
        $('.modal-header').attr({
            style: "background-color: #dc3545; color: black;",
        });
        $(".modal-title").text("Bloquear Tracto");
        $(".modal-body").css("background-color", "white");
        $('.modal-footer').attr({
            style: "background-color: white; display: block;",
        });
        $('#btnCombo').css("display","none");
        $('#btnEdit').css("display","inline");

        $("#ModalGeneral").modal("show");
    
    });
    
    $(".btnUnBlock").click(function(){
    
        row = $(this).closest("tr"),
        item = row.children("td").map(function(){
            return ($(this));
        }).get();
    
        $('#lblTracto').text("Tracto: ");
        $('#tracto').attr({
            value: item[0][0].children[0].value.split(',')[0],
            style: "display: inline",
            disabled: "true"
        });
    
        $('#lblFecha').css('display','none');
    
        $('#lblObs').text("Observacion: DESBLOQUEO");
        $('#menuObservaciones').css('display','none');
    
        $('#lblRUT').text("RUT: ");
        $('#rut').attr({
            value: "RUT Usuario",
            style: "display: inline",
            disabled: "true"
        });
    
        $('#lblNombre').text("Nombre: Nombre Usuario");
    
        $('.modal-header').attr({
            style: "background-color: #198754; color: white;",
        });
        $(".modal-title").text("Desbloquear Tracto");
        $(".modal-body").css("background-color", "white");
        $('.modal-footer').attr({
            style: "background-color: white; display: block;",
        });
        $('#btnCombo').css("display","none");
        $('#btnEdit').css("display","inline");

        $("#ModalGeneral").modal("show");
    
    });

    $(".btnViewer").click(function(){   

        row = $(this).closest("tr"),
        item = row.children("td").map(function(){
            return ($(this));
        }).get();
    
        $('#lblTracto').text("Tracto: ".concat(item[1].text()));
        $('#tracto').attr({
            value: item[1].text(),
            style: "display: none",
            disabled: "true"
        });
    
        $('#lblFecha').text("Fecha: ".concat(item[4].text()));
    
        $('#lblObs').text("Observacion: ".concat(item[3].text()));
        $('#menuObservaciones').css('display','none');
        
        operador = item[5].prop('innerText').split('\n');
        $('#lblRUT').text("RUT: ".concat(operador[0]).concat(" Usuario"));
        $('#rut').css("display","none");
    
        $('#lblNombre').text("Nombre: ".concat(operador[2]).concat(" Usuario"));
    
        $('.modal-header').attr({
            style: "background-color: #0d6efd; color: white;",
        });
        $(".modal-title").text("Revisar Tracto");
        $(".modal-body").css("background-color", "white");
        $('.modal-footer').attr({
            style: "background-color: white; display: block;",
        });
        $('#btnEdit').css("display","none");
        $('#btnCombo').css("display","none");

        $("#ModalGeneral").modal("show");
    });

    $('#formGeneral').submit(function(event){
        event.preventDefault();
        btn = $(this).find("button[type='submit']:focus");

        rut = $("#rut").val();
        switch ($('#lblObs').text()) {
            case "Observacion: DESBLOQUEO":
                cod_obs = 26;
                break;
            
            case "Observacion: MANTENCION":
                cod_obs = 27;
                break;
        
            default:
                cod_obs = $("#menuObservaciones").val();
                break;
        }
        
        estado = [1,5,6,15,16,17,18,26].includes(cod_obs);

        switch (btn.attr("id")) {
            case "btnEdit":
                combo = 0;
                tracto = $("#tracto").val();
                break;
            case "btnCombo":
                combo = 1;
                tracto = $("#tracto").val().split(',');
                break;
        }

        var params = {
            'tracto' : tracto,
            'rut' : rut,
            'cod_obs' : cod_obs,
            'estado' : estado,
            'combo' : combo,
        };
        $.ajax({
            url: 'database/update.php',
            type: 'POST',
            data: params,
            success: function(msg){
                
                alert(msg);

                window.location.reload();
                
            }
        });
    });

    $("#col-checkbox").click(function(){
        let check = $(this).prop('checked');
        
        $.each($("input[name='checkboxes[]']").not(this),
        function(){
            let show = $(this).parent().parent().is(":visible");
            if (show) {
                $(this).prop('checked', check);
            }
        });
		
        if ($("input:checkbox:checked").length>0) {
            $(".btnMasivo").attr("disabled", false);
        } else {  
            $(".btnMasivo").attr("disabled", true);
        }
    });

    $("input[name='checkboxes[]']").click(function () {
        if ($("input:checkbox:checked").length>0) {
            $(".btnMasivo").attr("disabled", false);
        } else {  
            $(".btnMasivo").attr("disabled", true);
        }
    });

    $("#filter-search").on('keyup', function(){
        $("#col-checkbox").prop('checked',false);
        const filterSearch = $(this).val();
        if($("#filter-switch").is(':checked')){
            var filterSwitch = ["MANTENCION","FALLA TECNICA"];
        } else {
            var filterSwitch = ["MANTENCION","FALLA TECNICA","SIN FALLA","DESBLOQUEADO","PERSONAL"];
        }
        $("#tablebody tr").each(function(){
            var text = $(this).find("td:eq(1)").text();
            var value = $(this).find("td:eq(0)").find('input:checkbox').val().split(',')[1];
            const foundSearch = text.indexOf(filterSearch) == 0;
            const foundSwitch = filterSwitch.indexOf(value) > -1;
            let show = (foundSwitch && foundSearch)
            
            $(this).toggle(show);
        });

    });

    $("#filter-switch").on('change', function(){
        const filterSearch = $("#filter-search").val();
        if($(this).is(':checked')){
            var filterSwitch = ["MANTENCION","FALLA TECNICA"];
        } else {
            var filterSwitch = ["MANTENCION","FALLA TECNICA","SIN FALLA","DESBLOQUEADO","PERSONAL"];
        }
        $("#tablebody tr").each(function(){
            var text = $(this).find("td:eq(1)").text();
            var value = $(this).find("td:eq(0)").find('input:checkbox').val().split(',')[1];
            const foundSearch = text.indexOf(filterSearch) == 0;
            const foundSwitch = filterSwitch.indexOf(value) > -1;
            let show = (foundSwitch && foundSearch)
            
            $(this).toggle(show);
        });
    });
});