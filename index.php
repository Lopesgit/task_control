<?php
/*
  |---------------------+---------------------------+---------|
  |   Data de Criação   |         Programador       |   SM    |
  |---------------------+---------------------------+---------|   
  |     06/02/2014      |       Daniel Camalionte   | ------- |
  +---------------------+---------------------------+---------|    
 */
header ('Content-type: text/html; charset=UTF-8');
session_start();
include '/include/bd_controle.inc';

function retornaTipo($codigo){
    switch($codigo):
        case '1': return 'MANUTENÇÃO';
        break;
        case '2': return 'MELHORIA';
        break;
        case '3': return 'DESENVOLVIMENTO';
        break;
        case '4': return 'FEEDBACK';
        break;
        case '5': return 'CONTAGEM';
        break;
        case '6': return 'TAREFA INTERNA';
        break;
    
    
    endswitch;
}

function SubtrairTemp($tmpFinal, $tmpInicial){ //Calcular Final - Inicial, formato HH:NN:SS
  $tmpFinal = explode(":", $tmpFinal);
  $ss_fn = ($tmpFinal[0] * 3600) + ($tmpFinal[1] * 60) + ($tmpFinal[2]);

  $tmpInicial = explode(":", $tmpInicial);
  $ss_in = ($tmpInicial[0] * 3600) + ($tmpInicial[1] * 60) + ($tmpInicial[2]);

  $ss_rs = $ss_fn - $ss_in;

  // Agora formata novamente a data ...

  $nn_rs = 0;
  $hr_rs = 0;

  while($ss_rs > 59){
    $ss_rs = $ss_rs - 60;
    $nn_rs = $nn_rs + 1;
    if($nn_rs>=60){
      $nn_rs = 0;
      $hr_rs = $hr_rs + 1;
    }
  }
  
  if($hr_rs < 10 ){
      $hr_rs = "0".$hr_rs;
  }
  
  if($nn_rs < 10 ){
      $nn_rs = "0".$nn_rs;
  }
  
  if($ss_rs < 10 ){
      $ss_rs = "0".$ss_rs;
  }
  
  return $hr_rs . ":" . $nn_rs . ":" . $ss_rs;
}

function array_push_associative(&$arr) {
                                    $args = func_get_args();
                                    $ret = 0;
                                    foreach ($args as $arg) {
                                        if (is_array($arg)) {
                                            foreach ($arg as $key => $value) {
                                                $arr[$key] = $value;
                                                $ret++;
                                            }
                                        } else {
                                            $arr[$arg] = "";
                                        }
                                    }
                                }

                                
function pontinhos($valor, $pontos)
{
    if ($valor[$pontos] <> "")
    {
        $valor = substr($valor, 0, $pontos) . "...";
        return $valor;
    }
    else
    {
        return $valor;
    }
}

                                
if(!empty($_REQUEST['exec']) && $_REQUEST['exec'] == 'excluir'):
    
            $sql = "DELETE FROM CONTROLE_SM 
                        WHERE 
                    ID_CONTROLE = '{$_REQUEST['id']}'";
            //echo "<pre>".$sql."</pre>";
                    ibase_query($bd_control, $sql);
                    
    echo json_encode($res);
    exit();
endif;    


if(!empty($_REQUEST['acao']) && $_REQUEST['acao'] == 'grafico'):
    
    $data = str_replace('/', '.', $_REQUEST['data']);
    
    $sql = "SELECT
                COUNT(C.ID_CONTROLE) AS TOTAL
            FROM        
                CONTROLE_SM C
            WHERE       
                C.DATA = '{$data}' AND 
                C.FL_PROGRAMADOR = '{$_REQUEST['programador']}'";
      //echo "<pre>".$sql."</pre>";
    $res = ibase_fetch_assoc(ibase_query($bd_control, $sql));
    
    $totalRegistro = $res['TOTAL'];
    
    $sql = "SELECT
                C.ID_CONTROLE,
                C.DATA,
                C.SM, 
                C.HR_INICIO,
                C.HR_FIM,
                C.FL_TIPO
            FROM        
                CONTROLE_SM C
            WHERE       
                C.DATA = '{$data}' AND 
                C.FL_PROGRAMADOR = '{$_REQUEST['programador']}'
            ORDER BY C.HR_INICIO ASC";
      //echo "<pre>".$sql."</pre>";
      $res = ibase_query($bd_control, $sql);
    
      while ($linha = ibase_fetch_assoc($res)):
            $tempo = retornaTipo($linha['FL_TIPO']);
            $tempo = $tempo;
            $horaIniArray = explode(":", $linha['HR_INICIO']);
            
            $horaFimArray = explode(":", $linha['HR_FIM']);
      
            $horaIni = $horaIniArray[0];
            $minIni = $horaIniArray[1];
                
            $horaFim = $horaFimArray[0];
            $minFim = $horaFimArray[1];       
      
            $array[] = $linha['SM']."##".$tempo."##".$horaIni."##".$minIni."##".$horaFim."##".$minFim."##".$totalRegistro; 
      endwhile;
                    
    echo json_encode($array);
    exit();
endif;

