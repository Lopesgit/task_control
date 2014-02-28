/*
|-----------------------+---------------------------+---------|
|  Data de Alteração    |         Programador       |   SM    |
|-----------------------+---------------------------+---------|
| 10/10/2011 17/10/2011 |      Andre Politti        | SM01571 |
|-----------------------+---------------------------+---------|
*/

var ie = /msie/i.test(navigator.userAgent);

// INICIO - SM01571
if(typeof(ExecutaLoading) != 'undefined'){
    var ExecutaLoading = true;
}
// FIM - SM01571

function soNrEChar(evtKeyPress){
    //chamada para esta funcao: onKeyPress="return soNrEChar(event);"
    if(ie)
        nTecla = evtKeyPress.keyCode;
    else
        nTecla = evtKeyPress.which;
	  
    if (nTecla == 8)
        return true;
    else if (nTecla == 0)
        return true;
    else if (nTecla == 13)
        return true;
    else if(nTecla > 65 && nTecla < 90) // LETRAS MAIUSCULAS
        return true;
    else if(nTecla > 97 && nTecla < 122) // LETRAS MINUSCULAS
        return true;
    else if(nTecla > 47 && nTecla < 58) // numeros de 0 a 9
        return true;
    else
        return false;
}

function enviaForm(formulario)
{
    StyleDaBorda = "solid";
    WidthDaBorda = "2px";
    CorDaBorda = "red";

    numeroCampos = formulario.elements.length;
	
    var periodo_inicial = null;

    var x = 0;
    var erro =0;
    for (x=0;x<numeroCampos;x++)
    {
        campo = formulario.elements[x];
		
        if (campo.type == "text")
        {
            if (campo.title != "")
            {
                if (campo.id.toUpperCase().indexOf('DT') > -1 || campo.id.toUpperCase().indexOf('DATA') > -1)
                {
                    if (campo.value != "" && !validaData(campo))
                    {
                        erro=1;
                    }
                }
                else if(campo.id.toUpperCase().indexOf('DEC') > -1)
                {
                    if (!stringFilter(campo.value,'0123456789.,'))
                    {
                        alert ("Formato do campo incorreto!");
                        erro=1;
                    }

                }
                else if(campo.id.toUpperCase().indexOf('INT') > -1)
                {
                    if (!stringFilter(campo.value,'0123456789'))
                    {
                        erro=1;
                        alert ("Formato do campo incorreto!");
                    }
                }
                else if(campo.id.toUpperCase().indexOf('HORA') > -1)
                {
                    if (!validaHora(campo.value))
                    {
                        erro=1;
                        alert ("Formato do campo incorreto!");
                    }
                }
                else if(campo.id.toUpperCase().indexOf('MAIOR_0') > -1)
                {
                    if (campo.value <= 0)
                    {
                        erro=1;
                        alert ("Esse campo tem que ser MAIOR que 0 (Zero)");
                    }
                }

                if (campo.value == "" && erro == 0)
                {
                    erro=1;
                    alert (campo.title);
                }
                else
                {
                    campo.style.border = '';
                }
				
                if (campo.getAttribute("validacao"))
                {
                    if (campo.getAttribute("validacao").indexOf("data_inicial") > -1)
                    {
                        periodo_inicial = campo.value;
                    }
					
                    if (campo.getAttribute("validacao").indexOf("data_final") > -1)
                    {
                        if (periodo_inicial.length > 0 && campo.value.length > 0)
                        {
                            var data1 = periodo_inicial.split("/");
                            var data2 = campo.value.split("/");
							
                            data1 = new Date(data1[2], data1[1], data1[0]);
                            data2 = new Date(data2[2], data2[1], data2[0]);
							
                            if (data1.getTime() > data2.getTime())
                            {
                                erro = 1;
                                window.alert("A Data Inicial deve ser menor que a Data Final");
                            }
                        }
                    }
					
                    if (campo.getAttribute("validacao").indexOf("menor_hoje") > -1)
                    {
                        var data = campo.value.split("/");
						
                        if (new Date(data[2], (data[1] - 1), data[0], 0, 0, 0) > new Date())
                        {
                            erro = 1;
                            window.alert("A data nao deve ser maior que a data de hoje");
                        }
                    }
                }
            }
        }
        else if (campo.type=="textarea")
        {
            if (campo.title != "" && campo.value == "")
            {
                erro=1;
                alert (campo.title);
            }
        }
        else if (campo.type=="select-one")
        {
            if (campo.title != "" && campo.value == "-666")
            {
                erro=1;
                alert (campo.title);
            }
        }
        else if (campo.type=="hidden")
        {
            if (campo.title != "" && campo.value == "")
            {
                alert (campo.title);
                erro =1;
            }
        }

        if (erro == 1)
        {
            // SM01571
            // Variavel utilizada para executar o bloqueio de "Loading";
            ExecutaLoading = false;
            
            if(campo.type == 'hidden')
            {
                return false;
            }
            campo.style.borderStyle = StyleDaBorda;
            campo.style.borderWidth = WidthDaBorda;
            campo.style.borderColor = CorDaBorda;
            campo.focus();
            return false;
        }
        else
        {
            // SM01571
            // Variavel utilizada para executar o bloqueio de "Loading";
            ExecutaLoading = true;
            
            campo.style.borderStyle = '';
            campo.style.borderWidth = '';
            campo.style.borderColor = '';
        }
    }

    for (x=0;x<numeroCampos;x++)
    {
        campo = formulario.elements[x];
        if (campo.title != "")
        {
            campo.disabled = false;
        }
    }

    formulario.submit();

    return true;
}

