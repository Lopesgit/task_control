/*
|---------------------+---------------------------+---------|
|  Data de AlteraÁ„o  |         Programador       |   SM    |
|---------------------+---------------------------+---------|
| 23/12/2011          |      Diego Don·           | SM01648 |
|---------------------+---------------------------+---------|
| 06/01/2012          |      Diego Don·           | SM01407 |
|---------------------+---------------------------+---------|
|     10/05/2013      |     Diego Don·            | SM02889 | 
|---------------------+---------------------------+---------|
*/

// TIRAR ESPA√áO EM BRANCO
function trim(str){
	str = str.replace(/\s+/g," ");
	str = str.replace(/^ /,"");
	str = str.replace(/ $/,"");
	return str;
}

function CombosRelatorio( campo, texto )
{
	cabecalho = document.getElementById('cabecalho_hidden').value;
	document.getElementById('cabecalho_hidden').value = '';

	itens_c = cabecalho.split('##');

	for (x=0;x<itens_c.length;x++)
	{
		texto_c = itens_c[x];

		if (texto_c != null && texto_c != undefined && texto_c != '')
		{
			if (texto_c.indexOf(texto) < 0)
			{
				document.getElementById('cabecalho_hidden').value += texto_c + '##';
			}
		}
	}
	valor = campo.options[campo.selectedIndex].text;
	codigo = campo.options[campo.selectedIndex].value;
	if (codigo != '-666')
		document.getElementById('cabecalho_hidden').value += texto + valor + '##';
}

function dataMenorQueHoje( data )
{
	var hoje = new Date();

	mes_tela = data.substring(3,5);
	ano_tela = data.substring(6,10);
	dia_tela = data.substring(0,2);

	data_tela = new Date(ano_tela, mes_tela -1, dia_tela);
	if (data_tela > hoje)
	{
		alert ('A data da nota deve ser menor que a data de hoje.');
		return false;
	}
	return true;
}


function validaQtdeAlmoxarifado( qtde, produto , listaDeProdutos , fornecedor)
{

	if (qtde.value == 0)
	{
		alert ('Insira uma quantidade');
		qtde.focus();
		return false;
	}

	produtosLista = listaDeProdutos.split('??');

	qtde_final = parseInt(qtde.value);

	for (x=0;x<produtosLista.length;x++)
	{
		produto_lista = produtosLista[x].split('##');
		codigo = produto_lista[0];

		if (fornecedor == null)
		{
			if (codigo == produto)
			{
				qtde_final = parseInt(qtde_final) + parseInt(produto_lista[1]);
			}
		}
		else
		{
			if (fornecedor == codigo)
			{
				codigo_produto = produto_lista[1];
				if (codigo_produto == produto)
				{
					qtde_final = parseInt(qtde_final) + parseInt(produto_lista[3])
				}
			}
		}
	}

	endereco = '../include/http_valida_estoque.php?id='+produto+'&qtde_inserida='+qtde_final;
	loadXMLDoc (endereco);				
}

function imprimir_pdf(tipoPDF,chave)
{
	if (tipoPDF == 'retrato')
	{
		endereco = "relatorio_pdf.php?tipo=P";
	}
	else
	{
		endereco = "relatorio_pdf.php?tipo=L";
	}

	win=window.open('','myWin','width=800, height=600,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=yes,resizable=yes,top=1,left=1');

	action_antigo = document.formulario.action;
	target_antigo = document.formulario.target;

	document.formulario.target='myWin';
	document.formulario.action='../pdf/'+endereco+'&chave='+chave+'&diretiva=imp&';
	document.formulario.submit();
	document.formulario.target = target_antigo;
	document.formulario.action = action_antigo;
}

function imprimir_pdf_iframe(nome_iframe,orientacao_papel)
{
    var chave = nome_iframe.getElementById('chave').value;
    imprimir_pdf(orientacao_papel,chave);

}


function etiqueta_cartao_sus(usuario,path)
{
	window.open('imprimir_etiqueta_cartao.php?id='+usuario+'&municipio_path='+path,'pop_up','width=415, height=360,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=no,resizable=no,top=250,left=300');
}

function cartao_sus(usuario,path)
{
	window.open('cartao_sus.php?id='+usuario+'&municipio_path='+path,'pop_up','width=415, height=360,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=no,resizable=no,top=250,left=300');
}

function etiqueta_prontuario(usuario,path,num_prontuario,id_unidade)
{
	window.open('imprimir_etiqueta_prontuario.php?id='+usuario+'&municipio_path='+path+'&num_prontuario='+num_prontuario+'&id_unidade='+id_unidade,'pop_up','width=390, height=150,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=no,resizable=no,top=250,left=300');
}

function abriEtiquetaNova(usuario,path,num_prontuario,id_unidade)
{
	window.open('imprimir_etiqueta_prontuario_nova2.php?id='+usuario+'&municipio_path='+path+'&num_prontuario='+num_prontuario+'&id_unidade='+id_unidade,'pop_up','width=390, height=150,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=no,resizable=no,top=250,left=300');
}

function etiqueta(usuario,path,num_prontuario,id_unidade)
{
	window.open('imprimir_etiqueta.php?id='+usuario+'&municipio_path='+path+'&num_prontuario='+num_prontuario+'&id_unidade='+id_unidade,'pop_up','width=415, height=360,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=no,resizable=no,top=250,left=300');
}


function reimprime_requisicao_almoxarifado(cd_pedido,tipo)
{
	window.open("imprimir_requisicao.php?CD_PEDIDO="+cd_pedido+"&modulo="+tipo,"myWin","width=745, height=620,toolbar=no,copyhistory=no, location=no, status=no,menubar=yes, scrollbars=yes,resizable=yes,top=1,left=1");
}


function excluindo(var_exclusao)
{
	document.formulario.action = "autorizador_compra.php?acao=exclui&"+var_exclusao;
	document.formulario.submit();

}

function enviaFormCampo(campo,e)
{
	if (ie)
	{
		if (e.keyCode == 13) //Se a tecla ÔøΩ enter
		{
			if (campo.value.length > 0) //Se foi digitado alguma coisa
				document.formulario.submit();
		}
	}
	else
	{
		if (e.which == 13)
		{
			if (campo.value.length >0)
				document.formulario.submit();
		}
	}
}

//function EnviaBuscaTeclado(e)
//{
//	if (e.keyCode == 13)
//	{
//		EnviaBusca(); //(MUITAS TELAS N√ÉO ENCONTRAM ESSA FUN√á√ÉO - MARCEL 05/04/2011 - PARECE SER UMA FUN√á√ÉO GLOBAL
//		QUE CHAMA UMA FUN√á√ÇO LOCAL, ESTRAGANDO O PROCEDIMENTO NOS LOCAIS ONDE √â USADA SEM A FUN√á√ÉO LOCAL.
//	}
//}