if(!empty($_REQUEST['exec']) && $_REQUEST['exec'] == 'update'):
    if($_REQUEST['hrfinal2'] != ''){
      $data_final = "'{$_REQUEST['hrfinal2']}:00'";  
    } else {
       $data_final = "'{$_REQUEST['hrinicio2']}:00'"; 
    }
    
    $data_inicio = str_replace('/', '.', $_REQUEST['data_inicial2']);
    $sql = "UPDATE 
                CONTROLE_SM CSM
                SET SM = UPPER('{$_REQUEST['SM2']}'), 
                    HR_INICIO = '{$_REQUEST['hrinicio2']}:00',  
                    HR_FIM = $data_final,  
                    FL_PROGRAMADOR = '{$_REQUEST['local_coleta2']}',
                    FL_TIPO = '{$_REQUEST['tipoSM2']}',
                    DATA = '$data_inicio'
            WHERE 
                ID_CONTROLE = '{$_REQUEST['ID_CONTROLE']}'";
    //die("<pre>$sql</pre>");
    ibase_query($bd_control, $sql);
    echo json_encode(1);
    exit();
endif;

if(!empty($_REQUEST['exec']) && $_REQUEST['exec'] == 'insert'):
          if($_REQUEST['hrfinal'] != ''){
            $data_final = "'{$_REQUEST['hrfinal']}:00'";  
          } else {
             $data_final = "'{$_REQUEST['hrinicio']}:00'"; 
          }    
            $data_inicio = str_replace('/', '.', $_REQUEST['data_inicial']);
            $sql = "INSERT INTO 
                        CONTROLE_SM 
                        (DATA, 
                         SM, 
                         HR_INICIO, 
                         HR_FIM, 
                         FL_PROGRAMADOR,
                         FL_TIPO) 
                         VALUES 
                         ('$data_inicio',
                         UPPER('{$_REQUEST['SM']}'), 
                         '{$_REQUEST['hrinicio']}:00', 
                         $data_final, 
                         '{$_REQUEST['local_coleta']}',
                         '{$_REQUEST['tipoSM']}');";
            //echo "<pre>".$sql."</pre>";
            ibase_query($bd_control, $sql);
            echo json_encode(1);
    exit();
endif;                                   

if(!empty($_REQUEST['acao']) && $_REQUEST['acao'] == 'carregaCorpo'):
    
    $data_inicio = str_replace('/', '.', $_REQUEST['data_inicial']);
    
    $sql = "SELECT
                C.ID_CONTROLE,
                C.DATA,
                C.SM, 
                C.HR_INICIO,
                C.HR_FIM,
                C.FL_TIPO
            FROM        
                CONTROLE_SM C
            WHERE       
                C.DATA = '{$data_inicio}' AND 
                C.FL_PROGRAMADOR = '{$_REQUEST['local_coleta']}'
            ORDER BY C.HR_INICIO ASC";
      //echo "<pre>".$sql."</pre>";
      $res = ibase_query($bd_control, $sql);
      
      $tabela =  "<table width=\"740\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\">";
      $contador = 0;
      
      while($linha = ibase_fetch_assoc($res)):
            $data = $linha['DATA'];
            $data = substr($data, 8, 2)."/".substr($data, 5, 2)."/".substr($data, 0, 4);
            
            $HORA_INICIO = explode(":", $linha['HR_INICIO']);
            $HORA_INICIO = $HORA_INICIO[0].":".$HORA_INICIO[1];
            
            $HORA_FIM = explode(":", $linha['HR_FIM']);
            $HORA_FIM = $HORA_FIM[0].":".$HORA_FIM[1];
            
            /*$MAX = $linha[MAXIMO];
            
            if($MAX == ''):
                $MAX = '&infin;';
            endif;*/
            $tabela.= "<tr>
                           <td width=\"8%\" class=\"background_branco\" align=\"center\">$data</td>
                           <td width=\"44%\" title=\"$linha[SM]\" class=\"background_branco\" ><a href=\"#\" onClick=\"carregaModal('{$linha['SM']}', '{$_REQUEST['local_coleta']}');\">{$linha['SM']}</a></td>
                           <td width=\"15%\" class=\"background_branco\" align=\"center\">".retornaTipo($linha['FL_TIPO'])."</td>
                           <td width=\"7%\" class=\"background_branco\" align=\"center\">".substr($linha['HR_INICIO'],0,5)."</td>
                           <td width=\"7%\" class=\"background_branco\" align=\"center\">".substr($linha['HR_FIM'],0,5)."</td>
                           <td width=\"7%\" class=\"background_branco\" align=\"center\">".substr(SubtrairTemp($linha['HR_FIM'], $linha['HR_INICIO']),0,5)."</td>
                           <td width=\"12%\" class=\"background_branco\" align=\"center\">
                            <input type=\"button\" name=\"alterar\" id=\"alterar\" style=\"width:40px\" value=\"Alterar\" class=\"bt_excluir\" onClick=\"carregaModalAlt('{$linha['ID_CONTROLE']}', '{$linha['SM']}');\">
                            <input type=\"button\" name=\"excluir\" id=\"excluir\" style=\"width:40px\" value=\"Excluir\" class=\"bt_excluir\" onClick=\"excluiReg('{$linha['ID_CONTROLE']}')\">";
                           
                     $tabela.= "</td>    
                       </tr>"; 
                     
          
                $times[] = SubtrairTemp($linha['HR_FIM'], $linha['HR_INICIO']);
                   
            //$times = array($geralArray);
            
            //$times = array(  '01:30:22',  '34:17:03',);
            $contador++;
      endwhile;
            
            $seconds = 0;
            //var_dump($times);
            if($contador <> 0):
                 
            foreach ( $times as $time ){   
                list( $g, $i, $s ) = explode( ':', $time );   
                $seconds += $g * 3600;   
                $seconds += $i * 60;   
                $seconds += $s;}
  
                $hours = floor( $seconds / 3600 );
                $seconds -= $hours * 3600;
                $minutes = floor( $seconds / 60 );
                $seconds -= $minutes * 60;

                if($hours < 10):
                    $hours = "0".$hours;
                endif;

                if($minutes < 10):
                    $minutes = "0".$minutes;
                endif;

                if($seconds < 10):
                    $seconds = "0".$seconds;
                endif;

                $TOTAL =  "{$hours}:{$minutes}:{$seconds}";

                 $tabela.= "<tr>
                               <td width=\"8%\" height=\"15\"></td>
                               <td width=\"44%\" height=\"15\"></td>
                               <td width=\"15%\" height=\"15\"></td>
                               <td width=\"7%\" height=\"15\"></td>
                               <td width=\"7%\" height=\"15\" class=\"background_branco\" align=\"center\">TOTAL</td>
                               <td width=\"7%\" height=\"15\" class=\"background_branco\" align=\"center\"><b>".substr($TOTAL,0,5)."</b></td>
                               <td width=\"12%\" height=\"15\"></td>    
                           </tr>";

          $tabela.= "</table>";
       endif;
      echo $contador."##".$tabela;
      exit();
