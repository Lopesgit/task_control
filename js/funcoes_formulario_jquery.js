/*
  |-------------------------+-------------------+---------|
  | Data de Criação / Alter | Programador       | SM      |
  |-------------------------+-------------------+---------|
  | 30/06/2011 a 30/06/2011 | Andre Politti     | SM01257 |
  |-------------------------+-------------------+---------|
  |     15/07/2011          | Andre Politti     | SM01381 |
  |-------------------------+-------------------+---------|
  |     24/11/2011          | Antonio | Andre   | SM01409 |
  |-------------------------+-------------------+---------|
  |     10/12/2012          |   Antonio         | SM01751 |
  |-------------------------+-------------------+---------|
  |     30/05/2012          |Andre Politti      | SM01363 |
  |-------------------------+-------------------+---------|
  |     06/02/2013          |Andre Politti      | SM01432 |
  |-------------------------+-------------------+---------|
  |     04/03/2013          |Andre Politti      | SM02621 |
  |-------------------------+-------------------+---------|
  |     17/04/2013          |Andre Politti      | SM01432 |
  |-------------------------+-------------------+---------|
 */

function validaCampos(formulario, alerta){
    // VARIAVEL ALERTA, ADICIONADA PARA EVITAR MENSAGEM DE ALERTA, POR PADRAO ELA VEM HABILITADA PARA ALERTAR
    // ESSE IF, SERVE PARA FAZER O FUNCTION FUNCIONAR PARA PROGRAMAÇÕES MAIS ANTIGAS Q A CRIAÇÃO DESTA VARIAVEL.
    if(alerta == undefined){
        alerta = 1;
    }
    
    var msgErro = '';
    var primeiroElemento = '';
            
    $("#"+$(formulario).attr('id')+" :input").each(function(chave, elemento){
        if($(elemento).attr('title') != '' && $(elemento).attr('title') != undefined){
            /*
             * FAZ COM QUE OS ELEMENTOS A SEREM VERIFICADOS, TENHAM O EVENTO QUE
             * RETIRA A BORDA QUANDO PERDEREM O FOCO.
             */
            $(elemento).blur(function(){
                destacaElemento(elemento, 0);
            });

            var checado = 0;
            
            tipoElemento = $(elemento).attr('type');
            if(tipoElemento == undefined)
                tipoElemento = $(elemento).prop('type');
                
            if((tipoElemento == 'text' || tipoElemento == 'textarea') && ($(elemento).val() == ''))
            {
                checado = 1;
            }else if(tipoElemento == 'select-one' && (($(elemento).find(":selected").val() == undefined) || ($(elemento).find(":selected").val() == '') || ($(elemento).find(":selected").val() == '-666')))
            {
                    checado = 1;
            }
            
            if(checado == 1)
            {
                if(primeiroElemento == ''){
                    primeiroElemento = $(elemento);
                }

                msgErro += '- '+$(elemento).attr('title')+'\n';
                destacaElemento(elemento, 1);
            }else{
                destacaElemento(elemento, 0);
            }
        }
    });
    
    if(msgErro != '' && alerta == 1)
        alert(msgErro);
    
    if(msgErro != '')
    {
        primeiroElemento.focus();
        return false;
    }else{
        return true;
    }
}

function destacaElemento(elemento, destaca){
    if(destaca == 1)
    {
        $(elemento).css('borderStyle', 'solid');
        $(elemento).css('borderWidth', '2px');
        $(elemento).css('borderColor', 'red');
    }else{
        $(elemento).css('borderStyle', '');
        $(elemento).css('borderWidth', '');
        $(elemento).css('borderColor', '');
    }
}