function limparCampos(limparCep) {
  // LIMPA OS CAMPOS 
  if(limparCep){
    document.getElementById('cep').value = '';
  }
    
  document.getElementById('Complemento').value = '';
  document.getElementById('Logradouro').value = '';
  document.getElementById('Bairro').value = '';
  document.getElementById('Complemento').value = '';
  document.getElementById('Cidade').value = '';
  document.getElementById('Estado').value = '';

}

function buscarCEP() {
    let input = document.getElementById('cep').value;

    // IMPEDE O ENVIO DO FORMULÁRIO E A RECARGA DA PÁGINA 
    document.getElementById('form').addEventListener('submit', function(event) {
      event.preventDefault();
    });
   
    const letrasDigitadas = /[a-zA-Z]/.test(input);

    if (letrasDigitadas) {
        alert("Por favor, não digite letras.");
        limparCampos(false);

        return;
    }
    
    const cepQuantidade = document.getElementById('cep').value.replace(/\D/g, ''); // PEGA O VALOR DO CAMPO DE CEP, REMOVENDO QUALQUER CARACTERE NÃO NUMÉRICO 
  
    // VERIFICA A QUANTIDADE DE NÚMEROS 
    const quantidadeCorreta = 8; // QUANTIDADE CORRETA DE DÍGITOS PARA O CEP,SEM TRAÇO
      
    if (cepQuantidade.length !== quantidadeCorreta) {
        alert('A quantidade de dígitos está errada.');
        limparCampos(false);

        return;
    } 

    const ajax = new XMLHttpRequest();
    ajax.open('GET', 'https://viacep.com.br/ws/' + input + '/json/');
    ajax.send();
    ajax.onload = function () {

        console.log(ajax.status);
        console.log(this.responseText);

        //TRANSFORMEI O TEXTO EM OBJETO
        let obj = JSON.parse(this.responseText);

        if (obj.erro) {
            alert('não foi encontrado');
            return;
        }

        //AQUI PEGUEI OS VALORES QUE EU QUERIA
        let logradouro = obj.logradouro;
        let bairro = obj.bairro;
        let cidade = obj.localidade;
        let complemento = obj.complemento;
        let estado = obj.uf;

        document.getElementById('Logradouro').value = logradouro;
        document.getElementById('Bairro').value = bairro;
        document.getElementById('Complemento').value = complemento;
        document.getElementById('Cidade').value = cidade;
        document.getElementById('Estado').value = estado;
         
    }
}