endif;  

if(!empty($_REQUEST['acao']) && $_REQUEST['acao'] == 'carregaModal'):
        $sql = "SELECT
                C.ID_CONTROLE,
                C.DATA,
                C.SM, 
                C.HR_INICIO,
                C.HR_FIM,
                C.FL_TIPO
            FROM        
                CONTROLE_SM C
            WHERE       
                C.SM = '{$_REQUEST['SM']}' AND FL_PROGRAMADOR = '{$_REQUEST['programador']}'
            ORDER BY C.DATA, C.HR_INICIO ASC";
        $res = ibase_query($bd_control, $sql);
      
     $tabela =  "<table width=\"740\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\">
                            <tr>
                                <td width=\"8%\" class=\"consulta_titulo\">Data</td>
                                <td width=\"44%\" class=\"consulta_titulo\">SM / Tarefa Interna</td>
                                <td width=\"15%\" class=\"consulta_titulo\">Tipo</td>
                                <td width=\"7%\" class=\"consulta_titulo\">HR / Início</td>
                                <td width=\"7%\" class=\"consulta_titulo\">HR / Fim</td>
                                <td width=\"7%\" class=\"consulta_titulo\">Tempo</td>
                                <td width=\"12%\" class=\"consulta_titulo\">Ações</td>
                            </tr>
                        </table>";
        
        
      $tabela .=  "<table width=\"740\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\">";
      $contador = 0;
      while($linha = ibase_fetch_assoc($res)):
            $data = $linha['DATA'];
            $data = substr($data, 8, 2)."/".substr($data, 5, 2)."/".substr($data, 0, 4);
            
            $HORA_INICIO = explode(":", $linha['HR_INICIO']);
            $HORA_INICIO = $HORA_INICIO[0].":".$HORA_INICIO[1];
            
            $HORA_FIM = explode(":", $linha['HR_FIM']);
            $HORA_FIM = $HORA_FIM[0].":".$HORA_FIM[1];
                    
            $tabela.= "<tr>
                           <td width=\"8%\" class=\"background_branco\" align=\"center\">$data</td>
                           <td width=\"44%\" class=\"background_branco\" title=\"{$linha['SM']}\">{$linha['SM']}</td>
                           <td width=\"15%\" class=\"background_branco\" align=\"center\">".retornaTipo($linha['FL_TIPO'])."</td>
                           <td width=\"7%\" class=\"background_branco\" align=\"center\">".substr($linha['HR_INICIO'],0,5)."</td>
                           <td width=\"7%\" class=\"background_branco\" align=\"center\">".substr($linha['HR_FIM'],0,5)."</td>
                           <td width=\"7%\" class=\"background_branco\" align=\"center\">".substr(SubtrairTemp($linha['HR_FIM'], $linha['HR_INICIO']),0,5)."</td>
                           <td width=\"12%\" class=\"background_branco\" align=\"center\">
                            <input type=\"button\" name=\"alterar_modal\" id=\"alterar_modal\" style=\"width:40px\" value=\"Alterar\" class=\"bt_excluir\" onClick=\"carregaModalAlt('{$linha['ID_CONTROLE']}', '{$linha['SM']}'); fechaModal();\">
                            <input type=\"button\" name=\"excluir_modal\" id=\"excluir_modal\" style=\"width:40px\" value=\"Excluir\" class=\"bt_excluir\" onClick=\"excluiReg('{$linha['ID_CONTROLE']}'); carregaModal('{$linha['SM']}', '{$_REQUEST['programador']}'); carregaCorpo();\">
                           </td> 
                        </tr>";
             $times[] = SubtrairTemp($linha['HR_FIM'], $linha['HR_INICIO']);
             $contador++;
      endwhile;       
       if($contador != 0){
        foreach ( $times as $time ){   
                 list( $g, $i, $s ) = explode( ':', $time );   
                 $seconds += $g * 3600;   
                 $seconds += $i * 60;   
                 $seconds += $s;}


                 $hours = floor( $seconds / 3600 );
                 $seconds -= $hours * 3600;
                 $minutes = floor( $seconds / 60 );
                 $seconds -= $minutes * 60;

                 if($hours < 10):
                     $hours = "0".$hours;
                 endif;

                 if($minutes < 10):
                     $minutes = "0".$minutes;
                 endif;

                 if($seconds < 10):
                     $seconds = "0".$seconds;
                 endif;

                 $TOTAL =  "{$hours}:{$minutes}:{$seconds}";

                  $tabela.= "<tr>
                                <td width=\"8%\" height=\"15\"></td>
                                <td width=\"44%\" height=\"15\"></td>
                                <td width=\"15%\" height=\"15\"></td>
                                <td width=\"7%\" height=\"15\"></td>
                                <td width=\"7%\" height=\"15\" class=\"background_branco\" align=\"center\">TOTAL</td>
                                <td width=\"7%\" height=\"15\" class=\"background_branco\" align=\"center\"><b>".substr($TOTAL,0,5)."</b></td>  
                                <td width=\"12%\" height=\"15\"></td>  
                            </tr>";

           $tabela.= "</table>";
       }
      echo $tabela;
      exit();
