/*
  OBJETO DESTINADO AO CONTROLE DA CAMADA VIEW
  ELA NÃO TRATA TODAS AÇÕES DO VIEW, 
  MAS CHAMA AS FUNÇÕES RESPONSÁVEIS POR CADA AÇÃO
  QUE PROVAVELMENTE ESTARÁ EM OUTROS ARQUIVOS
  NOMEADOS COMO VIEW.ALGUNACOISA.JS
  @filipe
*/

var View = function(){

	this.enviarDados = function(tipo, dados=null,callback){
		/* debuando */
		debug('view.js - view.enviarDados()',tipo, dados);
		/* */

		enviarDados(tipo, dados,callback);
	}

	this.obterDados = function(tipo, dados=null,callback){
		/* debuando */
		debug('view.js - view.obterDados()',tipo, dados);
		/* */

		obterDados(tipo, dados,callback);
	}

	this.err = function (dados, tipo){
		err(dados, tipo);
	}

	this.pagina = function (pagina){
		chamarPagina(pagina);
	}

	this.popup = function (dados, tipo, callback,callback2){
		/* debuando */
		debug('view.js - view.popup()',dados, tipo, callback, callback2);
		/* */
		exibirPopup(dados, tipo, callback,callback2);
	}

}

//INSTANCIA O OBJETO PARA SER USADO POR TODO PROGRAMA
var view = new View;