function enviaFormComOpcionais( formulario, opcionais )
{
    StyleDaBorda = "solid";
    WidthDaBorda = "2px";
    CorDaBorda = "red";

    // INI - TRATA PARAMETROS OPCIONAIS
    campoFocus  = ''; 
    limparCampo = ''; 
    valorPadrao = ''; 
    campoPadrao = ''; 
    if( opcionais != '')
    {
        quantidadeOpcionais = 0;
        listaOpcionais = opcionais.split(',');
        quantidadeOpcionais = listaOpcionais.length;
        if(( quantidadeOpcionais > 0 )||( quantidadeOpcionais == 'undefined' ))
        {
            for( contador = 0; contador < quantidadeOpcionais; contador++ )
            {
                listaInstrucaoValor = listaOpcionais[contador].split(':');
                instrucao = listaInstrucaoValor[0];
                valor = listaInstrucaoValor[1];
                if( instrucao == 'campoFocus' )
                {
                    campoFocus = valor;
                }
                if( instrucao == 'limparCampo' )
                {
                    limparCampo = valor;
                }
                if( instrucao == 'valorPadraoCampo' )
                {
                    valorPadraoCampo = valor.split('=');
                    campoPadrao = valorPadraoCampo[0];
                    valorPadrao = valorPadraoCampo[1];
                }
            }
        }
    }
    // FIM - TRATA PARAMETROS OPCIONAIS 

    numeroCampos = formulario.elements.length;

    var x = 0;
    var erro =0;
    for (x=0;x<numeroCampos;x++)
    {
        campo = formulario.elements[x];

        if (campo.type == "text")
        {

            if (campo.title != "")
            {
                if (campo.id.toUpperCase().indexOf('DT') > -1 || campo.id.toUpperCase().indexOf('DATA') > -1)
                {
                    if (campo.value != "" && !validaData(campo))
                    {
                        erro=1;
                    }
                }
                else if(campo.id.toUpperCase().indexOf('DEC') > -1)
                {
                    if (!stringFilter(campo.value,'0123456789.,'))
                    {
                        alert ("Formato do campo incorreto!");
                        erro=1;
                    }
                }
                else if(campo.id.toUpperCase().indexOf('INT') > -1)
                {
                    if (!stringFilter(campo.value,'0123456789'))
                    {
                        erro=1;
                        alert ("Formato do campo incorreto!");
                    }
                }
                else if(campo.id.toUpperCase().indexOf('HORA') > -1)
                {
                    if (!validaHora(campo.value))
                    {
                        erro=1;
                        alert ("Formato do campo incorreto!");
                    }
                }
                else if(campo.id.toUpperCase().indexOf('MAIOR_0') > -1)
                {
                    if (campo.value <= 0)
                    {
                        erro=1;
                        alert ("Esse campo tem que ser MAIOR que 0 (Zero)");
                    }
                }

                if (campo.value == "" && erro == 0)
                {
                    erro=1;
                    alert (campo.title);
                }
                else
                {
                    campo.style.border = '';
                }
            }
        }
        else if (campo.type=="select-one")
        {
            if (campo.title != "" && campo.value == "-666")
            {
                erro=1;
                alert (campo.title);
            }
        }
        else if (campo.type=="hidden")
        {
            if (campo.title != "" && campo.value == "")
            {
                alert (campo.title);
                erro =1;
            }
        }

        if (erro == 1)
        {
            // SM01571
            // Variavel utilizada para executar o bloqueio de "Loading";
            ExecutaLoading = false;
            
            if(campo.type == 'hidden')
            {
                return false;
            }
            campo.style.borderStyle = StyleDaBorda;
            campo.style.borderWidth = WidthDaBorda;
            campo.style.borderColor = CorDaBorda;
            campo.focus();
            return false;
        }
        else
        {
            // SM01571
            // Variavel utilizada para executar o bloqueio de "Loading";
            ExecutaLoading = true;
            
            campo.style.borderStyle = '';
            campo.style.borderWidth = '';
            campo.style.borderColor = '';
        }
    }

    for (x=0;x<numeroCampos;x++)
    {
        campo = formulario.elements[x];
        if (campo.title != "")
        {
            campo.disabled = false;
        }
    }

    formulario.submit();

    // INI - TRATA PARAMETROS OPCIONAIS 
    if( campoFocus != '' )
    {
        document.getElementById(campoFocus).focus();
    }
    if( limparCampo != '' )
    {
        document.getElementById(limparCampo).value = '';
    }
    if( campoPadrao != '' )
    {
        document.getElementById(campoPadrao).value = valorPadrao;
    }
    // FIM - TRATA PARAMETROS OPCIONAIS 

    return true;
}

