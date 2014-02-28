/*
|-----------------------+---------------------------+---------|
|  Data de Alteração    |         Programador       |   SM    |
|-----------------------+---------------------------+---------|
| 10/10/2011 17/10/2011 |      Andre Politti        | SM01571 |
|-----------------------+---------------------------+---------|
*/
try
{
// Verifica se o ambiente é de Produção ou de Homologação
var ambiente = window.location.pathname.split('/');
if(ambiente[1] == "homologacao"){
    urlAbsoluto = "/"+ambiente[1]+"/"+ambiente[2]+"/";
}else{
    urlAbsoluto = "/"+ambiente[1]+"/";
}
    
    function GetXmlHttpObject()
    {
        var xmlHttp=null;
        try
        {
            xmlHttp=new XMLHttpRequest();
        }
        catch (e)
        {
            try
            {
                xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e)
            {
                xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    }
    function include(url)
    {
        xmlHttp=GetXmlHttpObject();
        if (xmlHttp==null){
            return;
        }
        xmlHttp.open("GET",url,true); 
        xmlHttp.send(null);
        xmlHttp.onreadystatechange = function()
        {
            if (xmlHttp.readyState==4)
            {
                if (xmlHttp.status==200)
                {
                    eval(xmlHttp.responseText);
                
                    $(document).ready(function(){
//                        $.getScript(urlAbsoluto+'js/loading.js');
                    });
                }
            }
        };
    }
//    include(urlAbsoluto+'js/jquery.js');
}
catch(err)
{
}

// FIM - SM01571


var ie = /msie/i.test(navigator.userAgent);
var ieBox = ie && (document.compatMode == null || document.compatMode == "BackCompat");

function checkSize()
{
    var canvasEl = ieBox ? document.body : document.documentElement;
    var w = window.innerWidth || canvasEl.clientWidth;
    var h = window.innerHeight || canvasEl.clientHeight;

    separaDiv = redimensiona.split(',');

    for (x=0;x<separaDiv.length;x++)
    {
        separaValores = separaDiv[x].split('=');
        for (i=0;i<separaValores.length;i++)
        {
            objeto = separaValores[0];
            tamanho = separaValores[1];

            if (document.getElementById(objeto))
            {
                //				alert('ID:' + document.getElementById(objeto).id);
                //				alert('h:' + h);
                //				alert('max.(0,h-tamanho):' +  Math.max(0, h - tamanho));				
                document.getElementById(objeto).style.height = Math.max(0, h - tamanho) + "px";
            }
        }
    }
}

window.onload = checkSize;
window.onresize = checkSize;