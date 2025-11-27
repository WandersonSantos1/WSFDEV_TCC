function RejeitarPedido(primaryControl) {
    // 1. Pega o contexto da tela
    var formContext = primaryControl;
    
    // 2. Pega o ID do registro que está na tela
    var entityId = formContext.data.entity.getId().replace("{", "").replace("}", "");
    var entityName = formContext.data.entity.getEntityName(); // wsf_requisicao

    // 3. Prepara os dados para atualizar
    var dados = {
        "wsf_status": 962500002, // O TEU NÚMERO DE REJEITADO
        "wsf_justificativati": "EXPLICAÇÃO"
    };

    // 4. Manda para o servidor (WebAPI)
    Xrm.WebApi.updateRecord(entityName, entityId, dados).then(
        function success(result) {
            // Sucesso! Avisa e atualiza a tela
            var alertStrings = { text: "Requisição Rejeitada com Sucesso!" };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
                function () {
                    // Recarrega a tela para mostrar o novo status
                    formContext.data.refresh(false);
                }
            );
        },
        function (error) {
            // Erro! Mostra o que aconteceu
            Xrm.Navigation.openErrorDialog({ message: error.message });
        }
    );
}