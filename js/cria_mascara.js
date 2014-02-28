var ie = /msie/i.test(navigator.userAgent);
/*
   Descrição.: formata um campo do formulário de
   acordo com a máscara informada...
Parâmetros: - objForm (o Objeto Form)
- strField (string contendo o nome do textbox)

 * - sMask (mascara que define o
 * formato que o dado será apresentado,
 * usando o algarismo "9" para
 * definir números e o símbolo "!" para
 * qualquer caracter...
 * - evtKeyPress (evento)
 * Uso.......: <input type="textbox"
 * name="xxx".....
 * onkeypress="return txtBoxFormat(document.nomedoform, 'str_cep', '99999-999', event);">
 * Observação: As máscaras podem ser representadas como os exemplos abaixo:
 * CEP -> 99.999-999
 * CPF -> 999.999.999-99
 * CNPJ -> 99.999.999/9999-99
 * Data -> 99/99/9999
 * Tel Resid -> (99) 999-9999
 * Tel Cel -> (99) 9999-9999
 * Processo -> 99.999999999/999-99
 * C/C -> 999999-!
 * E por aí vai...
 ***/

function txtBoxFormat(objForm, strField, sMask, evtKeyPress, evtBotao)
{
	var i, nCount, sValue, fldLen, mskLen,bolMask, sCod, nTecla;
	var ie = /msie/i.test(navigator.userAgent);
	var ieBox = ie && (document.compatMode == null || document.compatMode == "BackCompat");

	if (ie)
		nTecla = evtKeyPress.keyCode;
	else
		nTecla = evtKeyPress.which;

    if (evtBotao == "enter" && nTecla == 13) document.formulario.submit();
	if (nTecla == 8) return true;
	if (nTecla == 0) return true;

	/*if(document.formulario) { // Internet Explorer
	  nTecla = evtKeyPress.keyCode; }
	  else if(document.formulario) { // Nestcape
	  nTecla = evtKeyPress.which;
	  }*/

	sValue = objForm[strField].value;
	// Limpa todos os caracteres de formatação que
	// já estiverem no campo.
	sValue = sValue.toString().replace( "-", "" );
	sValue = sValue.toString().replace( "-", "" );
	sValue = sValue.toString().replace( ".", "" );
	sValue = sValue.toString().replace( ".", "" );
	sValue = sValue.toString().replace( "/", "" );
	sValue = sValue.toString().replace( "/", "" );
	sValue = sValue.toString().replace( "(", "" );
	sValue = sValue.toString().replace( "(", "" );
	sValue = sValue.toString().replace( ")", "" );
	sValue = sValue.toString().replace( ")", "" );
	sValue = sValue.toString().replace( " ", "" );
	sValue = sValue.toString().replace( " ", "" );
	sValue = sValue.toString().replace( ":", "" );
	sValue = sValue.toString().replace( ":", "" );
	fldLen = sValue.length;
	mskLen = sMask.length;

	i = 0;
	nCount = 0;
	sCod = "";
	mskLen = fldLen;

	while (i <= mskLen) {
		bolMask = ((sMask.charAt(i) == "-") || (sMask.charAt(i) == ":") || (sMask.charAt(i) == ".") || (sMask.charAt(i) == "/"))
			bolMask = bolMask || ((sMask.charAt(i) == "(") || (sMask.charAt(i) == ")") || (sMask.charAt(i) == " "))

			if (bolMask) {
				sCod += sMask.charAt(i);
				mskLen++; }
			else {
				sCod += sValue.charAt(nCount);
				nCount++;
			}
		i++;
	}

	objForm[strField].value = sCod;
	if (nTecla != 8) { // backspace
		if (sMask.charAt(i-1) == "9") { // apenas números...
			return ((nTecla > 47) && (nTecla < 58)); } // números de 0 a 9
		else { // qualquer caracter...
			return true;
		}
	} else {
		return true;
	}
}

