// ==============================================================
// BIBLIOTECA DE BOTÕES - REQUISIÇÃO
// Contém: Aprovar, Rejeitar, Confirmar Compra, Concluir Entrega
// ==============================================================

// 1. Função para APROVAR (Status ...001)
function AprovarPedido(primaryControl) {
    executarMudancaStatus(primaryControl, 962500001, null, "✅ Requisição Aprovada com Sucesso!");
}

// 2. Função para REJEITAR (Status ...002)
function RejeitarPedido(primaryControl) {
    // Aqui mandamos uma justificativa obrigatória
    executarMudancaStatus(primaryControl, 962500002, "Rejeitado via Painel Administrativo", "⛔ Requisição Rejeitada.");
}

// 3. Função para PEDIDO REALIZADO (Status ...004)
function ConfirmarCompra(primaryControl) {
    executarMudancaStatus(primaryControl, 962500004, null, "🚚 Status atualizado: Compra Realizada.");
}

// 4. Função para CONCLUIR (Status ...005)
function ConcluirEntrega(primaryControl) {
    executarMudancaStatus(primaryControl, 962500005, null, "📦 Processo Finalizado e Entregue!");
}

// ==============================================================
// FUNÇÃO GENÉRICA (O MOTOR QUE FAZ O TRABALHO PARA TODOS)
// ==============================================================
function executarMudancaStatus(primaryControl, novoStatus, justificativa, mensagemSucesso) {
    var formContext = primaryControl;
    var entityId = formContext.data.entity.getId().replace("{", "").replace("}", "");
    var entityName = formContext.data.entity.getEntityName(); // wsf_requisicao

    var dados = {
        "wsf_status": novoStatus
    };

    // Se tiver justificativa (Rejeição), adiciona. Se não, limpa (null).
    if (justificativa != null) {
        dados["wsf_justificativati"] = justificativa;
    } else {
        dados["wsf_justificativati"] = null; 
    }

    // Chama a WebAPI
    Xrm.Navigation.openAlertDialog({ text: "Processando..." }).then(function() {
        Xrm.WebApi.updateRecord(entityName, entityId, dados).then(
            function success(result) {
                var alertStrings = { text: mensagemSucesso };
                var alertOptions = { height: 120, width: 260 };
                
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                    function () {
                        formContext.data.refresh(false); // Atualiza a tela
                    }
                );
            },
            function (error) {
                Xrm.Navigation.openErrorDialog({ message: error.message });
            }
        );
    });
}