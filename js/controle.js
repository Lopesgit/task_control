/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
          duration: 300
      },
      hide: {
          effect: "explode",
          duration: 300
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
          duration: 300
      },
      hide: {
          effect: "explode",
          duration: 300
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
          url: "controler.php",
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
          url: "controler.php",
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

function carregaCorpo(){
    $.ajax({
          type: "POST",
          data: "acao=carregaCorpo&"+$("#formulario").serialize(),
          url: "controler.php",
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
                  url: "controler.php",
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
                  url: "controler.php",
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
                  url: "controler.php",
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


