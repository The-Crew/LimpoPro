/*
  OBJETO DESTINADO A COMUNICAÇÃO COM O SERVIDOR
  USADO PARA SOLICITAR E ENVIAR DADOS PARA O SERVIDOR
  @filipe
*/

var Server = function(){
    
    //var servidor = 'http://ip.filipebotelho.com.br:3130';
    var servidor = {};
    servidor.server = 'http://ip.filipebotelho.com.br:3131'
    servidor.i = 0;
    this.enviar = enviar;
    this.obter = obter;
    function enviar(dados, callback, server = servidor.server){
    	/* debuando */
		debug("server.js - server.enviar() - OBJETO ENVIADO", JSON.stringify(dados));
		debug("server.js - server.enviar() - CONECTANDO NO SERVIDOR", server);
		/* */
		servidor.server = server;
    	var retorno;
        ajax = $.ajax({
			type: 'POST',
			//async: false,
			data: JSON.stringify(dados),
			url: server,
			timeout: 10000,
			beforeSend : function(){
				console.log('Aguardando... '+servidor.i);
				if(servidor.i == 0)	$(document.body).append('<div class="aguarde modal-backdrop fade in" style="z-index: 1040;"></div> <div class="aguarde modal bootstrap-dialog type-primary fade size-normal in" data-backdrop="static" role="dialog" aria-hidden="false" tabindex="-1" style="top: 50%; z-index: 1050; display: block; margin-top: -25px;"> <div class="modal-dialog"><div class="modal-content" style="background: none;border: none;box-shadow: none;"><div id="aguarde-body" style="left: 50%; position: relative;"><img src="images/loading.gif"  style="margin-left: -25px; height:50px;"></img><div></div></div></div>');
			},
			success: function(data) {
				retorno = data;
				/* debuando */
				debug("server.js - server.enviar() - DADOS RETORNADO DO SEVIDOR", data);
				/* */
				$('.aguarde').remove();
				servidor.i = 0;
				callback.call(null, data);
			},
			error: function() {
	            
	            if(servidor.i == 0){
	            	servidor.i++;
	            	enviar(dados, callback, 'http://ip.filipebotelho.com.br:3131');
	            }else if(servidor.i == 1){
	            	servidor.i++;
	            	enviar(dados, callback, 'http://192.168.66.101:3131');
		        }else if(servidor.i == 2){
		        	servidor.i++;
		            enviar(dados, callback, 'http://192.168.1.111:3131');		            
		        }else{
		        	servidor.i = 0;
		        	$('.on-off').bootstrapToggle('off')
		        	$('.aguarde').remove();
		            view.popup({cor:'vermelho', titlo:'Erro',texto:'=( \nFalha na comunicação com o servidor!'});
		        }
		    }
		});
        
        return retorno;
    }
    
    function obter(dados, callback, server = servidor.server){
    	/* debuando */
		debug("server.js - server.obter() - OBJETO ENVIADO", JSON.stringify(dados));
		debug("server.js - server.obter() - CONECTANDO NO SERVIDOR", server);
		/* */
		servidor.server = server;
    	var retorno;
    	ajax = $.ajax({
			type: 'POST',
			//async: false,
			data: JSON.stringify(dados),
			url: server,
			timeout: 10000,
			beforeSend : function(){
				console.log('Aguardando... '+servidor.i);
				if(servidor.i == 0)	$(document.body).append('<div class="aguarde modal-backdrop fade in" style="z-index: 1040;"></div> <div class="aguarde modal bootstrap-dialog type-primary fade size-normal in" data-backdrop="static" role="dialog" aria-hidden="false" tabindex="-1" style="top: 50%; z-index: 1050; display: block; margin-top: -25px;"> <div class="modal-dialog"><div class="modal-content" style="background: none;border: none;box-shadow: none;"><div id="aguarde-body" style="left: 50%; position: relative;"><img src="images/loading.gif"  style="margin-left: -25px; height:50px; "></img><div></div></div></div>');
			},
			success: function(data) {
				retorno = data;
				/* debuando */
				debug("server.js - server.enviar() - DADOS RETORNADO DO SEVIDOR", data);
				/* */
				$('.aguarde').remove();
				servidor.i = 0;
				callback.call(null, data);
			},
			error: function() {
	            
	            if(servidor.i == 0){
	            	servidor.i++;
	            	obter(dados, callback, 'http://ip.filipebotelho.com.br:3131');
	            }else if(servidor.i == 1){
	            	servidor.i++;
	            	obter(dados, callback, 'http://192.168.66.101:3131');
		        }else if(servidor.i == 2){
		        	servidor.i++;
		            obter(dados, callback, 'http://192.168.1.111:3131');		            
		        }else{
		        	servidor.i = 0;
		        	$('.on-off').bootstrapToggle('off')
		        	$('.aguarde').remove();
		            view.popup({cor:'vermelho', titlo:'Erro',texto:'=( \nFalha na comunicação com o servidor!'});
		        }
		    }
		});
    	
    	return retorno;
    }
}

//INSTANCIA O OBJETO PARA SER USADO POR TODO PROGRAMA
var server = new Server();