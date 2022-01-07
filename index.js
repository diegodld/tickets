
var dados = [];

function PopulaTabela() {
  if (Array.isArray(dados)) {
    $("#TblDados tbody").html("");

    dados.forEach(function (item) {
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

$(function () {
  dados = JSON.parse(localStorage.getItem("__dados__"));
  if (dados) {
    PopulaTabela();
  }
});
