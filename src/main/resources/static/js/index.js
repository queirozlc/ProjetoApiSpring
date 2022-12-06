function salvarUsuario() {
    // Buscando variaveis da tela.
    let id = $("#id").val();
    let nome = $("#nome").val();
    let idade = $("#idade").val();

    $.ajax({
        method: "POST",
        url: "salvaruser",
        data: JSON.stringify({
            id: id,
            nome: nome,
            idade: idade
        }),
        contentType: "application/json; charset=utf-8",
        success: ((response) => {
            $("#id").val(response.id);
        })
    }).fail((xhr, status, errorThrown) => {
        alert("Erro ao salvar usuário: " + xhr.reponseText);
    });
}

function pesquisarUsuario() {
    // Busca variaveis
    let nome = $("#nomeBusca").val();

    if (nome != null && nome.trim() != "") {
        // Ajax
        $.ajax({
            method: "GET",
            url: "buscarpornome",
            data: "nome=" + nome,
            contentType: "application/json; charset=utf-8",
            success: ((response) => {
                // Preencher tabela
                $("#tabelaResultados > tbody > tr").remove();

                for (i = 0; i < response.length; i++) {
                    $("#tabelaResultados > tbody").append(`<tr id=${response[i].id}><td>${response[i].id}</td><td>${response[i].nome}</td><td><button type="button" class="btn btn-outline-primary buttonEditarUsuario" onclick="usuarioEmEdicao(${response[i].id})">Ver Mais</button></td><td><button type="button" class="btn btn-outline-danger buttonDeletarUsuario" onclick="deletarUsuario(${response[i].id})">Excluir</button></td></tr>`);
                }
            })
        }).fail((xhr, status, errorThrown) => {
            alert("Erro ao buscar usuário: " + xhr.reponseText);
        });

    }
}

function usuarioEmEdicao(id) {
    // Ajax
    $.ajax({
        method: "GET",
        url: "buscaruserid",
        data: "idUser=" + id,
        contentType: "application/json; charset=utf-8",
        success: ((response) => {
            // Busca no banco de dados e preenche os campos na tela.
            $("#id").val(response.id);
            $("#nome").val(response.nome);
            $("#idade").val(response.idade);

            // Fecha modal automaticamente
            $("#modalPesquisarUser").modal('hide');
        })
    }).fail((xhr, status, errorThrown) => {
        alert("Erro ao buscar usuário por id: " + xhr.reponseText);
    });
}

function deletarUsuario(id) {

    if (confirm("Deseja realmente deletar esse usuário?")) {
        // Ajax
        $.ajax({
            method: "DELETE",
            url: "delete",
            data: "idUser=" + id,
            success: ((response) => {
                $('#' + id).remove();
                document.querySelector(".msgSuccess").innerHTML = response;
            })
        }).fail((xhr, status, errorThrown) => {
            alert("Erro ao deletar usuário por id: " + xhr.reponseText);
        });
    }

}

function deletarUsuarioTela() {
    let id = $("#id").val();

    if (id != null && id.trim() != "") {
        deletarUsuario(id);
        limparTela();
    } else {
        document.querySelector(".msgSuccess").innerHTML = '';
        document.querySelector(".msgError").innerHTML = 'Não foi informado nenhum id para remoção.';
    }
}

function limparTela() {
    let id = $("#id").val("");
    let nome = $("#nome").val("");
    let idade = $("#idade").val("");
}

// Chamando funções.
document.querySelector(".buttonSalvar").addEventListener("click", salvarUsuario);
document.querySelector(".buttonCadastrarNovo").addEventListener("click", limparTela);
document.querySelector(".buttonBuscarUsuario").addEventListener("click", pesquisarUsuario);
document.querySelector(".buttonDeletarUsuario").addEventListener("click", deletarUsuarioTela);