/***
 * AUTO TAB - ao prencher o campo, automaticamente manda o foco para o próximo!
 ***/
function autoTab(input,len, e) {
    var keyCode = (!ie) ? e.which : e.keyCode;

    var filter = (!ie) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];

    if(input.value.length >= len && !containsElement(filter,keyCode)) {
        input.value = input.value.slice(0, len);
        input.form[(getIndex(input)+1) % input.form.length].focus();
    }

    function containsElement(arr, ele)
    {
        var found = false, index = 0;
        while(!found && index < arr.length)
            if(arr[index] == ele)
                found = true;
            else
                index++;
        return found;
    }

    function getIndex(input) {
        var index = -1, i = 0, found = false;
        while (i < input.form.length && index == -1)
            if (input.form[i] == input)index = i;
            else i++;
        return index;
    }
    return true;
}


function validaData(data)
{
    if(data.value != "")
    {
        //validar data
        erro=0;
        hoje = new Date();
        anoAtual = hoje.getFullYear();
        barras = data.value.split("/");
        if (barras.length == 3)
        {
            dia = barras[0];
            mes = barras[1];
            ano = barras[2];
            resultado =
            (!isNaN(dia) && (dia > 0) && (dia < 32)) &&
            (!isNaN(mes)&& (mes > 0) && (mes < 13)) &&
            (!isNaN(ano) && (ano.length == 4) && (ano >= 1900));
            if (!resultado)
            {
                alert("Formato de data inválido!");
                data.focus();
                return false;
            }
        }
        else
        {
            alert("Formato de data inválido!");
            data.focus();
            return false;
        }
        return true;
    }
    else //CAMPO VAZIO
    {
        alert("O campo Data deve ser preenchido!");
        data.focus();
        return false;
    }
	
}

function stringFilter(input, mascara) {
    s = input;
    filteredValues = mascara; //"1234567890,";     // Characters stripped out
    var i;
    var returnString = "";
    for (i = 0; i < s.length; i++) {  // Search through string and append to unfiltered values to returnString.
        var c = s.charAt(i);
        if (filteredValues.indexOf(c) == -1) returnString += c;
    }
    if (returnString == ""){
        return true;
    }else{
        return false;
    }
}

function validaHora(hora)
{
    var msg="";
    var erro="";
    var h = (hora.substring(0,hora.indexOf(':')));
    var m = (hora.substring(hora.indexOf(':')+1,hora.length));
	
    var resp = false;
    if (hora == "")
    {
        alert("O campo Hora deve ser preenchido.");
        resp = false;		
    }
    else if (hora.substring(2,3) != ":" || hora.length < 5)
    {
        alert("Informe a hora no formato correto (hh:mm).");
        resp =  false;
    }
    else if ( h < 0 || h > 23 || isNaN(h) ) 
    {	
        //		msg+="Hora incorreta!\n\n"; erro=true;
        alert("Informe a hora no formato correto (hh:mm)."); 
        resp =  false;
    }
    else if (m < 0 || m > 59 || isNaN(m)) 
    {	
        //		msg+="Minuto incorreto!"; erro=true;
        alert("Informe a hora no formato correto (hh:mm)."); 
        resp =  false;		
    }
    else
    {
        resp = true;	
    }
    return resp; 

}

