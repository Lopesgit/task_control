<?
extract($_GET);
if (empty($mes)) {
$mes = date("m");
$ano = date("Y");
}
switch($mes)
{
    case "01" : $mesext = "Janeiro";
    break;
    case "02" : $mesext = "Fevereiro";
    break;
    case "03" : $mesext = "Março";
    break;
    case "04" : $mesext = "Abril";
    break;
    case "05" : $mesext = "Maio";
    break;
    case "06" : $mesext = "Junho";
    break;
    case "07" : $mesext = "Julho";
    break;
    case "08" : $mesext = "Agosto";
    break;
    case "09" : $mesext = "Setembro";
    break;
    case "10" : $mesext = "Outubro";
    break;
    case "11" : $mesext = "Novembro";
    break;
    case "12" : $mesext = "Dezembro";
    break;
}

$next = mktime(0,0,0,$mes + 1,1,$ano);
$nextano = date("Y",$next);
$nextmes = date("m",$next);

$prev = mktime(0,0,0,$mes - 1,1,$ano);
$prevano = date("Y",$prev);
$prevmes = date("m",$prev);

$d = mktime(0,0,0,$mes,1,$ano);
$diaSem = date('w',$d);


?>

