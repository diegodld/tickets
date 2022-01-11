var dados = [];

function apagar(id) {
  let _confirm = confirm("Tem certeza que deseja Excluir este Ticket?");

  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        dados.splice(i, 1);
      }
    }
    PopulaTabela();
  }
}

function edit(id) {
  $("#ModalRegistro").modal("show");

  dados.forEach(function (item) {
    if (item.ID == id) {
      $("#hdID").val(item.ID);
      $("#txtCliente").val(item.Cliente);
      $("txtTitulo").val(item.Titulo);
      $("#txtdescricao").val(item.Descricao);
      $("#txtdata").val(
        item.Data.substr(6, 4) +
          "-" +
          item.Data.substr(3, 2) +
          "-" +
          item.Data.substr(0, 2)
      );
      $("#txttecnico").val(item.Tecnico);
    }
  });
}

function PopulaTabela() {
  if (Array.isArray(dados)) {
    localStorage.setItem("__dados__", JSON.stringify(dados));

    $("#TblDados tbody").html("");

    dados.forEach(function (item) {
      $("#TblDados tbody").append(`<tr>
        <td>${item.ID}</td>
        <td>${item.Cliente}</td>
        <td>${item.Titulo}</td>
        <td>${item.Descricao}</td>
        <td>${item.Data}</td>
        <td>${item.Tecnico}</td>
        <td> <button type="button" class="btn btn-primary" onclick="javascript:edit(${item.ID});"><i class="fa fa-edit"></i></button></td>
        <td> <button type="button" class="btn btn-danger" onclick="javascript:apagar(${item.ID});"><i class="fa fa-trash"></i></button></td>
        </tr>`);
    });
  }
}

$(function () {
  dados = JSON.parse(localStorage.getItem("__dados__"));

  if (dados != null) {
    PopulaTabela();
  } else {
    dados = [];
  }
  $("#btnSalvar").on("click", function () {
    //Salvar
    let _id = $("#hdID").val();
    let Cliente = $("#txtCliente").val();
    let Titulo = $("#txtTitulo").val();
    let Descricao = $("#txtdescricao").val();
    let Data = new Date($("#txtdata").val()).toLocaleDateString("pt-br", {
      timeZone: "UTC",
    });
    let Tecnico = $("#txttecnico").val();

    if (!_id || _id == "0") {
      let ticket = {};
      ticket.Cliente = Cliente;
      ticket.Titulo = Titulo;
      ticket.Descricao = Descricao;
      ticket.Data = Data;
      ticket.Tecnico = Tecnico;

      ticket.ID = dados.length + 1;
      dados.push(ticket);
    } else {
      dados.forEach(function (item) {
        if (item.ID == _id) {
          item.Cliente = Cliente;
          item.Titulo = Titulo;
          item.Descricao = Descricao;
          item.Data = Data;
          item.Tecnico = Tecnico;
        }
      });
    }

    alert("Ticket cadastrado com sucesso!");
    $("#ModalRegistro").modal("hide");

    //Limpeza dos Campos
    $("#hdID").val("0");
    $("#txtCliente").val("");
    $("#txtTitulo").val("");
    $("#txtdescricao").val("");
    $("#txtdata").val("");

    $("#txttecnico").val("");

    PopulaTabela();
  });
});