function fechar_pop_up_autorizador(usuario,cargo,fone,celular,cod_usuario,unidade,setor)
{

	opener.document.formulario.contato.value = usuario;
	opener.document.formulario.unidade.value = unidade;
	opener.document.formulario.setor.value = setor;

	opener.document.formulario.cargo.value = cargo;
	opener.document.formulario.fone.value = fone;
	opener.document.formulario.celular.value = celular;
	opener.document.formulario.CD_USUARIO_SISTEMA.value = cod_usuario;
	window.close();
}

function fechar_pop_up_produto(desc)
{
	opener.document.formulario.DESCRICAO.value = desc;
	window.close();
}

function EnviaFormProduto()
{
	var d;
	d = document.formulario
		if (d.CODIGO.value == "" && d.DESCRICAO.value == "")
		{
			alert('VocÍ tem que preencher no minimo um campo.');
		}
		else
		{
			d.submit();
		}
}

function EnviarFormRelatorioConsumo()
{
	var d;
	d = document.formulario;
	if (d.DATA_INICIAL.value == "" || d.DATA_FINAL.value == ""){
		alert ('Os campos de periodo s„o obrigatorios');
	}else{
		document.formulario.submit();
	}
}

function EnviarFormOrdenadoRelatorioConsumo(e)
{
	document.formulario.ORDEM.value = e;
	document.formulario.submit();
}

function EnviarFormRelatorioEntrada()
{
	var d;
	d = document.formulario;
	if (d.DATA_INICIAL.value == "" || d.DATA_FINAL.value == ""){
		alert ('Os campos de periodo s„o obrigatorios');
	}else{
		document.formulario.submit();
	}
}

function EnviarFormRelatorioEntradaOrdenado(e)
{
	document.formulario.ORDEM.value = e;
	document.formulario.submit();
}

function EnviarFormPedidoFornecedor(modulo)
{
	document.formulario.target='_self';
	document.formulario.action = "listagem_produtos.php?modulo="+modulo;
	document.formulario.submit();
}
function imprimirListagemProdutos()
{
	win=window.open('../pdf/relatorio_retrato.php','myWin','width=800, height=600,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=yes,resizable=yes,top=1,left=1');
	document.formulario.target='myWin';
	document.formulario.action='../pdf/relatorio_retrato.php?diretiva=alt&';
	document.formulario.submit()
}

//hora jornada de trabalho

function mascara_inteiro(evento)
{
//	EnviaBuscaTeclado(evento);
	if(ie)
	{
		var tecla = evento.keyCode;
	}
	else
	{
		var tecla = evento.which;
	}

	if (tecla != 8 && tecla != 0)  // backspace
	{
		return ((tecla > 47) && (tecla < 58));
	}
}
function valida_tamanho_campo_hora(hora,campo_formulario) //coloca mascara para hora
{
	var myhora = '';

	myhora = myhora + hora;

	if (myhora.length != 5 && myhora.length > 0)
    {
        alert('O Campo Hora precisa ser preenchido corretamente!');
		campo_formulario.focus();
        return false;
	}
	return true;
}


function valida_hora(hora,campo_formulario) //coloca mascara para hora
{
	var myhora = '';

	myhora = myhora + hora;

	if (myhora.length == 2){
		myhora = myhora + ':';
		campo_formulario.value = myhora;
	}
	
	if (myhora.length == 5){
		verifica_hora(campo_formulario);
	}
}


function verifica_hora(campo_formulario)
{
        hrs = (campo_formulario.value.substring(0,2));
	min = (campo_formulario.value.substring(3,5));

	situacao = "";

	// verifica data e hora
	if ((hrs < 00 ) || (hrs > 23) || ( min < 00) ||( min > 59)){
		situacao = "falsa";
	}

	if (campo_formulario.value == "") {
		situacao = "falsa";
	}
	

	if (situacao == "falsa") {
		alert(unescape("Hora inv%E1lida!"));
		campo_formulario.value = "";
		campo_formulario.focus();
	}
}

function compoe_hora(hora,campo_formulario) //coloca mascara para hora
{
	var myhora = '';

	myhora = myhora + hora;

	if (myhora.length == 2){
		myhora = myhora + ':';
		campo_formulario.value = myhora;
	}

//	campo_formulario.value = campo_formulario.value.replace('::',':'); //RETIRA DUPLICA√á√ÉO DE :: CASO EXISTA	

}

function valida_hora2(campo_formulario, bolValidacao)
{
    hrs = (campo_formulario.value.substring(0,2));
	min = (campo_formulario.value.substring(3,5));
	sep = (campo_formulario.value.substring(2,3));

	situacao = "";
	
	if (bolValidacao == false) { //SE N√ÉO FOR VALIDA√á√ÉO DO FORM N√ÉO D√Å ERRO POR OBJETO EM BRANCO (N√ÉO OBRIGAT√ìRIO)
		if (campo_formulario.value == "") 
		{
			return true;	
		}
	}
	else
	{
		if (campo_formulario.value == "") 
		{
			situacao = "falsa";
		}
	}


	// verifica data e hora
	
	if (hrs === "" ) {
		situacao = "falsa";
	}
	
	if ( sep == ":" && min === "" && situacao == "" )
	{
		min = "00";
		campo_formulario.value = hrs + sep + min;
	}
	
	if ( sep == ":" && min === "0" && situacao == "" )
	{
		min = "00";
		campo_formulario.value = hrs + sep + min;
	}
	
	if ( sep === "" && min === "" && situacao == "" )
	{
		sep = ":";
		min = "00";
		campo_formulario.value = hrs + sep + min;		
	}

	if ((hrs < 00 ) || (hrs > 23) || ( min < 00 ) ||( min > 59)){
		situacao = "falsa";
	}
	
	if ( hrs.length != 2  || min.length != 2 )
	{
		situacao = "falsa";	
	}

	if (sep != ":") {
		situacao = "falsa";
	}

	if (situacao == "falsa") 
	{
		alert("Formato de Hora inv·lido! ");
		campo_formulario.value = "";
		campo_formulario.focus();
		return false;
	}
	else {
		return true;
	}
}

//funcoes para saida de consumo de almoxarifado
function verificaValorProduto()
{

	if (document.formulario.QTDE_DEC.value > 0)
	{
		var qtde = document.formulario.QTDE_DEC.value
			var CD_PRODUTO = document.formulario.CD_PRODUTO.value
			endereco = '../include/http_almoxarifado_movimentacao_produto.php?id_produto='+CD_PRODUTO+'&valor='+qtde+'&cc='+document.formulario.CD_CENTRO_CUSTO_OPERADOR.value;
		loadXMLDoc(endereco);
	}
}

function excluindo_item_saida_almoxarifado(modulo,id_sub,CD_ALM_MOVIMENTO)
{
	document.formulario.action = "saida.php?modulo="+modulo+"&acao=excluir&id_sub="+id_sub+"&CD_ALM_MOVIMENTO="+CD_ALM_MOVIMENTO;
	document.formulario.submit();
}


function finaliza_saida_almoxarifado(modulo,CD_ALM_MOVIMENTO,acao)
{
	document.formulario.action = "saida.php?modulo="+modulo+"&acao="+acao+"&CD_ALM_MOVIMENTO="+CD_ALM_MOVIMENTO;
	//alert(document.formulario.action = "saida.php?modulo="+modulo+"&acao="+acao+"&CD_ALM_MOVIMENTO="+CD_ALM_MOVIMENTO);
	document.formulario.submit();
}


