/*
  FUNÇÃO RESPONSÁVEL POR EXIBIR PÁGINAS E POPUPS AO USUARIO
  @filipe
*/
var paginaAtual;
function chamarPagina (page){
	/*
	  DE ALGUMA FORMA ESSA FUNÇÃO TEM QUE TROCAR A PÁGINA DO USUARIO
	  @filipe
	*/
	/* debuando */
	debug('view.pagina.js - chamarPagina()', page);
	/* */
    paginaAtual = page;
	uib_sb.close_all_sidebars();
	switch(page){
		case 'login':
			activate_page('#mainpage');
		break;
		case 'mapa':
			activate_page('#mapa');
		break;
		case 'cadastro':
			activate_page('#cadastro');
		break;
		case 'config':
			$('#anome').attr("value", user.getNome());
			$('#acpf').attr("value", user.getCpf());
			$('#asexo').attr("value", user.getSexo());
			$('#aemail').attr("value", user.getEmail());
			$('#afone').attr("value", user.getFone());
			activate_page('#config');
		break;
		case 'aguardando':
			activate_page('#aguardando');
		break;
	}
	
}

function exibirPopup (dados, tipo = 'alert', callback,callback2){
	/*
	  DE ALGUMA FORMA ESSA FUNÇÃO TEM QUE EXIBIR UM POPUP AO USUARIO
	  @filipe
	*/
	/* debuando */
	debug('view.pagina.js - exibirPopup()', JSON.stringify(dados), tipo, callback,callback2);
	/* */
	if(tipo == 'alert' || tipo == null){
		dados.fixo = dados.fixo == true ? false : true;
		var dialog = new BootstrapDialog({
            title: dados.titulo,
            message: dados.texto,
            closable: dados.fixo
        });
        dialog.realize();
        dialog.getModalHeader().css('font-size', '16px');
        dialog.getModalHeader().css('font-weight', 'bold');
        dialog.getModalBody().css('font-size', '12px');
        if(typeof(dados.titulo) == "undefined"){
        	dialog.setTitle('');
        	dialog.getModalHeader().css('background-color', '#337ab7');
        	dialog.getModalHeader().css('heigth', '5px');
        }
        if(dados.cor == 'vermelho'){
	        dialog.getModalHeader().css('background-color', '#e00000');
	        dialog.getModalHeader().css('color', '#fff');
	    }else if(dados.cor =='azul'){
	    	dialog.getModalHeader().css('background-color', '#337ab7');
	    	dialog.getModalHeader().css('color', '#fff');
	    }else if(dados.cor =='branco'){
	    	
	    }else{
	    	dialog.getModalHeader().css('background-color', '#d8d8d8');
	    }
        dialog.open();
	}else if(tipo == 'confirm'){
		dados.fixo = dados.fixo == true ? false : true;
		var dialog = new BootstrapDialog({
			title: dados.titulo,
            message: dados.texto,
            closable: dados.fixo,
            buttons: [{
                icon: dados.perigo ? 'glyphicon glyphicon-ban-circle' : '',
                label: '  Confirmar',
                cssClass: dados.perigo ? 'btn-danger' : 'btn-primary',
                action: (dialogItself)=>{ 
                	dialogItself.close(); 
                	if(callback){
                		callback.call(null,true);
                	}
                }
            }, 
            {
                label: 'Cancelar',
                action: function(dialogItself){
                    dialogItself.close();
                    if(callback2){
                		callback2.call(null,true);
                	}
                }
            }]
		})
		dialog.realize();
		dialog.getModalHeader().css('font-size', '16px');
		dialog.getModalHeader().css('font-weight', 'bold');
		dialog.getModalBody().css('font-size', '12px');
		if(dados.perigo){
			dialog.getModalHeader().css('background-color', '#e00000');
			dialog.getModalHeader().css('color', '#fff');
		}
		dialog.open();
	}
}