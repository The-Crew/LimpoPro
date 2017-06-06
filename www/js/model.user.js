/*
  OBJETO USER
  AINDA NÃO SEI AO CERTO SE IRÁ USAR UM OBJETO LITERAL
  OU UMA FUNÇÃO CONTRUTORA
  @filipe
*/

//OBJETO LITERAL
/*User = {
    'tipo':'user',
    'nome':'',
    'cpf':'',
    'sexo':'',
    'email':'',
    'fone':'',
};
*/

//FUNÇÃO CONSTRUTORA
function User()
{
  /*
    PARA MANTER OS ATRIBUTOS PRIVADOS NÃO SE COLOCA O THIS A FRENTE
    @filipe
  */
  var id;
  var nome;
  var cpf;
  var sexo;
  var email;
  var fone;
  var status = true;
  var tipo = 'user';

  /*
    PARA TRANSFORMAR UMA FUNÇÃO EM UM MÉTODO PÚBLICO DO OBJETO
    DEVE-SE COLOCAR UM THIS A FRENTE
    @filipe
  */
  this.setId = setId;
  this.setNome = setNome;
  this.setCpf = setCpf;
  this.setSexo = setSexo;
  this.setEmail = setEmail;
  this.setFone = setFone;
  this.setStatus = setStatus;
  this.setJson = setJson;

  this.getId = getId;
  this.getNome = getNome;
  this.getCpf = getCpf;
  this.getSexo = getSexo;
  this.getEmail = getEmail;
  this.getFone = getFone;
  this.getStatus = getStatus;
  this.getTipo = getTipo;
  this.getJson = getJson;

  function setId(_id){
    id = _id;
  }
 function setNome(_nome){
    nome = _nome;
  }
   
 function setCpf(_cpf){
    cpf = _cpf;
  }
   
 function setSexo(_sexo) {
    sexo = _sexo;
  }
   
 function setEmail(_email) {
      email = _email;
  }

 function setFone(_fone) {
      fone = _fone;
  }

 function setStatus(_status) {
      status = _status;
  }

  function setJson(_json){
    id = _json.id;
    nome = _json.nome;
    cpf = _json.cpf;
    sexo = _json.sexo;
    email = _json.email;
    fone = _json.fone;
    status = _json.status;
  }

  function getId(_id){
    return id;
  }

 function getNome(){
    return nome;
  }
   
 function getCpf(){
    return cpf;
  }
   
 function getSexo() {
    return sexo;
  }
   
 function getEmail() {
      return email;
  }

 function getFone() {
      return fone;
  }

 function getStatus() {
      return status;
  }

  function getTipo() {
      return tipo;
  }
  function getJson(callback) {
      console.log('ENTROU NO getJson');
      jsonUser = {};
      jsonUser.id = id;
      jsonUser.nome = nome;
      jsonUser.cpf = cpf;
      jsonUser.sexo = sexo;
      jsonUser.email = email;
      jsonUser.fone = fone;
      jsonUser.status = status;
      jsonUser.tipo = tipo;
      if(callback){
        console.log('ENTROU NO CALLBACK DO getJson');
        callback.call(null, jsonUser);
      }else{
        return jsonUser;
      }
  }
}
user = new User;