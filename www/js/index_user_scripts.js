/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    window.setInterval(function (retorno) {
        while($('.on-off').prop('checked')){
            while(!indoAoUsuario){
                server.obter({action:'checando', aberto: true, idUser:user.getId()}, function (retorno) {
                    if(retorno){
                        if(retorno.user){
                            usuario = retorno.user;
                            //POPUP ACEITA O CHAMADO
                            view.popup({
                                titulo:'Aceita o chamado?', 
                                fixo:true,
                                texto:'<h4>'+usuario.nome+'</h4><div>Sexo: '+usuario.sexo+'</div>'+usuario.local+'</div><div>Distancia: 15Km</div><div>Tempo estimado: 25min</div>'
                            },'confirm', ()=>{
                                server.obter({action:'checando', aceitar:true, idUser:user.getId()}, function (retorno) {
                                    if(retorno){
                                        indoAoUsuario = true;
                                        view.pagina('mapa');
                                        criandoRota(usuario.lat,usuario.lng);
                                    }
                                });
                            }), ()=>{
                                server.enviar({action:'checando', recusar:true, idUser:user.getId()}, function (retorno) {
                                    if(retorno){
                                        indoAoUsuario = false;
                                        view.pagina('mapa');
                                        chamarMapa();
                                    }
                                });
                            };
                        }
                    }
                });
            }
            while(indoAoUsuario){
                server.obter({action:'checando', aberto: true, idUser:user.getId()}, function (retorno) {
                    if(!retorno){
                        view.pagina('mapa2');
                        view.popup({
                            titulo:'Chamado cancelado', 
                            texto:'O chamado foi cancelado pelo usuário'
                        },'alert');
                        indoAoUsuario = false;
                        view.pagina('mapa');
                    }
                });
            }
        }
    }, 2000);

    //BOTÃO ON-OFF
    $(document).on("click", ".toggle-group", function(evt)
    {
        $('.on-off').change(function() {
            console.log('On Off: ' + $('.on-off').prop('checked'))
            if($('.on-off').prop('checked')){
                view.enviarDados('onOff',true);
            }else{
                view.enviarDados('onOff',false);
            }
        })
    })

    $(document).on("click", ".voltar", function(evt)
    {
         /*global activate_subpage */
         //window.history.back();
         view.pagina('mapa');
         uib_sb.close_all_sidebars(); 
        return false;
    });
    
        /* button  #btn-menu */
    $(document).on("click", "#btn-menu", function(evt)
    {
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($("#menu1"));  
         return false;
    });
    
        /* button  .btn-config */
    $(document).on("click", ".btn-config", function(evt)
    {
         /*global activate_page */
         view.pagina('config'); 
         //uib_sb.close_all_sidebars(); 
         return false;
    });
    
        /* button  #btn-menu3 */
    $(document).on("click", "#btn-menu3", function(evt)
    {
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($("#menu3"));  
         return false;
    });

    /* Fechar o menu lateral com um click fora*/
    $(document).click(function(e){
        uib_sb.close_all_sidebars();
    });
    
        /* button  #btn-save-config */
    $(document).on("click", "#btn-save-config", function(evt)
    {
         /*global activate_page */
         view.enviarDados('user', 'atualizar');
         //uib_sb.close_all_sidebars(); 
         return false;
    });
    $(document).on("click", "#btn-del-conta", function(evt)
    {
         /*global activate_page */
         view.enviarDados('remover', 'user');
         //uib_sb.close_all_sidebars(); 
         return false;
    });

        /* button  #btnLogin */
    $(document).on("click", "#btnLogin", function(evt)
    {
         /*global activate_page */
         /*user.setId('a11');
         view.enviarDados('login');*/
         //activate_page("#mapa"); 

        facebookConnectPlugin.login(["public_profile"], function (success){
            alert('ID: '+success.authResponse['userID']);
            view.enviarDados('login', success.authResponse.userID);
        }, function (failure){
            alert('failure'+JSON.stringify(failure));
        });
         return false;
    });
    
    /*  CONTROLAR BOTÃO DE VOLTAR DO ANDROID */
    document.addEventListener("backbutton", function(e){
        //alert(e);
        //e.preventDefault();
        uib_sb.close_all_sidebars();
        BootstrapDialog.closeAll();
        if(ajax == "pending"){
            abortEnvio();
        }

        function sairDoApp(){
            BootstrapDialog.show({
                title: '<h3>Tem certeza que deseja sair?</h3>',
                buttons: [{
                    icon: 'glyphicon glyphicon-ban-circle',
                    label: '  Sair',
                    cssClass: 'btn-danger',
                    action: ()=>{navigator.app.exitApp();}
                }, 
                {
                    label: 'Cancelar',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });
        }
        
        switch(paginaAtual){
            case 'login':
                sairDoApp();
            break;
            case 'mapa':
                sairDoApp();
            break;
            case 'cadastro':
                view.pagina('login');
            break;
            case 'config':
                view.pagina('mapa');
            break;
            default:
                sairDoApp();
            break;
        }
    }, false);
    
    /* button  .btn-sair */
    $(document).on("click", ".btn-sair", function(evt)
    {
        /* your code goes here */ 
        //navigator.app.exitApp();
        //facebookConnectPlugin.logout(Function success, Function failure)
         return false;
    });

    $(document).on("click", "#btn-cadastro", function(evt)
    {
        /* your code goes here */ 
        view.enviarDados('user', 'registrar');
         return false;
    });


    $(document).on("click", ".btn-cancelar", function(evt)
    {
        
        return false;
    });

    facebookConnectPlugin.getLoginStatus(function(success){
        view.enviarDados('login', success.authResponse.userID);
    }, function(){
        view.pagina('login');
    });
}

document.addEventListener("app.Ready", register_event_handlers, false);

})();