// FOMATAÇÃO DE MOEDA - 05/04/2010
// PARA USAR COLOQUE NO OBJETO: onKeyPress=”return(formataMoeda(this,’.',’,',event))”;
function formataMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e){
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    // 13=enter, 8=backspace as demais retornam 0(zero)
    // whichCode==0 faz com que seja possivel usar todas as teclas como delete, setas, etc
    if ((whichCode == 13) || (whichCode == 0) || (whichCode == 8))
    	return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave

    if (strCheck.indexOf(key) == -1)
    	return false; // Chave inválida
    len = objTextBox.value.length;
    for(i = 0; i < len; i++)
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal))
        	break;
    aux = '';
    for(; i < len; i++)
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1)
        	aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0)
    	objTextBox.value = '';
    if (len == 1)
    	objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
    if (len == 2)
    	objTextBox.value = '0'+ SeparadorDecimal + aux;
    if (len > 2)
	{
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--)
		{
            if (j == 3)
			{
                aux2 += SeparadorMilesimo;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        objTextBox.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
        	objTextBox.value += aux2.charAt(i);
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
    }
    return false;
}

function MascaraMoedaTresCasasDecimais(campo, SeparadorMilesimo, SeparadorDecimal, e, tamanho)
{

	var strCheck = '0123456789';
	var ie = /msie/i.test(navigator.userAgent);
	var whichCode = (ie) ? e.keyCode : e.which;
	//var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;
	if (whichCode == 8) return true;
	if (whichCode == 0) return true;

	key = String.fromCharCode(whichCode); // Valor para o código da Chave
	if (strCheck.indexOf(key) == -1) return false; // Chave inválida

	len = campo.value.length;

	campo.value = campo.value.replace( "," , "");
	campo.value = campo.value.replace( "." , "");
	//00001
	texto = '';
	if (len == 0)
		texto = key;
	else
	{
		x=0;
		while (x <= campo.value.length)
		{
			if (campo.value.charAt(x) != 0 || texto != '')
			{
			 	texto += campo.value.charAt(x);
			}
			x++;
		}
		texto += key;
	}

	while (texto.length < 7)
	{
		texto = '0'+texto;
	}

	if (texto.length <= 7)
	{
		texto = texto.substring(0,texto.length-4) + ',' + texto.substring(texto.length-4,texto.length);	
	}
	else if (texto.length >= 8)
	{
		texto = texto.substring(0,texto.length-7) + '.' +texto.substring(texto.length-7,texto.length-4) + ',' + texto.substring(texto.length-4,texto.length);	
	}

	campo.value = texto;
	return false;

	len = texto.length;
	
	texto_inicio = '';

	for (y=0 ; y<diferenca ; y++)
	{
		texto_inicio += '0';
	}

	texto = texto_inicio + texto + key;

	if (texto.length == 0)
	{
		texto = '00000'+key;
	}
/*	if (len == 0)
	{
		texto = '00000'+key;
	}
	else 
	{
		texto = campo.value + key;
		texto = texto.replace( "," , "");
		texto = texto.replace( "." , "");
	}*/

	
	campo.value = texto;

	return false;
}
function MascaraMoedaTresCasasDecimais2(campo, SeparadorMilesimo, SeparadorDecimal, e, tamanho)
            {
                if(campo.value.length > 7)
                {
                    return false;
                }
                var strCheck = '0123456789';
                var ie = /msie/i.test(navigator.userAgent);
                var whichCode = (ie) ? e.keyCode : e.which;
                //var whichCode = (window.Event) ? e.which : e.keyCode;
                if (whichCode == 13) return true;
                if (whichCode == 8) return true;
                if (whichCode == 0) return true;

                key = String.fromCharCode(whichCode); // Valor para o código da Chave
                if (strCheck.indexOf(key) == -1) return false; // Chave inválida

                len = campo.value.length;

                campo.value = campo.value.replace( "," , "");
                campo.value = campo.value.replace( "." , "");

                //00001
                texto = '';
                if (len == 0)
                    texto = key;
                else
                {
                    x=0;
                    while (x <= campo.value.length)
                    {
                        if (campo.value.charAt(x) != 0 || texto != '')
                        {
                            texto += campo.value.charAt(x);
                        }
                        x++;
                    }
                    texto += key;
                }

                while (texto.length < tamanho)
                {
                    texto = '0'+texto;
                }

                if (texto.length <= tamanho)
                {
                    texto = texto.substring(0,texto.length-3) + ',' + texto.substring(texto.length-3,texto.length);
                }
                else if (texto.length >= tamanho)
                {
                    //texto = texto.substring(0,texto.length-3) + ',' + texto.substring(texto.length-3,texto.length);
                    //alert(texto.substring(3,(texto.length - 1)));
                    texto = texto.substring(0,3) + "," + texto.substring(3,(texto.length - 1));
                    //texto = texto.substring(0,texto.length-tamanho) + '.' +texto.substring(texto.length-tamanho,texto.length-3) + ',' + texto.substring(texto.length-3,texto.length);
                }

                campo.value = texto;
                return false;

                len = texto.length;

                texto_inicio = '';

                for (y=0 ; y<diferenca ; y++)
                {
                    texto_inicio += '0';
                }

                texto = texto_inicio + texto + key;

                if (texto.length == 0)
                {
                    texto = '00000'+key;
                }

                campo.value = texto;

                return false;
            }

