class Cidade{
    constructor(idCidade){
        this.idCidade = idCidade;
        this.requisicao = new Requisicao();
    }

    render(){
        return this.requisicao.solicitaRequisicao(URL_REQUISICAO_CIDADES+"?q="+this.idCidade);
    }
    todasCidades(){
        return this.requisicao.solicitaRequisicao(URL_REQUISICAO_CIDADES);
    }
}