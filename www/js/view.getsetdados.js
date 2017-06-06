/*
  FUNÇÃO RESPONSÁVEL PARA OBTER OS DADOS DO APP, TANTO O QUE O USUARIO DIGITOU,
  QUANTO QUALQUER OUTRO DADO, COMO POR EXEMPLO OS DE LOGIN.
  @filipe
*/

var enviarDados = function(tipo, dados=null, callback){
    
    switch(tipo){
        case 'user':
            /* debuando */
            debug('view.getsetdados.js - enviarDados()', tipo, dados);
            /* */
            if(dados == 'registrar'){
                //user.setId($("#id").val());
                user.setNome($("#nome").val());
                user.setCpf($("#cpf").val());
                user.setSexo($("#sexo").val());
                user.setEmail($("#email").val());
                user.setFone($("#fone").val());
            }else if('atualizar'){
                //user.setId($("#aid").val());
                user.setNome($("#anome").val());
                user.setCpf($("#acpf").val());
                user.setSexo($("#asexo").val());
                user.setEmail($("#aemail").val());
                user.setFone($("#afone").val());
            }
            json = {};
            json.dados = user;
            json.action = dados == 'atualizar' ? 'atualizar' : 'registrar';
            
            controller.registrar(json, 'user'); 
        break;
            
        case 'login':
        /* debuando */
            debug('view.getsetdados.js - enviarDados()', tipo, dados);
            /* */
        /*Esses códigos foram apenas para teste. 
          Pode ser alterado conforme a implementação do projeto.
          Favor informar caso seja teste.
        */
            controller.solicitar({action:'login', idUser:dados},'user');
        break;
        case 'remover':
            if(dados == 'user'){
                json = {tipo:'user', idUser:user.getId()};
                controller.registrar(json, 'remover');
            }
        break;
        case 'onOff':
            if(dados){
                console.log('true'+dados)
                dados = {};
                dados.action = 'onOff';
                dados.estado = true;
                controller.registrar(dados,'onOff');
            }else{
                console.log('false'+dados)
                dados = {};
                dados.action = 'onOff';
                dados.estado = false;
                controller.registrar(dados,'onOff');
            }
        break;
    }
};

/*
OBTER DADOS EM DESENVOLVIMENTO
@filipe
*/
var obterDados = function(dados, tipo, callback){
/*Esses códigos foram apenas para teste. 
Pode ser alterado conforme a implementação do projeto.
Favor informar caso seja teste.
*/
    switch(tipo){
        case 'user':
            /* debuando */
            debug('view.getsetdados.js - obterDados()', dados, tipo);
            /* */
            if(dados == 'nome'){
                return user.getNome();
            }
            else if(dados == 'cpf') return user.getCpf();
            else if(dados == 'email') return user.getEmail();
            else if(dados == 'fone') return user.getFone();
        break;
        case 'todos':
            /*Esses códigos foram apenas para teste. 
            Pode ser alterado conforme a implementação do projeto.
            Favor informar caso seja teste.*/
            $('#id').attr('value', user.getId());
            console.log(user.getNome());
            $('#nome').attr('value', user.getNome());
            $('#cpf').attr('value', user.getCpf());
            $('#sexo').attr('value', user.getSexo());
            $('#email').attr('value', user.getEmail());
            $('#nome').attr('value', user.getNome());
            $('#fone').attr('value', user.getFone());
        break;
    }

}