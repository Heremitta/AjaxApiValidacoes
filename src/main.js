$(document).ready(function(){
    renderizaElementos();

    var btnNovoCadastro = document.querySelector('#btnNovoCadastro')
    var novoCadastro = document.querySelector('#novoCadastro')

    //evento de click
    document.addEventListener('click', e =>{
        lista = e.target.parentNode; //pegando o elemento pai do objeto target do evento
        list = lista.parentNode; // pegando o elemento avô do elemento target

        //condição se o click ter como target o buttom 'Alterar' ou o buttom 'Cancelar'
        if(e.target.classList.contains("alterar-veiculo") || e.target.classList.contains("cancelar")){
            botaoExcluir = lista.getElementsByClassName('deletar');
            botaoExcluir[0].classList.toggle('disable') // deixa display none o botão excluir
            if(e.target.classList.contains("alterar-veiculo")){ // verifica qual das 2 condições anteriores
                botaoAlterar = lista.getElementsByClassName('alterar-veiculo')[0];
            }else{
                botaoAlterar = lista.getElementsByClassName('cancelar')[0];
            }
            
            botaoAlterar.classList.toggle("cancelar");
            //verifica se ja foi adicionado o botão se submit
            if(!lista.lastChild.classList.contains('submit')){
                botaoAlterar.innerHTML = "Cancelar"; // troca a string do botão de alterar para cancelar
                botaoAlterar.classList.toggle("alterar-veiculo"); // retira a classe de alterar-veiculo do botao 
                botaoEnviar = document.createElement('INPUT'); // cria novo elemento input
                botaoEnviar.setAttribute("type", "submit") // seta o botao como tipo submit
                botaoEnviar.classList.add("submit"); // adiciona classe cubmit no novo botao
                botaoEnviar.classList.add("btn-primary"); // adiciona classe cubmit no novo botao
                lista.append(botaoEnviar); // adiciona o botão ao fim do pai botão que foi clicado
                
                //lista todos os filhos da div que avô do botão clicado
                for(i=0;i<list.children.length-1;i++){
                    //verifica se esses filhos contem a classe que coloquei nos inputs que poderiam ser editaveis
                    if(list.children[i].children[1].classList.contains('inputDisable')){
                        list.children[i].children[1].disabled = false; // possibilita a edição no input
                    }
                }
            }else{ // se ja contém o botão de submit
                botaoAlterar.innerHTML = "Alterar";
                    if(e.target.parentNode.lastChild.classList.contains('submit')){
                        e.target.parentNode.lastChild.remove()
                    
                    }//botão clicado recebe 'Alterar' como texto
                    // e.target.firstChild.innerHTML = "Alterar";
                    botaoAlterar.classList.toggle("alterar-veiculo");
                //lista todos os filhos da div que avô do botão clicado
                    for(i=0;i<list.children.length-1;i++){
                        //verifica se esses filhos contem a classe que coloquei nos inputs que poderiam ser editaveis
                        if(list.children[i].children[1].classList.contains('inputDisable')){
                            list.children[i].children[1].disabled = true; // impossibilita a edição no input
                        }
                    }
                }
        }

        if(e.target.classList.contains('submit')){ // se o alvo do click for no botão submit 
            idVeiculo = e.target.parentNode.getElementsByClassName('idveiculo');
            idVeiculo =idVeiculo[0].getAttribute('idVeiculo');
            placa = e.target.parentNode.parentNode.children[0].children[1].value;
            cidade = e.target.parentNode.parentNode.children[1].children[1].value;
            kmAtual = e.target.parentNode.parentNode.children[3].children[1].value;
            kmAtual = parseInt(kmAtual)
            emailProprietario = e.target.parentNode.parentNode.children[4].children[1].value;
            
            vec = new Veiculos();
            validaPlaca = vec.validaPlaca(placa);
            if(validaPlaca){
                e.target.parentNode.parentNode.children[0].children[1].classList.remove("incorreto")
            }else{
                e.target.parentNode.parentNode.children[0].children[1].classList.add("incorreto")
                return
            }
            if(cidade){
                city = new Cidade(cidade);
                respostaCidade = city.render();
                e.target.parentNode.parentNode.children[1].children[1].classList.remove("incorreto")
            }else{
                e.target.parentNode.parentNode.children[1].children[1].classList.add("incorreto")
                return
            }
            if(Number.isInteger(kmAtual) && kmAtual >=0){
                e.target.parentNode.parentNode.children[3].children[1].classList.remove("incorreto")
            }else{
                e.target.parentNode.parentNode.children[3].children[1].classList.add("incorreto")
                return
            }
            validaEmail = vec.validacaoEmail    (e.target.parentNode.parentNode.children[4].children[1]);
            if(validaEmail){
                e.target.parentNode.parentNode.children[4].children[1].classList.remove("incorreto");
            }else{
                e.target.parentNode.parentNode.children[4].children[1].classList.add("incorreto");
                return
            }
            json = {
                id: idVeiculo,
                placa: placa,
                cidade: cidade,
                km_atual: kmAtual,
                email_proprietario: emailProprietario,
            }
            requisicao = new Requisicao();
            url = URL_REQUISICAO_VEICULOS +"/"+json.id;
            requisicao.solicitaRequisicaoAlteracao(url, JSON.stringify(json));
            e.target.parentNode.parentNode.lastChild.classList.toggle("disable");
        }
        if(e.target.classList.contains('deletar')){
            e.target.parentNode.parentNode.lastChild.classList.toggle("disable")
            idVeiculo = e.target.parentNode.getElementsByClassName('idveiculo');
            idVeiculo =idVeiculo[0].getAttribute('idVeiculo');

            json = {
                id: idVeiculo
            }
            requisicao = new Requisicao();
            url = URL_REQUISICAO_VEICULOS +"/"+json.id
            requisicao.solicitaRequisicaoDeletar(url, JSON.stringify(json))
        }
        if(e.target == btnNovoCadastro){
            novoCadastro.classList.toggle('show');
            loading = document.querySelector("#loadingNovo");
            if(!loading.classList.contains("diseble")){
                loading.classList.add('disable')
            }

        }
        if(e.target.id == "novoCadastroEnviar"){
           
            idVeiculo =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            placa = document.getElementById('novoPlaca');
            cidade = document.getElementById('novoCidade').value;
            kmAtual = document.getElementById('novoKmAtual');
            kmAtualInt = kmAtual.value
            kmAtualInt = parseInt(kmAtualInt)
            emailProprietario = document.getElementById('novoEmailProprietario');
            vec = new Veiculos();
            validaPlaca = vec.validaPlaca(placa.value);
            if(validaPlaca){
                placa.classList.remove("incorreto")
            }else{
                placa.classList.add("incorreto")
                return
            }
            if(cidade){
                city = new Cidade(cidade);
                respostaCidade = city.render();
                document.getElementById('novoCidade').classList.remove("incorreto")
            }else{
                document.getElementById('novoCidade').classList.add("incorreto")
                return
            }
            if(Number.isInteger(kmAtualInt) && kmAtualInt >=0){
                kmAtual.classList.remove("incorreto")
            }else{
                kmAtual.classList.add("incorreto")
                return
            }
            validaEmail = vec.validacaoEmail(emailProprietario);
            if(validaEmail){
                emailProprietario.classList.remove("incorreto");
            }else{
                emailProprietario.classList.add("incorreto");
                return
            }
            json = {
                "id": idVeiculo,
                "placa": placa.value,
                "cidade": respostaCidade[0].id,
                "km_atual": kmAtual.value,
                "email_proprietario": emailProprietario.value,
            }
            requisicao = new Requisicao();
            url = URL_REQUISICAO_VEICULOS
            requisicao.solicitaRequisicaoNovo(url, JSON.stringify(json))
            e.target.parentNode.children[1].classList.toggle("disable")
        }
    })  
});