endif;

if(!empty($_REQUEST['acao']) && $_REQUEST['acao'] == 'carregaModalAlt'):
        $sql = "SELECT
                C.ID_CONTROLE,
                C.DATA,
                C.SM, 
                C.HR_INICIO,
                C.HR_FIM,
                C.FL_TIPO,
                C.FL_PROGRAMADOR
            FROM        
                CONTROLE_SM C
            WHERE       
                C.ID_CONTROLE = '{$_REQUEST['ID_CONTROLE']}'
            ORDER BY C.HR_INICIO ASC";
//        echo "<pre>".$sql."</pre>";
//        exit();
                
        $res = ibase_query($bd_control, $sql);
        $linha = ibase_fetch_assoc($res);
        
        $data = $linha['DATA'];
        $data = substr($data, 8, 2)."/".substr($data, 5, 2)."/".substr($data, 0, 4);
        $hora_inicio = substr($linha['HR_INICIO'], 0, 5);
        $hora_fim = substr($linha['HR_FIM'], 0, 5);
        
        $retorno = array('ID_CONTROLE' => $linha['ID_CONTROLE'], 
                        'DATA' => $data,
                        'SM' => $linha['SM'],
                        'HR_INICIO' => $hora_inicio,
                        'HR_FIM' => $hora_fim,
                        'FL_TIPO' => $linha['FL_TIPO'],
                        'FL_PROGRAMADOR' => $linha['FL_PROGRAMADOR']);                  
    
       echo json_encode($retorno);
      exit();
endif;

?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>:: Controle de Tarefas ::</title>
        <script>  redimensiona = "conteudo=47"; </script>
        <script language="JavaScript" type="text/JavaScript" src="js/redimensiona.js"></script>
        <script language="JavaScript" type="text/JavaScript" src="js/funcoes_formulario.js"></script>
        <script language="JavaScript" type="text/JavaScript" src="js/funcoes_globais.js"></script>
        <script language="JavaScript" type="text/JavaScript" src="js/cria_mascara.js"></script>
<!--        <script language="JavaScript" type="text/JavaScript" src="js/jquery.js"></script>
        <script language="JavaScript" type="text/JavaScript" src="js/jquery.maskedinput.js"></script>-->

        <script language="JavaScript" type="text/JavaScript" src="js/jquery.alphanumeric.js"></script>
        <script language="JavaScript" type="text/JavaScript" src="js/funcoes_formulario_jquery.js"></script>
<!--        <script type="text/javascript" language="JavaScript" src="js/jquery-ui-1.8.19.custom.min.js"></script>-->
        <link rel="stylesheet" type="text/css" href="css/calendario_personalizado.css"/>
<!--        <link rel="stylesheet" type="text/css" href="css/custom-theme/jquery-ui-1.8.19.custom.css"  />-->
       <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization',
       'version':'1','packages':['timeline']}]}"></script>
       <script language="JavaScript" type="text/JavaScript" src="js/jquery-1.10.2.js"></script>  
       <link type="text/css" href="css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" />
       <script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
       <link type="text/css" href="css/jquery-ui-timepicker-addon.css" rel="stylesheet" />
       <script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
        

       

<script type="text/javascript">

