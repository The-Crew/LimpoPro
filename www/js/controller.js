/* 
  Habilitar debug no console
  Se quiser o debug no popup, manter debugPopup = true.
  @filipe
 */
var debugConsole = true,
	debugPopup = false;

function debug(frase, dados1="", dados2="", dados3="", dados4=""){
	dados = dados1 != "" ? typeof(dados1) != 'object' ? dados1 : JSON.stringify(dados1) : "";
	dados += dados2 != "" ? typeof(dados2) != 'object' ? ', '+ dados2 : ', '+ JSON.stringify(dados2) : "";
	dados += dados3 != "" ? typeof(dados3) != 'object' ? ', '+ dados3 : ', '+ JSON.stringify(dados3) : "";
	dados += dados4 != "" ? typeof(dados4) != 'object' ? ', '+ dados4 : ', '+ JSON.stringify(dados4) : "";

	if(debug){
		if(debugPopup){
			alert(frase+': '+dados);
   		}else{
			console.log(frase+': '+dados);
		}
	}
}
/* */

/*
  OBJETO RESPONSÁVEL POR CONTROLAR AS SOLICITAÇÕES E O TRAFEGO DE DADOS ENTRE OS MÉTODOS DO APP
  @filipe
*/

var Controller = function (){

    this.verificar = function(dados, tipo){
        /* debuando */
        debug('controller.js - controller.verificar()', dados, tipo);
		/* */
		
		switch(tipo){
			case 'user':
        		if(verificar(dados)!==false){
        			/* debuando */
        			debug('controller.js - controller.verificar()', 'Verificação aprovou');
        			/* */
        			return true;
        		}else{
        			/* debuando */
        			debug('controller.js - controller.verificar()', 'Erro na verificação');
        			/* */
            		return false;
        		}
        	break;
    	}
	}

	/*
	TRATANDO JSON AO REGISTRAR
	ESSE JSON SERÁ ENVIADOR DIRETAMENTE PARA O SERVIDOR
	TODOS ATRIBUTOS QUE O SERVIDOR PRECISE DEVE SER COLOCADO AQUI
	ESSA FOI A MELHOR FORMA DE FAZER PARA TENTAR FACILITAR A COMUNICAÇÃO CLIENTE-SERVIDOR
	O JSON SERÁ PASSADO PARA O server.enviar, NO QUAL IRÁ ENVIAR AO SERVIDOR SEM ALTERAR DADOS
	@filipe
	*/
	this.registrar = function(dados, tipo){
		/* debuando */
        debug('controller.js - controller.registrar()', dados, tipo);
		/* */
		switch(tipo){
			case 'user':
				if(controller.verificar(dados.dados, tipo)){
					json = {};

            		json.action = dados.action == 'atualizar' ? 'atualizar' : 'registrar';
					json.tipo = 'user';
					json.idUser = dados.dados.getId();
					//UMA FORMA PRATICA DE OBTER OS DADOS DO OBJETO
					json.dados = dados.dados.getJson();

					server.enviar(json, function(retorno){
						retorno = JSON.parse(retorno);
						if(retorno){
							user.setJson(retorno);
							if(json.action == 'registrar'){
								//abrir pagina inicial
								view.pagina('mapa');
							}else{
								//ficar na pagina
							}
						}else{
							/* debuando */
							debug('controller.js - controller.registrar() - Dados retornado pelo server',retorno);
							/* */
							view.err('Falha ao registrar');
						}
					});
					
				}else{
					//view.err(dados.dados);
				}
			break;
			case 'remover':
				if(dados.tipo == 'user'){
					var popup = {};
					popup.perigo = true;
					popup.titulo = 'Tem certeza que deseja remover sua conta?';
					popup.texto = 'Essa operação não terá mais retorno';
					view.popup(popup, 'confirm', function(retorno){
						if(retorno){
							var json = {};
							json.idUser = dados.idUser;
							json.action = 'remover';
							json.tipo = 'user';
							server.enviar(json, function(retorno){
								console.log(retorno);
								view.pagina('login');
							});
						}else{}
					})
					
				}
			break;
			case 'onOff':
				dados.idUser = user.getId();
				/*server.enviar(dados, function(retorno){
					if(retorno){
						retorno = JSON.parse(retorno);
						if(retorno.estado){
							//$('.on-off').bootstrapToggle('on')
						}else{
							//$('.on-off').bootstrapToggle('off')
						}
					}else{
						$('#on-off').bootstrapToggle('toggle')
					}
				});*/
			break;
		}
	}
	this.solicitar = function(dados, tipo, callback){
		/* debuando */
        debug('controller.js - controller.solicitar()', dados, tipo);
		/* */

		switch(tipo){
			case 'user':
				/*	SOLICITAR DADOS DO USUARIO AO SERVIDOR.
					OS DADOS SERÃO RETORNADOS COM TODAS INFORMAÇÕES DO USUARIO
					@filipe
				*/
				if(dados.action == 'login'){
					user.setId(dados.idUser);
					server.obter(dados, function(retorno){
						if(retorno != 'false'){
							// CONVERTER EM OBJETO
							retorno = JSON.parse(retorno);
							//UMA FORMA PRATICA DE SETAR OS DADOS NO OBJETO
							user.setJson(retorno);

							/* DEPOIS TENTAR IMPRIMIR O NOME DO USUARIO NO MENU */
							$("#nome-user").html(ser.getNome());
							view.pagina('mapa');
						}else{
							/* debuando */
							debug('controller.js - controller.solicitar() - Dados retornado pelo server',retorno);
							/* */
							view.pagina('cadastro');
						}
					});
				}
			break;
		}
	}
}

//INSTANCIA O OBJETO PARA SER USADO POR TODO PROGRAMA
var controller = new Controller;