//especialidade/reagendamento_medico.php - flavio
function FuncaoDasCombos(combo, id, tipo_consulta, usuario)
{	
	tipo_da_consulta = tipo_consulta;
	usuario_sus = usuario;
	var valor = combo.value;
	if (valor == 0)
	{
		tipo = "reagenda";
	}
	else if(valor == -1)
		valor = 0;

	url = '../include/HTTP_cancelamento_medico.php?id_agenda='+id+'&id_status='+valor;

	loadXMLDoc(url);
}

//visibilidadeDiv(document.getElementById('NOME_DA_DIV'));
function visibilidadeDiv(div)
{
    if (document.getElementById(div).style.visibility == "hidden" || document.getElementById(div).style.visibility == "")
		document.getElementById(div).style.visibility = "visible";
	else
		document.getElementById(div).style.visibility = "hidden";
}

//especialidade/reagendamento_medico.php - flavio
function AbrePopUp(id,modulo)
{
	var d = document.formulario;

	window.open('calendario_especialidade.php?modulo='+modulo+'&id_medico='+d.id_medico.value+'&id_especialidade='+d.id_especialidade.value+'&id_unidade='+d.id_unidade.value+'&id_tipo_consulta='+tipo_da_consulta+'&usuario_sus='+usuario_sus+'&id_agenda='+id+'&id_status=5&numero_de_consultas_pedidas=x&link=link_consulta_sem_popup_&flag_de_reagendamento=true&modulo=null','pop_up','width=620, height=260,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=yes,resizable=no,top=1,left=1');
}


//especialidade/cadastro.php - flavio
function LimpaCombo() 
{
	Combo = http.responseText.split("##");

	var select = document.getElementById(Combo[0]);

	while (select.length > 0) {
		select.remove(0);
	}
}

function ColocaItemCombo()
{
	Combo = http.responseText.split("##");

	ItemsDaCombo = Combo[1].split("??");

	for (var i = 0; i < ItemsDaCombo.length; i++)
	{
        //don·: SM01649: pq cargas d'·gua retirar os ˙ltimos 5 caracteres?
        //japa: este problema estava ocorrendo pois no arquivo cadastro_plantonista.php n„o estava chamando o jquery.js, espero ter ajudado.
        //isso detona uma combo no PA/CADASTRO DE PLANTONISTAS
        //retirado para evitar problemas     
        
        
//		if (i == (ItemsDaCombo.length-1))//Arrumar o ultimo item no IE...
//		{
//			Valor_Id = ItemsDaCombo[i].split("!!");
//			var Opt = new Option (Valor_Id[1].substr(0,Valor_Id[1].length -5), Valor_Id[0]);
//		}
//		else
//		{
//			Valor_Id = ItemsDaCombo[i].split("!!");
//			var Opt = new Option (Valor_Id[1], Valor_Id[0]);
//		}

        var val;
        
        Valor_Id = ItemsDaCombo[i].split("!!");
        
        try
        {
            val = jQuery.trim(Valor_Id[1]);
        }
        catch(e) { 
            val = Valor_Id[1]; 
        }
        
		var Opt = new Option (val, Valor_Id[0]);

		document.getElementById(Combo[0]).options[i] = Opt;
        //don· SM01648
        //document.getElementById(Combo[0]).options[i].title = Opt.text;
	}
	document.getElementById(Combo[0]).disabled = false;
}

function IndexCombo(Combo)
{
	alert ('a');
	for (var i=0; i <=Combo.length -1;i++)
	{
		Combo[i].selectedIndex = 0;
	}
}

function HTTP_CombosEspecialidade(endereco, ComboQueVaiSerAtualizada, ComboNecessaria, ComboNecessaria2, IdTipo)
{//Eu preciso de todas essas combos para passar o valor que vai ser usado no SQL.


	if (ComboQueVaiSerAtualizada && !ComboNecessaria)
	{
		endereco += ComboQueVaiSerAtualizada.value;
	}
	else if(ComboQueVaiSerAtualizada && ComboNecessaria && !ComboNecessaria2)
	{
		endereco += ComboQueVaiSerAtualizada.value + '&id2='+ComboNecessaria.value;
	}
	else if(ComboQueVaiSerAtualizada && ComboNecessaria && ComboNecessaria2)
	{
		endereco += ComboQueVaiSerAtualizada.value + '&id2='+ComboNecessaria.value+'&id3='+ComboNecessaria2.value + '&id4='+IdTipo.value;
	}				
	else
	{
		endereco += ComboQueVaiSerAtualizada.value;
	}
	loadXMLDoc(endereco);
}


//especialidade alteracao de jornada, cota, cancela dia...
function valida_data_vigente()
{
	d = document.formulario;
	if(d.DT_VIGENTE.value != "")
	{
		//validar data
		erro=0;
		hoje = new Date();
		anoAtual = hoje.getFullYear();
		barras = d.DT_VIGENTE.value.split("/");
		if (barras.length == 3)
		{
			dia = barras[0];
			mes = barras[1];
			ano = barras[2];
			resultado = (!isNaN(dia) && (dia > 0) && (dia < 32)) && (!isNaN(mes)&& (mes > 0) && (mes < 13)) && (!isNaN(ano) && (ano.length == 4) && (ano >= 1900));
			if (!resultado)
			{
				alert("Formato de data invalido!");
				d.DT_VIGENTE.focus();
				return false;
			}
		}
		else
		{
			alert("Formato de data invalido!");
			d.DT_VIGENTE.focus();
			return false;
		}

		//VERIFICA SE A DATA DIGITA ÔøΩ MENOR Q A DATA ATUAL
		var vigente = document.formulario.DT_VIGENTE.value;
		var dt_atual = document.formulario.data_atual.value;
		str1 = vigente.substring(0,2);
		str2 = vigente.substring(3,5);
		str3 = vigente.substring(6,11);
		dt_vigente = str3 + str2 + str1;
		num_dt_vigente = parseInt(dt_vigente);
		num_dt_atual = parseInt(dt_atual);
		if(num_dt_vigente > num_dt_atual)
		{
			return true;
		}
		else
		{
			alert('O campo DATA VIGENTE precisa ser maior que a data de hoje');
			d.DT_VIGENTE.focus();
			return false;
		}

	}
	else
	{
		alert("O campo DATA VIGENTE deve ser preenchido!");
		d.DT_VIGENTE.focus();
		return false;
	}
}

function atualiza_tela_altera_cota()
{
	if (valida_data_vigente())
	{
		document.formulario.submit();
	}
}

