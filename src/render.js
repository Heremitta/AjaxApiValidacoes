
function renderizaElementos(){
    
    document.querySelector("#novoCadastro").classList.remove("show")
    // loading = document.querySelector(".loading").classList.toggle("disable")
    allNewINPUT = document.querySelectorAll("INPUT");
    allNewINPUT.forEach(e=>{
        e.value = ""
    })
        var veiculos = new Veiculos();
        var ve = veiculos.renderVeiculos();
        var $scontainer = $("#lista")
        $scontainer[0].parentNode.removeChild($scontainer[0])
        $container = document.createElement('div')

        $container.setAttribute('id','lista')
        document.querySelector("#container").append($container)
        ve.forEach(element => {
        var cidadeid = new Cidade(element.cidade);
        var cidade = cidadeid.render();
        if(cidade[0] != undefined){
            element.cidade = cidade[0].nome; 
            element.uf = cidade[0].uf
        }

        var ul = document.createElement('div');
        $container.append(ul);
        ul.classList.add("veiculos");
        ul.classList.add("input-group");

        var labelPlaca = document.createElement('label');
        labelPlaca.setAttribute("for","placa")
        labelPlaca.innerText = "Placa"
        var placaInput = document.createElement('INPUT');
        var divplaca = document.createElement('div');
        placaInput.value = element.placa;
        placaInput.setAttribute("name", "placa")
        placaInput.classList.add("placa")
        placaInput.classList.add("form-control")
        placaInput.classList.add("inputDisable")
        placaInput.classList.add("input")
        placaInput.disabled = true;
        divplaca.append(labelPlaca);
        divplaca.append(placaInput);
        ul.append(divplaca);

        var labelCidade = document.createElement('label');
        labelCidade.setAttribute("for","cidade")
        labelCidade.innerText = "Cidade"
        var cidadeInput = document.createElement('INPUT');
        var divcidade = document.createElement('div');
        divcidade.classList.add("autocomplete")
        cidadeInput.setAttribute("autocomplete","nope")
        cidadeInput.value = element.cidade;
        cidadeInput.disabled = true;
        cidadeInput.classList.add("form-control");
        cidadeInput.classList.add("input")
        cidadeInput.classList.add("cidade")
        cidadeInput.classList.add("inputDisable")
        divcidade.append(labelCidade);
        divcidade.append(cidadeInput);
        ul.append(divcidade);

        var labelUf = document.createElement('label');
        labelUf.setAttribute("for","uf")
        labelUf.innerText = "Estado"
        var ufInput = document.createElement('INPUT');
        ufInput.setAttribute('name','uf')
        var divuf = document.createElement('div');
        ufInput.value = element.uf;
        ufInput.classList.add("form-control");
        ufInput.classList.add("input");
        ufInput.classList.add("uf");
        ufInput.disabled = true;
        divuf.append(labelUf);
        divuf.append(ufInput);
        ul.append(divuf);

        var labelKmAtual = document.createElement('label');
        labelKmAtual.setAttribute("for","kmAtual")
        labelKmAtual.innerText = "Km atual"
        var kmAtualInput = document.createElement('INPUT');
        var divKmatual = document.createElement('div');
        kmAtualInput.setAttribute('name','kmAtual')
        kmAtualInput.value = element.km_atual;
        kmAtualInput.disabled = true;
        kmAtualInput.classList.add('inputDisable');
        kmAtualInput.classList.add("form-control");
        kmAtualInput.classList.add("input");
        kmAtualInput.classList.add("uf");
        divKmatual.append(labelKmAtual);
        divKmatual.append(kmAtualInput);
        ul.append(divKmatual);
        
        var labelemail = document.createElement('label');
        labelemail.setAttribute("for","email")
        labelemail.innerText = "Email proprietario"
        var emailProprietarioInput = document.createElement('INPUT');
        var divEmail = document.createElement('div');
        emailProprietarioInput.setAttribute('name', "email")
        emailProprietarioInput.value = element.email_proprietario;
        emailProprietarioInput.disabled = true;
        emailProprietarioInput.classList.add('inputDisable');
        emailProprietarioInput.classList.add('input');
        emailProprietarioInput.classList.add('email');
        emailProprietarioInput.classList.add('form-control');
        divEmail.append(labelemail)
        divEmail.append(emailProprietarioInput)
        ul.append(divEmail);

        var labelHistorico = document.createElement('label');
        labelHistorico.innerText = "Histórico"
        var historicoVeiculo = document.createElement('TEXTAREA');
        var divHistorico = document.createElement('div');
        divHistorico.append(labelHistorico)
        if(element.hitorico != null){
            historicoVeiculo.value = element.hitorico;
        }else{
            historicoVeiculo.value = "Veiculo sem histórico!";
        }
        historicoVeiculo.disabled = true;
        historicoVeiculo.classList = ('input  ');
        historicoVeiculo.classList = (' historico ');
        historicoVeiculo.classList = ('input-group-text');
        divHistorico.append(historicoVeiculo);
        ul.append(divHistorico);

        novaDiv = document.createElement("div")
        ul.append(novaDiv)
        var buttomNovo = document.createElement('button');
        var buttomDelete = document.createElement('button');
        buttomDelete.append("Deletar")
        buttomDelete.classList.add('deletar')
        buttomDelete.classList.add('btn-danger')
        buttomDelete.setAttribute("idveiculo",element.id)
        buttomNovo.append('Alterar')
        buttomNovo.classList.add('alterar-veiculo')
        buttomNovo.classList.add('btn-warning')
        buttomNovo.classList.add('idveiculo');
        buttomNovo.setAttribute("idveiculo",element.id)
        novaDiv.append(buttomNovo)
        novaDiv.append(buttomDelete)

        divLoading = document.createElement('div');
        divLoading.classList = "spinner-border text-primary loadingCards disable";
        divLoading.setAttribute("role","status")
        spanLoading = document.createElement('span');
        spanLoading.classList.add('sr-only')
        spanLoading.append("Loading...")
        divLoading.append(spanLoading);
        novaImg = document.createElement("img");
        novaImg.src = "img/loading.gif";
        novaImg.classList.add("loading")
        novaImg.classList.add("disable")
        ul.append(divLoading)
    })

       // autocomplete nos inputs com classe cidade
       cidade = new Cidade();
       todasCidades = cidade.todasCidades(); //recebe um array de objetos cidade com nome e id
       todasCidadesArray = []; // array contendo as cidades
       todasCidades.forEach(e=>{
           todasCidadesArray.push(e.nome)
       })
       $(".cidade").each(function(){
           autocomplete($(this)[0],todasCidadesArray); // função de autocomplete (input que terá autocomplete, array que contém as palavras de auto complete *nesse caso* cidades)
       })

       $("#loadingPrincipal").addClass("disable")
}