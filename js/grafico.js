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

function montaGrafico(data, programador){
    $.ajax({
        type: "POST",
        data: "acao=grafico&data="+data+"&programador="+programador,
        url: "controler.php",
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