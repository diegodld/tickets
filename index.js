var dados = [];

function PopulaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#TblDados tbody").html("");

        dados.forEach(function(item) {
            $("#TblDados tbody").append(`<tr>
        <td>${item.ID}</td>
        <td>${item.Cliente}</td>
        <td>${item.Titulo}</td>
        <td>${item.Descricao}</td>
        <td>${item.Data}</td>
        <td>${item.Tecnico}</td>
        </tr>`);
        });
    }
}

$(function() {
    dados = JSON.parse(localStorage.getItem("__dados__"));
    if (dados) {
        PopulaTabela();
    }
    $("#btnSalvar").on("click", function() {
        //Salvar

        let Cliente = $("#txtCliente").val()
        let Titulo = $("#txtTitulo").val()
        let Descricao = $("#txtdescricao").val()
        let Data = new Date($("#txtdata").val().toLocaleString("pt-br", { timeZone: "UTC" }))
        let Tecnico = $("#txttecnico").val()

        let ticket = {}
        ticket.Cliente = Cliente
        ticket.Titulo = Titulo
        ticket.Descricao = Descricao
        ticket.Data = Data
        ticket.Tecnico = Tecnico
        ticket.ID = dados.lenght + 1

        dados.push(ticket)

        alert("Ticket cadastrado com sucesso!")
        $("#modalRegistro").modal("hide")

        $("#txtCliente").val("")
        $("#txtTitulo").val("")
        $("#txtdescricao").val("")
            ("#txtdata").val("")

        $("#txttecnico").val("")

        PopulaTabela();
    });


});