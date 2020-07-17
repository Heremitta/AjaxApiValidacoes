
class Veiculos {
    
    constructor(){
        this.requisicao  = new Requisicao();
    }

    renderVeiculos(){
        let veiculo =[];
        veiculo = this.requisicao.solicitaRequisicao(URL_REQUISICAO_VEICULOS);
        return veiculo;
    }

    pesquisaVeiculos(arrayPesquisa){
        let veiculo = this.requisicao.solicitaRequisicao(URL_REQUISICAO_VEICULOS+"?"+arrayPesquisa.join("&"));
        return veiculo;
    }

    buscaCidade(idCidade) {
        let city = new Cidade(idCidade);
        return city.render();
    }

    validaPlaca(placa){
        // ** inplementado apenas se a placa é valida ou não, porém poderia também dizer que tipo de placa é 
        // var resposta = "placa inválida";
        var resposta = 0;
        if(regexPlaca.test(placa)){
            // resposta = "Placa válida no formato atual brasileiro";
            resposta = 1;
        }
        if(regexPlacaMercosulCarro.test(placa)){
            // resposta = "Placa válida (padrão Mercosul - carro)";
            resposta = 2;
        }
        if(regexPlacaMercosulMoto.test(placa)){
            // resposta = "Placa válida (padrão Mercosul - moto)";
            resposta = 3;
        }
        return resposta;
    }
    
    validacaoEmail(field) {
        var usuario = field.value.substring(0, field.value.indexOf("@"));
        var dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
        if ((usuario.length >=1) &&
            (dominio.length >=3) && 
            (usuario.search("@")==-1) && 
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) && 
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&      
            (dominio.indexOf(".") >=1)&& 
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            return true
        }
        else{
            return false
        }
    }
}