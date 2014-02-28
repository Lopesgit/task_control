<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function retornaTipo($codigo){
    switch($codigo):
        case '1': return 'MANUTENÃÇÃO';
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