function valida_qde_consulta_retorno(flag)
{
    var d = document.formulario;

    var tot_consulta = parseInt(d.calcula_total_consulta.value) +  parseInt(d.QTDE_CONSULTA.value);

	if ( parseInt(tot_consulta) > parseInt(d.QTDE_CONSULTA_TOTAL.value)){
		alert("O n˙mero de CONSULTAS ultrapassou a quantidade permitida");
		d.QTDE_CONSULTA.focus();
		return false;
	}

	var tot_retorno = parseInt(d.calcula_total_retorno.value) +  parseInt(d.QTDE_RETORNO.value);
	if ( parseInt(tot_retorno) > parseInt(d.QTDE_RETORNO_TOTAL.value)){
		alert("O n˙mero de RETORNOS ultrapassou a quantidade permitida");
		d.QTDE_RETORNO.focus();
		return false;
	}

    if(flag == 'salva')
    {
        if ( parseInt(d.QTDE_CONSULTA_TOTAL.value)!= parseInt(d.calcula_total_consulta.value) )
        {
    		alert("O n˙mero de CONSULTAS difere da quantidade permitida");
    		d.QTDE_CONSULTA.focus();
    		return false;
    	}

    	if ( parseInt(d.QTDE_RETORNO_TOTAL.value) != parseInt(d.calcula_total_retorno.value) )
        {
    		alert("O n˙mero de RETORNOS difere da quantidade permitida");
    		d.QTDE_RETORNO.focus();
    		return false;
    	}
    }

	return true;

}


function inclui_altera_cota()
{
    if(valida_data_vigente())
    {
    	if(valida_qde_consulta_retorno('inclui'))
    	{
        	action_antigo = document.formulario.action;
        	document.formulario.action += "&acao=inclui1";
        	if(!enviaForm(document.formulario))
        	{
        		document.formulario.action = action_antigo;
        	}
    	}
    }

}


function salva_altera_cota()
{
    if(valida_qde_consulta_retorno('salva'))
    {
        document.formulario.action += "&acao=salva_fecha";
        document.formulario.submit();
    }

}

function cancela_altera_cota()
{
	if(document.formulario.de_onde_veio.value == "ejm")
	{
		//alert("√â necess·rio que as cotas sejam distribuÌdas");
		alert("… necess·rio que as cotas sejam distribuÌdas");
	}
	else
	{
		d = document.formulario;
		if(d.DT_VIGENTE.value != "")
		{
			if(confirm("Essa aÁ„o ir· excluir todas as cotas desse dia! Deseja realmente Cancelar? "))
			{
				document.formulario.action += "&acao=cancela";
				document.formulario.submit();
				return false;
			}
			else
			{
				return false;
			}
		}
		window.close();
	}
}

//popup cancela_dia
function atualiza_tela_cancela_dia()
{
	if (valida_data_vigente())
	{
		document.formulario.data_visualiza.value = document.formulario.DT_VIGENTE.value;
	}
}

function executa_sim_cancela_dia()
{
	if (valida_data_vigente())
	{
		document.formulario.action += "&acao=cancela_medico";
		document.formulario.submit();
	}
}
function executa_nao_cancela_dia()
{
	window.close();
}



//popup altera_jornada_trabalho
function valida_periodo_trabalho(hHora,hora_saida)
{
    if(hHora==hora_saida)
    {
     alert("Os hor·rios devem ser diferentes");
     return false;
    }

    var hora_entrada=hHora.split(":");
    var hora_saida=hora_saida.split(":");
    if(hora_entrada[0]>hora_saida[0])
    {
        //alert("O hor·rio de saÌda deve ser\nmaior que a de entrada! \nhora");
		alert("O hor·rio de saÌda deve ser\nmaior que a de entrada! \nhora");
        return false;
    }
    if(hora_entrada[0]==hora_saida[0])
    {
        if(hora_entrada[1]>hora_saida[1])
        {
            //alert("O hor·rio de saÌda deve ser\nmaior que a de entrada!\nminuto");
			alert("O hor·rio de saÌda deve ser\nmaior que a de entrada!\nminuto");
            return false;
        }
    }
    return true;
}


function inclui_altera_jornada()
{
    if(valida_data_vigente())
    {
        var inicio = document.formulario.INICIO.value;
        var fim = document.formulario.FIM.value;
        if(valida_periodo_trabalho(inicio, fim))
        {
            action_antigo = document.formulario.action;
            document.formulario.action += "&acao=inclui";
            if(!enviaForm(document.formulario))
            {
                document.formulario.action = action_antigo;
            }
        }
    }
}


function inclui_jornada_iframe_medico()
{
    var inicio = document.form_iframe_medico.INICIO.value;
    var fim = document.form_iframe_medico.FIM.value;
    if(valida_periodo_trabalho(inicio, fim))
    {
        action_antigo = document.form_iframe_medico.action;
        document.form_iframe_medico.action += "&acao=inclui";
        if(!enviaForm(document.form_iframe_medico))
        {
            document.form_iframe_medico.action = action_antigo;
        }
    }
}

//especialidade listagem agendadas-michele
function imprime_listagem_agendadas(endereco,data,unidade,especialidade,medico)
{
	var data = data.value;
	var unidade = unidade.value;
	if(document.formulario.MEDICO.value != '')
	{
    	var medico = '&medico=' + document.formulario.MEDICO.value;
    }
	var especialidade = especialidade.value;
	var endereco = endereco+'?data='+ data + '&unidade=' + unidade + medico + '&especialidade=' + especialidade;

	var win=window.open(endereco,'','width=685, height=550,toolbar=no,copyhistory=no, location=no, status=no,menubar=yes, scrollbars=yes,resizable=yes,top=1,left=1');
}




//almoxarifado pedido_fornecedor
function excluindo_item_pedido_fornecedor(modulo,id_sub,CD_PEDIDO)
{

	document.formulario.action = "pedido_fornecedor.php?modulo="+modulo+"&acao=excluir&id_sub="+id_sub+"&CD_PEDIDO="+CD_PEDIDO;
	document.formulario.submit();
}


function finaliza_pedido_fornecedor(modulo,CD_PEDIDO,acao)
{
	if (document.formulario.CD_ORIGEM.value == "99")
	{
		alert("O campo FORNECEDOR deve ser preenchido!");
		d.CD_ORIGEM.focus();
	}
	else
	{
		document.formulario.action = "pedido_fornecedor.php?modulo="+modulo+"&acao="+acao+"&CD_PEDIDO="+CD_PEDIDO;
		document.formulario.submit();
	}
}



//autorizacao e aprovacao de exames

function HTTP_CombosExamesMunicipio(endereco, ComboQueVaiSerAtualizada)
{
    id_municipio = document.formulario.MUNICIPIO.value;
    endereco += id_municipio;
	loadXMLDoc(endereco);
}


function Aba(aba,flag)
{
	document.cabecalho.action = flag+'?acao=aba&aba='+aba;
	document.cabecalho.submit();

}

function Busca_autor_aprov(e,flag)
{
	if(ie)
	{
		if (e.keyCode == 13)
		{
			EnviaForm_autorizacao(flag);
		}
	}
	else
	{
		if (e.which == 13)
		{
			EnviaForm_autorizacao(flag);
		}
	}

}

function EnviaForm_autorizacao(flag)
{
	var d;
	d = document.cabecalho;

	if (!d.CODIGO.value == "")
	{
		d.action = flag+ '?acao=busca&campo=CODIGO';
		d.PACIENTE.value = "";
		d.submit();
	}
	else if (d.CODIGO.value == "" && !d.PACIENTE.value == "")
	{
		d.action = flag + '?acao=busca&campo=PACIENTE';
		d.CODIGO.value == "";
		d.submit();
	}
}


