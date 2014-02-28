<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
header ('Content-type: text/html; charset=UTF-8'); 
include '/include/bd_controle.inc';
include 'include/funcoes_controle.php';

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
                            <input type=\"button\" name=\"alterar\" id=\"alterar\" style=\"width:40px\" value=\"Alterar\" class=\"botao3\" onClick=\"carregaModalAlt('{$linha['ID_CONTROLE']}', '{$linha['SM']}');\">
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
                            <input type=\"button\" name=\"alterar_modal\" id=\"alterar_modal\" style=\"width:40px\" value=\"Alterar\" class=\"botao3\" onClick=\"carregaModalAlt('{$linha['ID_CONTROLE']}', '{$linha['SM']}'); fechaModal();\">
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