//google.setOnLoadCallback(drawChart);
       
        
function drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9, grafico10, grafico11, grafico12, grafico13, grafico14, grafico15) {

  var container = document.getElementById('example');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Room' });
  dataTable.addColumn({ type: 'string', id: 'Name' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

            switch(numLinha)
                             {
                             case '1':
                                 dataTable.addRows([grafico]);
                             break;
                             case '2':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                             break;
                             case '3':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                             break;
                             case '4':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 
                             break;
                             case '5':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                             break;
                             case '6':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                             break;
                             case '7':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                             break;
                             case '8':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                             break;
                             case '9':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                             break;
                             case '10':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                                 dataTable.addRows([grafico9]);
                             break;
                             case '11':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                                 dataTable.addRows([grafico9]);
                                 dataTable.addRows([grafico10]);
                             break;
                             case '12':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                                 dataTable.addRows([grafico9]);
                                 dataTable.addRows([grafico10]);
                                 dataTable.addRows([grafico11]);
                             break;
                             case '13':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                                 dataTable.addRows([grafico9]);
                                 dataTable.addRows([grafico10]);
                                 dataTable.addRows([grafico11]);
                                 dataTable.addRows([grafico12]);
                             break;
                             case '14':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                                 dataTable.addRows([grafico9]);
                                 dataTable.addRows([grafico10]);
                                 dataTable.addRows([grafico11]);
                                 dataTable.addRows([grafico12]);
                                 dataTable.addRows([grafico13]);
                             break;
                             case '15':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                                 dataTable.addRows([grafico9]);
                                 dataTable.addRows([grafico10]);
                                 dataTable.addRows([grafico11]);
                                 dataTable.addRows([grafico12]);
                                 dataTable.addRows([grafico13]);
                                 dataTable.addRows([grafico14]);
                             break;
                             case '16':
                                 dataTable.addRows([grafico]);
                                 dataTable.addRows([grafico1]);
                                 dataTable.addRows([grafico2]);
                                 dataTable.addRows([grafico3]);
                                 dataTable.addRows([grafico4]);
                                 dataTable.addRows([grafico5]);
                                 dataTable.addRows([grafico6]);
                                 dataTable.addRows([grafico7]);
                                 dataTable.addRows([grafico8]);
                                 dataTable.addRows([grafico9]);
                                 dataTable.addRows([grafico10]);
                                 dataTable.addRows([grafico11]);
                                 dataTable.addRows([grafico12]);
                                 dataTable.addRows([grafico13]);
                                 dataTable.addRows([grafico14]);
                                 dataTable.addRows([grafico15]);
                             break;
                        } 

    var options = {
    timeline: { singleColor: '#8d8' }
  };

  chart.draw(dataTable, options);
}






</script>

        
        <script>
              $(document).ready(function(){
                
                  $('#hrinicio, #hrinicio2, #hrfinal, #hrfinal2').timepicker({
                        timeFormat: 'HH:mm',
                        currentText: 'Agora',
                        closeText: 'Fechar',
                        timeOnlyTitle: 'Escolha o Horário',
                        timeText: 'Horário',
                        hourText: 'Hora',  
                        minuteText: 'Minuto',
                        stepHour: 1,
                        stepMinute: 5,
                        hourGrid: 2,
                        minuteGrid: 10,
                        hourMin: 7,
                        hourMax: 17
                    });
                  
                  $(".data_picker").datepicker({
                    dateFormat: 'dd/mm/yy',
                    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
                    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
                    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
                    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                    nextText: 'Próximo',
                    prevText: 'Anterior',
                    maxDate: $('#data_atual').val(),
                    onSelect: function(selected,evnt) {
                        if($(this).attr("id") == "data_inicial"){
                               carrega_horario();                               
                        }                        
                   }
                });                 

              
              carrega_horario();
              
               $("#tipoSM").change(function(){
                    if($(this).val() != 6){
                        $("#SM").attr("size", "10");
                        $("#SM").attr("maxlength","7");
                    } else{
                        $("#SM").attr("size","100");
                        $("#SM").attr("maxlength","144");
                    }
                });
                
                $("#tipoSM2").change(function(){
                    if($(this).val() != 6){
                        $("#SM2").attr("size", "10");
                        $("#SM2").attr("maxlength","7");
                    } else{
                        $("#SM2").attr("size","100");
                        $("#SM2").attr("maxlength","144");
                    }
                });    
            
            
                $('#demo-description').dialog({ 
                    modal: true, 
                    width: 800,
                    height: 300,
                    autoOpen: false,
                    open: function(event, ui) { 
                        $('#alterar_modal').blur(); 
                    },
                    show: {
                        effect: "blind",
                        duration: 500
                    },
                    hide: {
                        effect: "explode",
                        duration: 1000
                    },
                    buttons: {
                        Fechar: function() {
                            $( this ).dialog( "close" );
                        }
                    } 
                });
                
                $('#alteracao').dialog({ 
                    modal: true, 
                    width: 800,
                    height: 230,
                    autoOpen: false,
                    show: {
                        effect: "blind",
                        duration: 500
                    },
                    hide: {
                        effect: "explode",
                        duration: 1000
                    },
                    buttons: {
                        Cancelar: function() {
                            $( this ).dialog( "close" );
                        }
                    } 
                });
                                
                $(".max").numeric();
                $(".horario").mask('99:99').blur(function() {
                    sucesso = false;
                    if ($(this).val() != '')
                    {
                        sucesso = true;

                        horario = $(this).val().split(':');
                        hora = parseInt(horario[0], 10);
                        minuto = parseInt(horario[1], 10);

                        if (hora > 23)
                            sucesso = false;
                        if (minuto > 59)
                            sucesso = false;

                        if (sucesso == false)
                        {
                            alert("Horário em formato inválido.");
                            $(this).val('');
                            $(this).focus();
                        }
                    }
                });
                $("#hrfinal").
                $("#hrfinal").blur(function(){
                    if($("#hrinicio").val() == ''){
                        alert('Preencha primeiro a data inicial.');
                        $("#hrfinal").val('');
                        $("#hrinicio").focus();
                    } else {
                        horario = $("#hrinicio").val().split(':');
                        totalInicio = horario[0]+horario[1]; 
                        
                        horario = $("#hrfinal").val().split(':');
                        totalFinal = horario[0]+horario[1];
                        
                        if(totalInicio >= totalFinal){
                            alert('A hora inicial precisa ser maior que a hora final.');
                            $("#hrinicio").val('');
                            $("#hrinicio").focus();
                        }
                    }
                });
                
                 $("#hrfinal2").blur(function(){
                    if($("#hrinicio2").val() == ''){
                        alert('Preencha primeiro a data inicial.');
                        $("#hrfinal2").val('');
                        $("#hrinicio2").focus();
                    } else {
                        horario = $("#hrinicio2").val().split(':');
                        totalInicio = horario[0]+horario[1]; 
                        
                        horario = $("#hrfinal2").val().split(':');
                        totalFinal = horario[0]+horario[1];
                        
                        if(totalInicio >= totalFinal){
                            alert('A hora inicial precisa ser maior que a hora final.');
                            $("#hrinicio2").val('');
                            $("#hrinicio2").focus();
                        }
                    }
                });
                
                $('#local_coleta').change(function(){
                    if($('#local_coleta').val() == '0'){
                        $("#calendario_corpo").css("display", "none");
//                        $("#calendario_formulaio").css("display", "none");
                        $("#corpo_conteudo").css("display", "none");
                    } else {
                         //carregaCalendario();
                         //carregaCorpo($('#mesAtual').val());
//                         $("#calendario_formulaio").css("display", "block");
                         $("#corpo_conteudo").css("display", "block");
                         $('#demo-description').attr('title', 'Photo by Kelly Clark');
                    }
                });
                
                
            });
            
            function carregaModal(SM, ID){          
                
                $.ajax({
                            type: "POST",
                            data: "acao=carregaModal&SM="+SM+"&programador="+ID,
                            url: "index.php",
                            dataType: 'html',
                            beforeSend: function(){
                            },
                            success: function(retorno){
                                $('#demo-description').html(retorno);
                                $('#demo-description').dialog( "open" );    
                            }
                        });
            } 
            
            function fechaModal(){
                $('#demo-description').dialog( "close" );
            }
            function carregaModalAlt(ID_CONTROLE, SM){
                $.ajax({
                            type: "POST",
                            data: "acao=carregaModalAlt&ID_CONTROLE="+ID_CONTROLE,
                            url: "index.php",
                            dataType: 'html',
                            beforeSend: function(){
                            },
                            success: function(retorno){
                                retjson = JSON.parse(retorno);

                                $('#SM2').val(retjson.SM);
                                $('#hrinicio2').val(retjson.HR_INICIO);
                                $('#hrfinal2').val(retjson.HR_FIM);
                                $('#ID_CONTROLE').val(retjson.ID_CONTROLE);
                                $('#data_inicial2').val(retjson.DATA);
                                $('#alteracao').dialog( "open" ); 
                                $('#tipoSM2 option[value='+retjson.FL_TIPO+']').attr('selected','selected');
                                $('#local_coleta2 option[value='+retjson.FL_PROGRAMADOR+']').attr('selected','selected');
                                $('#local_coleta2').val(retjson.FL_PROGRAMADOR);                                

                                if($("#tipoSM2").val() != 6){
                                    $("#SM2").attr("size", "10");
                                    $("#SM2").attr("maxlength","7");
                                } else{
                                    $("#SM2").attr("size","100");
                                    $("#SM2").attr("maxlength","144");
                                }
                               }
                        });
            }
            
            function montaGrafico(data, programador){
                $.ajax({
                    type: "POST",
                    data: "acao=grafico&data="+data+"&programador="+programador,
                    url: "index.php",
                    dataType: 'json',
                    beforeSend: function(){
                    },
                    success: function(retorno){
                    
                    var grafico;
                    var grafico1;
                    var grafico2;
                    var grafico3;
                    var grafico4;
                    var grafico5;
                    var grafico6;
                    var grafico7;
                    var grafico8;
                    var grafico9;
                    var grafico10;
                    var grafico11;
                    var grafico12;
                    var grafico13;
                    var grafico14;
                    var grafico15;
                    
                    var variavel;
                    var variaveis;
                    var valor;
                    var indice;
                    
                    
                    variavel = '';
                    valor = 0;
                    indice = 1;
                    
                    $.each(retorno, function(key,val) {
                        switch(indice)
                             {
                             case 1:
                                    variaveis = val.split("##");
                                    grafico = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 2:
                                    variaveis = val.split("##");
                                    grafico1 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 3:
                                    variaveis = val.split("##");
                                    grafico2 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 4:
                                    variaveis = val.split("##");
                                    grafico3 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 5:
                                    variaveis = val.split("##");
                                    grafico4 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 6:
                                    variaveis = val.split("##");
                                    grafico5 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 7:
                                    variaveis = val.split("##");
                                    grafico6 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 8:
                                    variaveis = val.split("##");
                                    grafico7 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 9:
                                    variaveis = val.split("##");
                                    grafico8 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 10:
                                    variaveis = val.split("##");
                                    grafico9 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;
                             case 11:
                                    variaveis = val.split("##");
                                    grafico10 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break; 
                             case 12:
                                    variaveis = val.split("##");
                                    grafico11 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break; 
                             case 13:
                                    variaveis = val.split("##");
                                    grafico12 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break; 
                             case 14:
                                    variaveis = val.split("##");
                                    grafico13 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break; 
                             case 15:
                                    variaveis = val.split("##");
                                    grafico14 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;  
                             case 16:
                                    variaveis = val.split("##");
                                    grafico15 = [ variaveis[0],  variaveis[1],    new Date(0,0,0,variaveis[2],variaveis[3],0),  new Date(0,0,0,variaveis[4],variaveis[5],0) ];
                                    numLinha = variaveis[6];
                               break;  
                             }
                        indice++;     
                             
                     });
                        
                        switch(numLinha)
                             {
                             case '1':
                                 drawChart(numLinha, grafico);
                             break;
                             case '2':
                                 drawChart(numLinha, grafico, grafico1);
                             break;
                             case '3':
                                 drawChart(numLinha, grafico, grafico1, grafico2);
                             break;
                             case '4':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3);
                             break;
                             case '5':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4);
                             break;
                             case '6':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5);
                             break;
                             case '7':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6);
                             break;
                             case '8':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7);
                             break;
                             case '9':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8);
                             break;
                             case '10':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9);
                             break;
                             case '11':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9, grafico10);
                             break;
                             case '12':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9, grafico10, grafico11);
                             break;
                             case '13':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9, grafico10, grafico11, grafico12);
                             break;
                             case '14':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9, grafico10, grafico11, grafico12, grafico13);
                             break;
                             case '15':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9, grafico10, grafico11, grafico12, grafico13, grafico14);
                             break;
                             case '16':
                                 drawChart(numLinha, grafico, grafico1, grafico2, grafico3, grafico4, grafico5, grafico6, grafico7, grafico8, grafico9, grafico10, grafico11, grafico12, grafico13, grafico14, grafico15);
                             break;
                        } 
                    //variaveis = retorno.split("##");
                    /*nome = 'olá';
                    teste = [ 'Magnolia Room',  'CSS Fundamentals',    new Date(0,0,0,12,0,0),  new Date(0,0,0,14,5,0) ];
                    teste1 =  [ 'Gladiolus Room', 'Intermediate Perl',   new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ];
                    teste2 = [ 'Petunia Room',   'Google Charts',       new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ];
                          drawChart(teste, teste1, teste2);*/
                    }
                });
            }
                        
            
            function carregaCalendario(){
                $.ajax({
                            type: "POST",
                            data: "acao=carregaCalendario&"+$("#formulario").serialize(),
                            url: "jornadas_coleta.php",
                            dataType: 'html',
                            beforeSend: function(){
                                $("#calendario_loading").css("display", "block");
                                $("#calendario_corpo").css("display", "none");
                            },
                            success: function(retorno){
                                $("#calendario_loading").css("display", "none");
                                $("#calendario_corpo").css("display", "block");
                                $("#calendario_corpo").html(retorno);
                                $("#calendario_formulaio").css("display", "block");
                            }
                        });
            }
            
            function carregaCorpo(){
                $.ajax({
                            type: "POST",
                            data: "acao=carregaCorpo&"+$("#formulario").serialize(),
                            url: "index.php",
                            dataType: 'html',
                            beforeSend: function(){
                            },
                            success: function(retorno){
                                retorno = retorno.split("##");
                                $("#corpo_conteudo").html(retorno[1]);
                                if(retorno[0] > 0){
                                    data_inicial = $('#data_inicial').val();
                                    programador = $('#local_coleta').val();
                                    $("#example").css("display", "block");
                                    montaGrafico(data_inicial, programador);
                                } else {
                                    $("#example").css("display", "none");
                                }
                            }
                        });  
            }
            
            function excluiReg(id){
                var r = confirm("Deseja realmente excluir o registro?");
                if (r == true)
                  {
                      $.ajax({
                                type: "POST",
                                data: "exec=excluir&id="+id,
                                url: "index.php",
                                dataType: 'json',
                                beforeSend: function(){
                                },
                                success: function(retorno){
                                    //alert('Registro excluído com sucesso.');
                                    carregaCorpo();
                                }    
                            });
                  }
                else
                  {
                  }
            }
            
            function enviaFormAlteracao(){
                $("#SM2").val(function () {
                    return this.value.toUpperCase();
                });
                 if($('#local_coleta2  option:selected').text() == ''){
                    alert('Selecione um Programador.');
                } else if($('#tipoSM2  option:selected').text() == '-SELECIONE-'){
                    alert('Selecione um Tipo.');
                }else {
                    if (enviaForm_sem_submit(document.formulario_alt))
                    {
                        $.ajax({
                                type: "POST",
                                data: "exec=update&"+$("#formulario_alt").serialize(),
                                url: "index.php",
                                dataType: 'json',
                                beforeSend: function(){
                                },
                                success: function(retorno){
                                        //alert("Dados atualizados com sucesso.")
                                        $("#data_inicial").val($("#data_inicial2").val());
                                        carregaCorpo();
                                        $('#alteracao').dialog( "close" );   
                                }
                            });
                    }
                }
            }
            
            function enviaForm(){
                $("#SM").val(function () {
                    return this.value.toUpperCase();
                });
                if($('#local_coleta  option:selected').text() == ''){
                    alert('Selecione um Programador.');
                } else if($('#tipoSM  option:selected').text() == '-SELECIONE-'){
                    alert('Selecione um Tipo.');
                }else {
                    if (enviaForm_sem_submit(document.formulario))
                    {
                        $.ajax({
                                type: "POST",
                                data: "exec=insert&"+$("#formulario").serialize(),
                                url: "index.php",
                                dataType: 'json',
                                beforeSend: function(){
                                },
                                success: function(retorno){

                                        //alert("Dados cadastrado com sucesso.")
                                        carregaCorpo();


                                }
                            });
                    }
                }
            }

            function carrega_horario(){
                carregaCorpo();
            }           
           
            
        </script>
        
        <style>
            .carregando {
                display:none; 
                position:absolute; 
                left: 878px; 
                top: 5px;
            }
            #calendario_corpo {
                display:none;
                width: 300px;
                position:relative;
                float: left;
            }
            
            #calendario_loading {
                display:none;
                width: 300px;
                position:relative;
                float: left;
            }
            #calendario_formulaio {