//iframes autoriza e aprova
function Autoriza()
{
	if (ValidaCotaAutoriza())
	{
		document.formulario.action += "&acao=autoriza";
		document.formulario.VALOR_SOLICITADO.disabled = false;
		document.formulario.submit();
	}
}

function ValidaCotaAutoriza()
{
	var d;
	d = document.formulario;
	if (d.CD_MUNICIPIO.value != d.CD_MUNICIPIO_PRINCIPAL.value)
	{
		if (parseInt(d.VALOR_SOLICITADO.value) > parseInt(d.cota.value))
		{
			var e;
			e = 'Valor solicitado maior que a cota. Deseja continuar assim mesmo?';
			if (confirm(e))
			{
				return true;
			}
			else
			{
				//alert ('Opera√ß√£o cancelada pelo operador');
				alert ('OperaÁ„o cancelada pelo operador');
				return false;
			}
			return false;
		}
	}
	return true;

}

function ExcluirGuia(id)
{
	document.formulario.action += "&acao=excluir&ID_GUIA="+id;
	document.formulario.submit();
}


//iframes nao autoriza e reprova
function NAutorizar()
{

	action_antigo = document.formulario.action;
	document.formulario.action += "&acao=autoriza";
	if(!enviaForm(document.formulario))
	{
		document.formulario.action = action_antigo;
	}
}

//lancamentos ppi
function carrega_movimentos_lancamento_ppi()
{
	document.formulario.action += "&acao=reload";
	document.formulario.submit();
}


// entrega de exames
function entrega_exame_verifica_municipio()
{
	var d;
	d = document.formulario;

	if (d.MUNICIPIO.value == d.PATH_ID_PRINCIPAL.value)
	{
		if (d.NOME.value == "" && d.CD_SEQUENCIAL_GUIA.value == "")
		{
			alert ('Insira nome ou data');
			d.NOME.focus();
			return false;
		}
		document.formulario.action += '&acao=busca';
		return true;

	}
	else
	{
		document.formulario.NOME.value = "";
		document.formulario.CD_SEQUENCIAL_GUIA.value = "";
		document.formulario.action += '&acao=busca';
		return true;
	}
}

function LimparFormulario(formulario)
{
	numeroDeElementos = formulario.elements.length;

	for (x=0;x<numeroDeElementos;x++)
	{
		campo = formulario.elements[x];
		if (campo.type == 'text')
		{
			campo.value = "";
		}
		else if(campo.type == "select-one")
		{
			campo.selectedIndex = 0;
		}
	}
}

//fechar de popups
function fechar_popup_setor(cd_cad_diverso,cd_centro_custo,desc_setor,no_fantasia, nr_ddd_tel_resid, nr_tel_resid)
{
	opener.document.formulario.CD_CENTRO_CUSTO.value = cd_centro_custo;
	opener.document.formulario.DESC_SETOR.value = desc_setor;
	opener.document.formulario.NO_FANTASIA.value = no_fantasia;
	opener.document.formulario.NR_DDD_TEL_RESID_2.value = nr_ddd_tel_resid;
	opener.document.formulario.NR_TEL_RESID_2.value = nr_tel_resid;
	window.close();
}

function fechar_popup_cargo(desc_cargo,cd_cargo,tipo)
{
    if(tipo == 'popup')
    {
    	opener.document.formulario.DESC_CARGO.value = desc_cargo;
    	opener.document.formulario.CD_CARGO.value = cd_cargo;
    	window.close();
	}
	else if (tipo == 'iframe')
	{
    	parent.document.formulario.DESC_CARGO.value = desc_cargo;
        parent.document.formulario.CD_CARGO.value = cd_cargo;
        parent.document.getElementById('iframe_busca').style.visibility='hidden';

	}

}

function fechar_popup_status(endereco,DESC_SITUACAO,DT_ALT_SITUACAO)
{
	opener.document.formulario.DESC_SITUACAO.value = DESC_SITUACAO;
	opener.document.formulario.DT_ALT_SITUACAO.value = DT_ALT_SITUACAO;
	window.opener.location.href = endereco;
	window.close();

}


//laboratorio

function imprime_etiqueta_laboratorio()
{
	win=window.open('imprimir_etiqueta.php','etiqueta','width=475, height=295,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=yes,resizable=no,top=1,left=1');
	document.formulario.target='etiqueta';
	document.formulario.action='imprimir_etiqueta.php';
	document.formulario.submit();
}


//exame/cadastro_guia_exame
function incluiExameGuia()
{
	action_antigo = document.formulario.action;
	if (!document.formulario.PA_ID_exame.value == "")
	{
		if(!enviaForm(document.formulario))
		{
			document.formulario.action = action_antigo;
		}
	}
	else
	{
		alert("O campo Exame Solicitado deve ser preenchido!");
		document.formulario.COMPLEXIDADE.focus();
		return false;
	}

}

//exame/cadastro_guia_exame
function cancelaExameGuia()
{
	action_antigo = document.formulario.action;
	document.formulario.action += "&acao=cancela";
	if(!enviaForm(document.formulario))
	{
		document.formulario.action = action_antigo;
	}

}

//exame/cadastro_guia_exame
function exclui_item_guia(id,modulo,aba,CD_SEQUENCIAL_GUIA_DADOS)
{

	document.formulario.action = 'cadastro_guia_exame.php?id='+id+'&diretiva=alt&modulo='+modulo+'&aba='+aba+'&acao=exclui&CD_SEQUENCIAL_GUIA_DADOS='+CD_SEQUENCIAL_GUIA_DADOS;
	document.formulario.submit();
}

function finaliza_guiaExame()
{
    title_antigo = document.formulario.PRESTADORA.title;
    document.formulario.PRESTADORA.title = "O campo PRESTADORA deve ser preenchido!";
    
    action_antigo = document.formulario.action;
	document.formulario.action += "&acao=salvar";
	if(!enviaForm(document.formulario))
	{
		document.formulario.action = action_antigo;
		document.formulario.PRESTADORA.title = title_antigo;
		
	}

}

//emissao de apac

function imprimir_apac(tipo_impressao)
{
    var array_codigo = iframe_emissao_apac.document.getElementById('array_guia').value;
    window.open('imprimir_etiqueta_apac.php?tipo_impressao='+tipo_impressao+'&array_codigo='+array_codigo,'pop_up','width=415, height=360,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=no,resizable=no,top=250,left=300');
}


//gera numero para apac e aih
function inclui_numeracao()
{
	action_antigo = document.formulario.action;
	document.formulario.action += "&acao=incluir";
	if(!enviaForm(document.formulario))
	{
		document.formulario.action = action_antigo;
	}

}

function exclui_numeracao(codigo_numeracao)
{
	var mais_action = "&acao=excluir&CD_NUMERACAO_APAC_AIH="+codigo_numeracao;
	document.formulario.action += mais_action;
	document.formulario.submit();

}

