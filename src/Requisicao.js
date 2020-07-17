class Requisicao{

    solicitaRequisicao(url){
        var $container = $('#container');
        var dados = [];
        var veiculo;
        $.ajax({
            url : url,
            type: "get",
            dataType : "json",
            success : function(orders){
            orders.forEach(function(order, i){
                veiculo = new Veiculos();
                veiculo.nome = order.nome;
                veiculo.uf = order.uf;
                veiculo.id = order.id;
                veiculo.placa = order.placa;
                veiculo.cidade = order.cidade;
                veiculo.km_atual = order.km_atual;
                veiculo.historico = order.historico_situacoes;
                veiculo.email_proprietario = order.email_proprietario;
                dados.push(veiculo); JSON.stringify()
                $("#loadingPrincipal").toggle("disable")
                return dados;
            });
            },
            error : function(error){
                console.log(error);
            },
            async: false
        });
        return dados;
    }

    solicitaRequisicaoAlteracao(url, obj){
        $.ajax({
            url : url,
            type: "patch",
            dataType : "json",
            contentType: "application/json",
            data: obj,
            success : function(orders){
                console.log("certinho "+orders)
                renderizaElementos();
            },
            error : function(error){
                console.log(error);
            },
        });
    }
    solicitaRequisicaoNovo(url, obj){
        $.ajax({
            url : url,
            type: "POST",
            dataType : "json",
            contentType: "application/json",
            data: obj,
            success : function(orders){
                console.log("certinho "+orders)
                renderizaElementos();
            },
            error : function(error){
                console.log(error);
            },
        });
    }
    solicitaRequisicaoDeletar(url, obj){
        $.ajax({
            url : url,
            type: "Delete",
            dataType : "json",
            contentType: "application/json",
            data: obj,
            success : function(orders){
                console.log("certinho "+orders)
                renderizaElementos();
            },
            error : function(error){
                console.log(error);
            },
        });
    }
}


 