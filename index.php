<?php
/*
  |---------------------+---------------------------+---------|
  |   Data de CriaÃ§Ã£o   |         Programador       |   SM    |
  |---------------------+---------------------------+---------|   
  |     06/02/2014      |       Daniel Camalionte   | ------- |
  +---------------------+---------------------------+---------|    
 */
header ('Content-type: text/html; charset=UTF-8');
include '/include/bd_controle.inc';

?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>:: Controle de Tarefas ::</title>
        <script>  redimensiona = "conteudo=47"; </script>
        
      <!--Carregando arquivos JavaScript/jQuery------------------------------------------------------------->
      
        <!--Scripts js para funcções padrões-->
        <script language="JavaScript" type="text/JavaScript" src="js/redimensiona.js"></script>
        <script language="JavaScript" type="text/JavaScript" src="js/funcoes_formulario.js"></script>
       
       <!--Scripts do jquery-ui-->
       <script language="JavaScript" type="text/JavaScript" src="js/jquery-1.10.2.js"></script>  
       <script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
       
       <!--Script do timepicker-->
       <script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
       
       <!--Scripts das funções do programa-->
       <script type="text/javascript" src="js/controle.js"></script>
       <script type="text/javascript" src="js/grafico.js"></script>
       
        <!--Script do gráfico do google-->
       <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization',
       'version':'1','packages':['timeline']}]}"></script>
       
      
     <!--Carregando arquivos CSS---------------------------------------------------------------->
      
        <!--Estilo padrão-->        
       <link rel="stylesheet" type="text/css" href="css/calendario_personalizado.css"/>
       
       <!--Estilo utilizado pelo jquery-ui-->
       <link type="text/css" href="css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" />
       
       <!--Estilo utilizado pelo timepicker-->
       <link type="text/css" href="css/jquery-ui-timepicker-addon.css" rel="stylesheet" />
    </head>
    
    <body bgcolor="#d6d7d6"  style="margin-top: 0px"> 
        <input id="data_atual" type="hidden" value="<?= date('d/m/y'); ?>" />
        
        <div id="demo-description" title="HISTÃRICO DA SM" style="display: none; overflow: auto">
           
        </div>
        <div id="alteracao" title="ALTERAÇÃO" style="display: none; overflow: auto">
            <form name="formulario_alt" id="formulario_alt" method="POST">
                    <fieldset><legend>Fator</legend>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td width="40%">Analista:</td>
                                <td colspan="3">&nbsp;Data:</td> 
                            </tr>
                            <tr>
                                <td width="40%">
                                    

                                    <select id="local_coleta2" alt="O campo Analista deve ser preenchido" name="local_coleta2" style="width:300px; height:20px">
                                        <option value="1">Renê Lopes</option>
                                    </select>
                                    
                                </td>
                                <td colspan="3">&nbsp;&nbsp;
                                    <input type="text" name="data_inicial2"  class="data_picker" id="data_inicial2" alt="Data inicial obrigatÃ³ria!" tabindex="1" readonly="readonly" style="text-align:center; width: 75px;" maxlength="10">
                                    </td>  

                            </tr>
                        </table>           
                        <br>
                         
                        <div id="calendario_formulaio">
                        
                            <table width=100% border=0 cellspacing=0 cellpadding=0>
                                <tr>
                                    <td width="15%">Tipo:</td>
                                    <td colspan="3">SM / Tarefa Interna:</td>
                                </tr>
                                <tr height="22">
                                    <td>
                                        <select id="tipoSM2" alt="O campo Tipo deve ser preenchido" name="tipoSM2" style="width:125px; height:20px">
                                            <option value="1">MANUTENÇÃO</option>
                                            <option value="2">MELHORIA</option>
                                            <option value="3">DESENVOLVIMENTO</option>
                                            <option value="4">FEEDBACK</option>
                                            <option value="5">CONTAGEM</option>
                                            <option value="6">TAREFA INTERNA</option>&nbsp;&nbsp;
                                    </select>
                                 </td>
                                 <td colspan="3">
                                        <input name="SM2" id="SM2" title="O Campo SM precisa ser preenchido!" size="10" maxlength="7">
                                    </td>
                                </tr>
                                <tr valign="bottom">                                                                       
                                    <td width="15%">Início:</td>
                                    <td width="15%">Fim:</td>
                                    <td width="40%"></td>
                                </tr>                                
                                <tr valign="top" height="22">                                                           
                                   
                                    <td>
                                        <input name="hrinicio2" id="hrinicio2" alt="InÃ­cio" class="horario" title="O Campo Hora Inicial precisa ser preenchido!" size="10" maxlength="10" readonly="readonly">
                                    </td>
                                    <td>
                                        <input name="hrfinal2" id="hrfinal2" alt="Fim" class="horario" size="10" maxlength="10" readonly="readonly">
                                    </td>
                                    <td>
                                        <input name="ID_CONTROLE" id="ID_CONTROLE" type="hidden"/>
                                        <input type="button" name="salvar" id="salvar" style="width:80px" value="Salvar" class="botao2" onClick="enviaFormAlteracao()">&nbsp;&nbsp;
                                        <input type="reset" id="limpar" name="limpar" style="width:80px" value="Limpar" class="botao2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                </tr>
                            </table>  
                           
                        </div>
                    </fieldset>
                </form>
            </div>
    <center>
        <form name="formulario" id="formulario" method="POST">
            <table  cellpadding="0" cellspacing="0" width="780" height="350" bgcolor="#FFFFFF" border="0"><tr>
                    <td class="barra_direita" width="308">&nbsp;&nbsp;CONTROLE DE TAREFAS DIÁRIAS<div id="response_busca" class="carregando"><img src="images/carregando_barra.gif"></div></td>
                    <td height="24" width="138" >&nbsp;</td></tr>
                <td colspan="6"  class="principal_fundo" id="conteudo" >
                    <fieldset><legend>Fator</legend>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td width="40%">Analista:</td>
                                <td colspan="3">&nbsp;Data:</td> 
                            </tr>
                            <tr>
                                <td width="40%">
                                    

                                    <select id="local_coleta" alt="O campo Analista deve ser preenchido" name="local_coleta" style="width:300px; height:20px;">
                                        <option value="1" selected="selected">Renê Lopes</option>
                                    </select>
                                    
                                </td>
                                <td colspan="3">
                                    <input type="text" class="data_picker" name="data_inicial" id="data_inicial" title="Data inicial obrigatÃ³ria!" tabindex="1" readonly="readonly" style="text-align:center; width: 65px;" maxlength="10" value="<?= date("d/m/Y"); ?>">

                                </td>  

                            </tr>
                        </table>           
                        <br>
                        
                        <div id="calendario_loading"><img src="images/loading.gif" style="margin-top: 80px; margin-left: 40px"></div>
                        <div id="calendario_corpo">
                        </div>
                        
                        <div id="calendario_formulaio">
                        
                            <table width=100% border=0 cellspacing=0 cellpadding=0>
                                <tr>
                                    <td width="15%">Tipo:</td>
                                    <td colspan="3">SM / Tarefa Interna:</td>
                                </tr>
                                <tr height="22">
                                  <td >
                                        <select id="tipoSM" alt="O campo Tipo deve ser preenchido" name="tipoSM" style="width:125px; height:20px;">
                                        <option value="0">-SELECIONE-</option>
                                        <option value="1">MANUTENÇÃO</option>
                                        <option value="2">MELHORIA</option>
                                        <option value="3">DESENVOLVIMENTO</option>
                                        <option value="4">FEEDBACK</option>
                                        <option value="5">CONTAGEM</option>
                                        <option value="6">TAREFA INTERNA</option>
                                    </select>
                                 </td>
                                 <td colspan="3">
                                     <input name="SM" id="SM" title="O Campo SM precisa ser preenchido!" size="10" maxlength="7"  >
                                    </td>
                                </tr>
                                <tr valign="bottom">                                                                       
                                    <td width="15%">Início:</td>
                                    <td width="15%">Fim:</td>
                                    <td width="40%"></td>
                                </tr>                                
                                <tr valign="top" height="22">                                                           
                                   
                                    <td>
                                        <input name="hrinicio" id="hrinicio" alt="InÃ­cio" class="horario" title="O Campo Hora Inicial precisa ser preenchido!" size="10" maxlength="10" readonly="readonly">
                                    </td>
                                    <td>
                                        <input name="hrfinal" id="hrfinal" alt="Fim" class="horario" size="10" maxlength="10" readonly="readonly">
                                    </td>
                                    <td>
                                        <input type="button" name="envia" id="envia" style="width:80px" value="Incluir" class="botao2" onClick="enviaForm()">&nbsp;&nbsp;
                                        <input type="reset" name="Submit" style="width:80px" value="Limpar" class="botao2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                </tr>
                            </table>  
                           
                        </div>
                    </fieldset>


                    <div id="div"style="width: 100%; height: 80%; padding-top: 5px; overflow: auto">
                        <table width="740" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse">
                            <tr>
                                <td width="8%" class="consulta_titulo">Data</td>
                                <td width="44%" class="consulta_titulo">SM / Tarefa Interna</td>
                                <td width="15%" class="consulta_titulo">Tipo</td>
                                <td width="7%" class="consulta_titulo">HR / Início</td>
                                <td width="7%" class="consulta_titulo">HR / Fim</td>
                                <td width="7%" class="consulta_titulo">Tempo</td>
                                <td width="12%" class="consulta_titulo">Ações</td>                            
                            </tr>
                        </table>
                         <div id="corpo_conteudo" style="overflow: auto; height: 300px"></div>
                               
                        <div id="example" style="width: 750px; height: 300px;"></div>





                    </div>
                </td>
                </tr>
                <tr>
            </table>
    </center></form>
</body>
</html>