//prontuario eletronico
function imprime_prontuario(endereco,endereco_location,tipo)
{
    win=window.open(endereco,'myWin','width=685, height=550,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=yes,resizable=no,top=1,left=1');
    if(tipo == 1)
    {
        parent.document.formulario.target='myWin';
        parent.window.location.href=endereco_location;
    }
    else if (tipo == 0)
    {
        window.location.href=endereco_location;
    }
    else if (tipo == 2)
    {
        window.close();
    }

}

function abre_fecha_div(div_fecha,div_abre)
{
    visibilidadeDiv(div_fecha);
    visibilidadeDiv(div_abre);

}

//aih
function imprimir_aih(tipo_impressao)
{
    var array_codigo = iframe_emissao_aih.document.getElementById('array_guia').value;
    window.open('imprimir_aih.php?tipo_impressao='+tipo_impressao+'&array_codigo='+array_codigo,'pop_up','width=815, height=760,toolbar=no,copyhistory=no, location=no, status=no,menubar=no, scrollbars=no,resizable=no,top=250,left=300');
}


//produto
function estoque_min_max()
{
    var qt_min = parseInt(document.formulario.QTDE_ESTOQUE_MIN.value);
    var qt_max = parseInt(document.formulario.QTDE_ESTOQUE_MAX.value);
    if(qt_min > qt_max)
    {
        alert('A quantidade do ESTOQUE MINIMO deve ser maior que a quantidade do ESTOQUE MAXIMO ');
        document.formulario.QTDE_ESTOQUE_MIN.focus();
    }
    else if(qt_min == qt_max && qt_max != 0 && qt_min != 0 )
    {
        alert('As quantidade do ESTOQUE MINIMO e ESTOQUE MAXIMO n√£o podem ser iguais');
        document.formulario.QTDE_ESTOQUE_MIN.focus();
    }
    else
    {
        enviaForm(document.formulario);
    }
}
function AbrirJanela(nomeJanela, configuracao) {
    etiqueta = 'imprimir_etiqueta_prontuario.php?vl_inicial=' + document.formulario.vl_inicial.value + '&vl_final=' + document.formulario.vl_final.value + '&unidade=' + document.formulario.UNIDADE.value + '&ordenar=' + document.formulario.ordenar.value;
    open(etiqueta, nomeJanela, configuracao);
}

function HTTP_CombosEspecialidadePlantonista(endereco, ComboQueVaiSerAtualizada)
{
    id_medico = document.formulario.CD_USUARIO_SISTEMA_hidden.value;
    endereco += id_medico;
	loadXMLDoc(endereco);
}


function exclui_item_prontuario(formulario,item_excluir)
{
    var endereco_antigo = formulario.action;
	var endereco_novo = endereco_antigo +'&acao=excluir'+ item_excluir ;
	formulario.action = endereco_novo;
	formulario.submit();
	formulario.action = endereco_antigo;

}

function salva_imprime_prontuario(endereco_impressao,endereco_location,tipo_imprimir)
{
    if(enviaForm(document.formulario))
    {
    	imprime_prontuario(endereco_impressao,endereco_location,tipo_imprimir);
    }

}


function cancela_atendimento(formulario,CD_PRONTUARIO_ELETRONICO)
{
    var endereco_antigo = formulario.action;
	var endereco_novo = endereco_antigo +'&acao=cancelar&prontuario_cancelar='+ CD_PRONTUARIO_ELETRONICO ;
	formulario.action = endereco_novo;
	formulario.submit();
	formulario.action = endereco_antigo;

}

function exclui_plantonista(CD_PRONTUARIO_PLANTONISTA)
{
    
    var endereco_antigo = document.formulario_iframe_plantonista.action;
	var endereco_novo = endereco_antigo +'&acao=excluir&plantonista_excluir='+ CD_PRONTUARIO_PLANTONISTA ;
        document.formulario_iframe_plantonista.action = endereco_novo;
	document.formulario_iframe_plantonista.submit();
	document.formulario_iframe_plantonista.action = endereco_antigo;

}

function rh_checa_checkbox_falta()
{
    if(document.formulario.checkbox_falta.checked == true)
    {
        document.getElementById('motivo').style.visibility='visible';
        //document.formulario.CD_MOTIVO_FALTA.title = 'O Campo MOTIVO DA FALTA nÔøΩo pode ser nulo!';
		document.formulario.CD_MOTIVO_FALTA.title = 'O Campo MOTIVO DA FALTA n„o pode ser nulo!';

    }
    else
    {
        document.getElementById('motivo').style.visibility='hidden';
        document.formulario.CD_MOTIVO_FALTA.value = '-666';
        document.formulario.CD_MOTIVO_FALTA.title = '';

    }
}

function rh_gera_livro_ponto_confirma(endereco)
{
    var action_antigo = parent.document.formulario.action;
    parent.document.formulario.action = endereco;
    enviaForm(parent.document.formulario);
    parent.document.formulario.action = action_antigo;
     parent.document.getElementById('iframe_mensagem').style.visibility='hidden';
     parent.document.formulario.CD_CAD_DIVERSO.focus();


}

function rh_gera_livro_ponto(endereco,acao)
{
    var dia_trabalhado = document.formulario.DT_DIA_TRABALHADO.value;
    var unidade_hidden = document.formulario.CD_CAD_DIVERSO_hidden.value;
    var unidade = document.formulario.CD_CAD_DIVERSO.value;
    var setor = document.formulario.CD_SETOR.value;
    var funcao = document.formulario.CD_FUNCAO.value;
    if(unidade == '')
    {
        document.formulario.CD_CAD_DIVERSO_hidden.value = '';
    }
    if(dia_trabalhado != '')
    {
        if((unidade_hidden == '' || unidade == '') && setor == '-666' && funcao == '-666')
        {
            alert('Selecione algum criterio!');
            return false;
        }
        var action_antigo = document.formulario.action;
        document.formulario.action = endereco+acao;
        enviaForm(document.formulario);
        document.formulario.action = action_antigo;
        return false;
     }
     else
     {
         //alert('O Campo DATA n√£o pode ser nulo');
		 alert('O Campo DATA n„o pode ser nulo');
         return false;
     }
}