function limite_text_area(input,len, e)
{
    var keyCode = (!ie) ? e.which : e.keyCode;
    var filter = (!ie) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
    if(input.value.length >= len)
    {
        input.value = input.value.slice(0, len);
        return false;
    }
    return true;

}

function enviaForm_sem_submit(formulario)
{
    // SM01571
    // Variavel utilizada para executar o bloqueio de "Loading";
    ExecutaLoading = false;
    
    StyleDaBorda = "solid";
    WidthDaBorda = "2px";
    CorDaBorda = "red";

    numeroCampos = formulario.elements.length;

    var x = 0;
    var erro =0;
    for (x=0;x<numeroCampos;x++)
    {
        campo = formulario.elements[x];

        if (campo.type == "text")
        {

            if (campo.title != "")
            {
                if (campo.id.toUpperCase().indexOf('DT') > -1 || campo.id.toUpperCase().indexOf('DATA') > -1)
                {
                    //					if (campo.value != "" && !validaData(campo))
                    if (!validaData(campo))
                    {
                        erro=1;
                        break;
                    }
                }
                else if(campo.id.toUpperCase().indexOf('DEC') > -1)
                {
                    if (!stringFilter(campo.value,'0123456789.,'))
                    {
                        alert ("Formato do campo incorreto!");
                        erro=1;
                        break;
                    }

                }
                else if(campo.id.toUpperCase().indexOf('INT') > -1)
                {
                    if (!stringFilter(campo.value,'0123456789'))
                    {
                        erro=1;
                        alert ("Formato do campo incorreto!");
                        break;						
                    }
                }
                else if(campo.id.toUpperCase().indexOf('HORA') > -1)
                {
                    if (!validaHora(campo.value))
                    {
                        erro=1;
                        //						alert ("Formato do campo incorreto!");
                        break;						
                    }
                }
                else if(campo.id.toUpperCase().indexOf('MAIOR_0') > -1)
                {
                    if (campo.value <= 0)
                    {
                        erro=1;
                        alert ("Esse campo tem que ser MAIOR que 0 (Zero).");
                        break;						
                    }
                }

                if (campo.value == "" && erro == 0)
                {
                    erro=1;
                    alert (campo.title);
                    break;					
                }
                else
                {
                    campo.style.border = '';
                }
            }
            else if (campo.value != "") //SE CAMPO NÃO É OBRIGATÓRIO, PORÉM ESTÁ PREENCHIDO DEVE SER VALIDADO SEU FORMATO.
            {
                if (campo.id.toUpperCase().indexOf('DT') > -1 || campo.id.toUpperCase().indexOf('DATA') > -1)
                {
                    if (campo.value != "" && !validaData(campo))
                    {
                        erro=1;
                        break;
                    }
                }
				
                else if(campo.id.toUpperCase().indexOf('HORA') > -1)
                {
                    var resp = validaHora(campo.value);
                    if (resp == false || resp == "" )
                    {
                        erro=1;
                        break;						
                    }
                }
            }
        }
        else if (campo.type=="select-one")
        {
            if (campo.title != "" && campo.value == "-666")
            {
                erro=1;
                alert (campo.title);
                break;				
            }
        }
        else if (campo.type=="hidden")
        {
            if (campo.title != "" && campo.value == "")
            {
                alert (campo.title);
                erro =1;
                break;				
            }
        }
    }
	
    if (erro == 1)
    {
	   
        if(campo.type == 'hidden')
        {
            return false;
        }
        campo.style.borderStyle = StyleDaBorda;
        campo.style.borderWidth = WidthDaBorda;
        campo.style.borderColor = CorDaBorda;
        campo.focus();
        return false;
    }
    else
    {
        campo.style.borderStyle = '';
        campo.style.borderWidth = '';
        campo.style.borderColor = '';
    }


    for (x=0;x<numeroCampos;x++)
    {
        campo = formulario.elements[x];
		
        if (campo.title != "")
        {
            campo.disabled = false;
        }
    }
    return true;
}