/*                display:none;*/
                width: 90%;
                position:relative;
                float: left;
                margin-left: 50px;
            }
        </style>
    </head>
    
    <body bgcolor="#d6d7d6"  style="margin-top: 0px"> 
        <input id="data_atual" type="hidden" value="<?= date('d/m/y'); ?>" />
        
        <div id="demo-description" title="HISTÓRICO DA SM" style="display: none; overflow: auto">
           
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
                                    <input type="text" name="data_inicial2"  class="data_picker" id="data_inicial2" alt="Data inicial obrigatória!" tabindex="1" readonly="readonly" style="text-align:center; width: 75px;" maxlength="10">
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
                                        <input name="hrinicio2" id="hrinicio2" alt="Início" class="horario" title="O Campo Hora Inicial precisa ser preenchido!" size="10" maxlength="10" readonly="readonly">
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
            <input type="hidden" id="mesAtual" name="mesAtual" value="<?=date('m')?>">
            <table  cellpadding="0" cellspacing="0" width="780" height="350" bgcolor="#FFFFFF" border="0"><tr>
                    <td class="barra_direita" width="308">&nbsp;&nbsp;CONTROLE DE TAREFAS DIÁRIAS<div id="response_busca" class="carregando"><img src="../images/carregando_barra.gif"></div></td>
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
                                    <input type="text" class="data_picker" name="data_inicial" id="data_inicial" title="Data inicial obrigatória!" tabindex="1" readonly="readonly" style="text-align:center; width: 65px;" maxlength="10" value="<?= date("d/m/Y"); ?>">