function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e, tamanho)
{
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var ie = /msie/i.test(navigator.userAgent);
	var whichCode = (ie) ? e.keyCode : e.which;
	//var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;
	if (whichCode == 8) return true;
	if (whichCode == 0) return true;

	key = String.fromCharCode(whichCode); // Valor para o código da Chave
	if (strCheck.indexOf(key) == -1) return false; // Chave inválida
	len = objTextBox.value.length;
	if (len > tamanho)
	{
		return false;
	}
	for(i = 0; i < len; i++)
		if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
	aux = '';
	for(; i < len; i++)
		if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) objTextBox.value = '';
	if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
	if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
	if (len > 2) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += SeparadorMilesimo;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		objTextBox.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			objTextBox.value += aux2.charAt(i);
		objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
	}
	return false;
}

function soNumero( campo , evento)
{
	if (ie)
		var tecla = evento.keyCode;
	else
		var tecla = evento.which;

	if (tecla == 48 || tecla == 49 || tecla == 50 || tecla == 51 || tecla == 52 || tecla == 53 || tecla == 54 || tecla == 55 || tecla == 56 || tecla == 57 || tecla == 8 || tecla == 0)
	{
		return tecla;
	}
	else
	{	
		return false;
	}	
}

function FAA(objTextBox, e)
{
	var tamanho = 8;
	var Separador = '/';
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var ie = /msie/i.test(navigator.userAgent);
	var whichCode = (ie) ? e.keyCode : e.which;

	if (whichCode == 13) return true;
	if (whichCode == 8) return true;
	if (whichCode == 0) return true;

	key = String.fromCharCode(whichCode); // Valor para o código da Chave
	if (strCheck.indexOf(key) == -1) return false; // Chave inválida
	len = objTextBox.value.length;
	if (len > tamanho)
	{
		return false;
	}
	for(i = 0; i < len; i++)
		if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != Separador)) break;
	aux = '';
	for(; i < len; i++)
		if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) objTextBox.value = '';
	if (len == 1) objTextBox.value = '0'+ Separador + '0' + aux;
	if (len == 2) objTextBox.value = '0'+ Separador + aux;
	if (len > 2) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			aux2 += aux.charAt(i);
			j++;
		}
		objTextBox.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			objTextBox.value += aux2.charAt(i);
		objTextBox.value += Separador + aux.substr(len - 2, len);
	}
	return false;
}

function CertidaoNovoModelo(campo, evento)
{
	if (campo.value.length == 0)
	{
		return;
	}

	campo.value = campo.value.replace(/\D{0,}/g, ""); // Tira letras
	campo.value = campo.value.replace(/\[ ]/g, ""); // Tira espaços

	// Exemplo: 998021 01 55 2009 3 00001 075 0532553 16
	//          01234567890123456789012345678901234567890123456789
	//          0         1         2         3         4

	var espacos = new Array(6, 9, 12, 17, 19, 25, 29, 37);
	var v1, v2;
	
	for (var i = 0; i < espacos.length; i++)
	{
		v1 = campo.value.substr(0, espacos[i]);
		v2 = campo.value.substr(espacos[i], campo.value.length);
	
		if (v2.length > 0)
		{
			campo.value = v1 + " " + v2;
		}
	}
}