function horas_entrada_saida()
{
    if((document.formulario.HR_ENTRADA_PERIODO1.value != '' && document.formulario.HR_SAIDA_PERIODO1.value != '' ) || (document.formulario.HR_ENTRADA_PERIODO1.value == '' && document.formulario.HR_SAIDA_PERIODO1.value == ''))
    {
        if(document.formulario.HR_ENTRADA_PERIODO1.value >= document.formulario.HR_SAIDA_PERIODO1.value && (document.formulario.HR_ENTRADA_PERIODO1.value != '' && document.formulario.HR_SAIDA_PERIODO1.value != ''))
        {
            document.formulario.periodo1.value = '';
            //document.formulario.periodo1.title ='A SaÌda do Primeiro PerÌodo precisa ser maior que a Entrada do Primeiro PerÌodo';
			document.formulario.periodo1.title ='A SaÌda do Primeiro PerÌodo precisa ser maior que a Entrada do Primeiro PerÌodo';
            return false;
        }
        else
        {
            document.formulario.periodo1.value = 'pode';
            document.formulario.periodo1.title ='';
        }
    }
    else
    {
        document.formulario.periodo1.value = '';
        //document.formulario.periodo1.title ='O Primeiro PerÌodo precisa estar completo';
		document.formulario.periodo1.title ='O Primeiro PerÌodo precisa estar completo';
        return false;
    }

    if((document.formulario.HR_ENTRADA_PERIODO2.value != '' && document.formulario.HR_SAIDA_PERIODO2.value != '' ) || (document.formulario.HR_ENTRADA_PERIODO2.value == '' && document.formulario.HR_SAIDA_PERIODO2.value == ''))
    {
        if(document.formulario.HR_ENTRADA_PERIODO2.value >= document.formulario.HR_SAIDA_PERIODO2.value && (document.formulario.HR_ENTRADA_PERIODO2.value != '' && document.formulario.HR_SAIDA_PERIODO2.value != ''))
        {
            document.formulario.periodo2.value = '';
            //document.formulario.periodo2.title ='A SaÌda do Segundo PerÌodo precisa ser maior que a Entrada do Segundo PerÌodo';
			document.formulario.periodo2.title ='A SaÌda do Segundo PerÌodo precisa ser maior que a Entrada do Segundo PerÌodo';
            return false;
        }
        else
        {
            document.formulario.periodo2.value = 'pode';
            document.formulario.periodo2.title ='';
        }
    }
    else
    {
        document.formulario.periodo2.value = '';
        document.formulario.periodo2.title ='O Segundo PerÌodo precisa estar completo';
        return false;
    }

    if((document.formulario.HR_SAIDA_PERIODO1.value != '' && document.formulario.HR_ENTRADA_PERIODO2.value != '') && (document.formulario.HR_SAIDA_PERIODO1.value > document.formulario.HR_ENTRADA_PERIODO2.value) )
    {
        document.formulario.periodo2.value = '';
        document.formulario.periodo2.title ='A Entrada do Segundo PerÌodo precisa ser maior que a SaÌda do Primeiro PerÌodo!';
        return false;
    }

    if(document.formulario.periodo1.value == '' && document.formulario.periodo2.value == '' && document.formulario.NR_DIA_SEMANA.value != '-666')
    {
        return true;
    }
    else
    {
        document.formulario.NR_DIA_SEMANA.title = 'O DIA DA SEMANA precisa ser selecionado';
        return false;
    }

}


function imprimir_com_post(endereco_impressao,novo_action,target)
{
	win=window.open(endereco_impressao,'myWin','width=800, height=600,toolbar=no,copyhistory=no, location=no, status=no,menubar=yes, scrollbars=yes,resizable=yes,top=1,left=1');
	document.formulario.target ='myWin';
	action_antigo = document.formulario.action;
	document.formulario.action = novo_action;
	document.formulario.submit();
	document.formulario.action = action_antigo;
	document.formulario.target = target;

}

function Mouse(codigo)
{
    if(codigo>1)
    {
        //alert ("ImpossÌvel pressionar o Bot√£o Direito do mouse.");
		alert ("ImpossÌvel pressionar o Bot„o Direito do mouse.");
    }
}


function rh_horas_entrada_saida_lancamento(entrada1,saida1,entrada2,saida2,periodo1,periodo2)
{
    if((entrada1.value != '' && saida1.value != '' ) || (entrada1.value == '' && saida1.value == ''))
    {
        if(entrada1.value >= saida1.value && (entrada1.value != '' && saida1.value != ''))
        {
            //alert ('A SaÌda do Primeiro PerÌodo precisa ser maior que a Entrada do Primeiro PerÌodo');
			alert ('A SaÌda do Primeiro PerÌodo precisa ser maior que a Entrada do Primeiro PerÌodo');
            return false;
        }
        else
        {
            periodo1.value = 'pode';
        }
    }
    else
    {
        alert('O Primeiro PerÌodo precisa estar completo');
        return false;
    }

    if((entrada2.value != '' && saida2.value != '' ) || (entrada2.value == '' && saida2.value == ''))
    {
        if(entrada2.value >= saida2.value && (entrada2.value != '' && saida2.value != ''))
        {
            //alert('A SaÌda do Segundo PerÌodo precisa ser maior que a Entrada do Segundo PerÌodo');
			alert('A SaÌda do Segundo PerÌodo precisa ser maior que a Entrada do Segundo PerÌodo');
            return false;
        }
        else
        {
            periodo2.value = 'pode';

        }
    }
    else
    {
        //alert('O Segundo PerÌodo precisa estar completo');
		alert('O Segundo PerÌodo precisa estar completo');
        return false;
    }

    if((saida1.value != '' && entrada2.value != '') && (saida1.value > entrada2.value) )
    {
        //alert('A Entrada do Segundo PerÌodo precisa ser maior que a SaÌda do Primeiro PerÌodo!');
		alert('A Entrada do Segundo PerÌodo precisa ser maior que a SaÌda do Primeiro PerÌodoo!');
        return false;

    }
    return true;


}