<!--                                        <a href="javascript:void(0)" onClick="if(self.gfPop){ gfPop.fPopCalendar(document.getElementById('data_inicial'),[[<?= date("Y,m,d", strtotime("today -10 year")); ?>],[<?= date("Y,m,d"); ?>]]); gfPop.executar_funcao = 'parent.carrega_horario()'; } return false;" HIDEFOCUS>
                                    <img class="PopcalTrigger" align="top" src="js/calendario/calbtn.gif" width="30" height="18" border="0" alt=""></a>-->

                                </td>  

                            </tr>
                        </table>           
                        <br>
                        
                        <div id="calendario_loading"><img src="../images/loading.gif" style="margin-top: 80px; margin-left: 40px"></div>
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
                                        <input name="hrinicio" id="hrinicio" alt="Início" class="horario" title="O Campo Hora Inicial precisa ser preenchido!" size="10" maxlength="10" readonly="readonly">
                                    </td>
                                    <td>
<!--                                    <input name="hrfinal" id="hrfinal" class="horario" title="O Campo Hora Final precisa ser preenchido!" size="10" maxlength="10" >-->
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

<!--                    <a href="javascript:void(0)" onClick="if(self.gfPop)gfPop.fPopCalendar(document.formulario.data_final);return false;" HIDEFOCUS> </a><a href="javascript:void(0)" onClick="if(self.gfPop)gfPop.fPopCalendar(document.formulario.data_inicial);return false;" HIDEFOCUS> </a>-->

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
<!--                    <td colspan="6" class="barra_esquerda"><a href="../conteudo.php?id=<?php echo $_SESSION["menu"]; ?>">Voltar</a></tr>-->
            </table>
    </center></form>
<!--    <iframe width=174 height=190 marginheigrh=10 name="gToday:normal:agenda.js" id="gToday:normal:agenda.js" src="js/calendario/ipopeng2.htm" scrolling="no" frameborder="1" style="z-index:1001; position:absolute; top:-500px; left:-500px"></iframe>        -->
</body>
</html>