function rh_horas_entrada_saida_fechamento(entrada1,saida1,entrada2,saida2,periodo1,periodo2,contr_entrada1,contr_saida1,contr_entrada2,contr_saida2,contr_periodo1,contr_periodo2)
{
    //entrada e saida trabalhada primeiro periodo
    if((entrada1.value != '' && saida1.value != '' ) || (entrada1.value == '' && saida1.value == ''))
    {
        if(entrada1.value >= saida1.value && (entrada1.value != '' && saida1.value != ''))
        {
            //alert ('A SaÌda do Primeiro PerÌodo Trabalhado precisa ser maior que a Entrada do Primeiro PerÌodo Trabalhado');
			alert ('A SaÌda do Primeiro PerÌodo Trabalhado precisa ser maior que a Entrada do Primeiro PerÌodo Trabalhado');
            return false;
        }
        else
        {
            periodo1.value = 'pode';
        }
    }
    else
    {
        //alert('O Primeiro PerÌodo Trabalhado precisa estar completo');
		alert('O Primeiro PerÌodo Trabalhado precisa estar completo');
        return false;
    }

    //entrada e saida trabalhada segundo periodo
    if((entrada2.value != '' && saida2.value != '' ) || (entrada2.value == '' && saida2.value == ''))
    {
        if(entrada2.value >= saida2.value && (entrada2.value != '' && saida2.value != ''))
        {
            //alert('A SaÌda do Segundo PerÌodo Trabalhado precisa ser maior que a Entrada do Segundo PerÌodo Trabalhado');
			alert('A SaÌda do Segundo PerÌodo Trabalhado precisa ser maior que a Entrada do Segundo PerÌodo Trabalhado');
            return false;
        }
        else
        {
            periodo2.value = 'pode';

        }
    }
    else
    {
        alert('O Segundo PerÌodo Trabalhado precisa estar completo');
        return false;
    }

    if((saida1.value != '' && entrada2.value != '') && (saida1.value > entrada2.value) )
    {
        alert('A Entrada do Segundo PerÌodo Trabalhado precisa ser maior que a SaÌda do Primeiro PerÌodo Trabalhado!');
        return false;

    }
//************************
    //entrada e saida trabalhada primeiro periodo
    if((contr_entrada1.value != '' && contr_saida1.value != '' ) || (contr_entrada1.value == '' && contr_saida1.value == ''))
    {
        if(contr_entrada1.value >= contr_saida1.value && (contr_entrada1.value != '' && contr_saida1.value != ''))
        {
            alert ('A SaÌdado Primeiro PerÌodo Contratado precisa ser maior que a Entrada do Primeiro PerÌodo Contratado ');
            return false;
        }
        else
        {
            contr_periodo1.value = 'pode';
        }
    }
    else
    {
        //alert('O Primeiro PerÌodo Contratado precisa estar completo');
		alert('O Primeiro PerÌodo Contratado precisa estar completo');
        return false;
    }

    //entrada e saida trabalhada segundo periodo
    if((contr_entrada2.value != '' && contr_saida2.value != '' ) || (contr_entrada2.value == '' && contr_saida2.value == ''))
    {
        if(contr_entrada2.value >= contr_saida2.value && (contr_entrada2.value != '' && contr_saida2.value != ''))
        {
            //alert('A SaÌda do Segundo PerÌodo Contratado precisa ser maior que a Entrada do Segundo PerÌodo Contratado');
			alert('A SaÌda do Segundo PerÌodo Contratado precisa ser maior que a Entrada do Segundo PerÌodo Contratado');
            return false;
        }
        else
        {
            contr_periodo2.value = 'pode';

        }
    }
    else
    {
        alert('O Segundo PerÌodo Contratado precisa estar completo');
        return false;
    }

    if((contr_saida1.value != '' && contr_entrada2.value != '') && (contr_saida1.value > contr_entrada2.value) )
    {
        alert('A Entrada do Segundo PerÌodo Contratado precisa ser maior que a SaÌda do Primeiro PerÌodo Contratado!');
        return false;

    }
//************* fim
    
    return true;


}

//reimprime laudo laboratorio
function reimprime_laudo_laboratorio(endereco)
{
    win=window.open(endereco,'myWin','width=685, height=550,toolbar=yes,copyhistory=yes, location=yes, status=yes,menubar=yes, scrollbars=yes,resizable=yes,top=1,left=1');

}






/********* INI - PEGA CAMPOS DE DATA E VALIDADE NO FORMULARIO "ALMOXARIFADO > ENTRADA DE ESTOQUE > PRODUTO" *********/
	// Get the HTTP Object
	function getHTTPObject()
	{
		if (window.ActiveXObject) 
		{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if (window.XMLHttpRequest) 
		{
			return new XMLHttpRequest();
		}
		else 
		{
			alert("Seu browser nao tem suporte para AJAX.");
			return null;
		}
	}
	/*
	function setOutput()
	{
		if(httpObject.readyState == 4)
		{
			resultadoVerificaLoteValidade = httpObject.responseText.split('.');
			//prompt('','resultadoVerificaLoteValidade__5 = ' + resultadoVerificaLoteValidade[1] );
			if( resultadoVerificaLoteValidade[1] == 'sim' )
			{
				document.getElementById( 'nomeCampoDataValidade'  ).style.display = 'block';
				document.getElementById( 'valorCampoDataValidade' ).style.display = 'block';
				document.getElementById( 'nomeCampoNumeroLote'    ).style.display = 'block';
				document.getElementById( 'valorCampoNumeroLote'   ).style.display = 'block';
			}
			else
			{
				document.getElementById( 'nomeCampoDataValidade'  ).style.display = 'none';
				document.getElementById( 'valorCampoDataValidade' ).style.display = 'none';
				document.getElementById( 'nomeCampoNumeroLote'    ).style.display = 'none';
				document.getElementById( 'valorCampoNumeroLote'   ).style.display = 'none';
			}
		}
	}  
	function verificaLoteValidade()
	{
		httpObject = getHTTPObject();
		if (httpObject != null) 
		{
			httpObject.open("GET", "../include/ajaxVerificaLoteValidade.php?produto=" + document.getElementById( 'produto' ).value, true);
			httpObject.onreadystatechange = setOutput;
			httpObject.send(null);
		}
	}*/
	var httpObject = null;
/********* FIM - PEGA CAMPOS DE DATA E VALIDADE NO FORMULARIO "ALMOXARIFADO > ENTRADA DE ESTOQUE > PRODUTO" *********/

/* FunÔøΩao para ordenar NUMERICAMENTE um select de acordo com os valores das suas opÔøΩoes. MÔøΩrcio
Baseado nesse algoritmo: http://en.wikipedia.org/wiki/Bubble_sort */

function bubbleSort(select) {
	if (typeof(select) == "string")
		select = document.getElementById(select);

	var troca = false;
	
	do { // FaÔøΩa ...
		troca = false; // Troca sempre comeÔøΩa como falso

		for (var contador = 0; contador < (select.length - 1); contador++) { // Para cada 'option' do 'select' menos o ÔøΩltimo valor
			if (Number(select.options[contador].text) > Number(select.options[contador + 1].text)) { // Se o valor do ÔøΩndice [contador] for maior que o valor do ÔøΩndice [contador + 1]
				fazerTroca(select, contador); // Efetua a troca dos valores
				troca = true; // Houve a troca de valores
			}
		}
		
	} while (troca); // ... enquanto nao houver troca
}

function fazerTroca(obj, indice) {
	var valor1, valor2;
	var texto1, texto2;

	valor1 = Number(obj.options[indice].value);
	valor2 = Number(obj.options[indice + 1].value);
	
	texto1 = Number(obj.options[indice].text);
	texto2 = Number(obj.options[indice + 1].text);
	
	obj.options[indice].value = valor2;
	obj.options[indice].text  = texto2;

	obj.options[indice + 1].value = valor1;
	obj.options[indice + 1].text  = texto1;
}

/***************************************************/

	function verificaDataMaiorQueHoje( data )
	{
		var hoje = new Date();
	
		mes_tela = data.substring(3,5);
		ano_tela = data.substring(6,10);
		dia_tela = data.substring(0,2);
	
		data_tela = new Date(ano_tela, mes_tela -1, dia_tela);
		if (data_tela < hoje)
		{
			return false;
		}
		return true;
	}

	function verificaDataMenorQueHoje( dataDigitada )
	{
		//alert( dataDigitada );

		var hojeEN = new Date();

		diaDigitado = dataDigitada.substring( 0, 2  );
		mesDigitado = dataDigitada.substring( 3, 5  );
		anoDigitado = dataDigitada.substring( 6, 10 );
		//alert( 'diaDigitado: ' + diaDigitado + ' - mesDigitado: ' + mesDigitado + ' - anoDigitado: ' + anoDigitado );

		dataDigitadaEN = new Date( anoDigitado, mesDigitado -1, diaDigitado );
		if( dataDigitadaEN >= hojeEN )
		{
			return false;
		}
		return true;
	}

/***************************************************/
