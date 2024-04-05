$(document).ready(function () {

    var benefLista = [];
    var msg = "";
    $('#addRow').on('click', function () {
        var benef = preencheObj();
        if (verificarCampos(benef['cpf'], benef['nome']) == "") {

            var tr = '<tr style="text-align:left">' +
                '<td style="text-align:left">' + benef['cpf'] + '</td>' +
                '<td style="text-align:left">' + benef['nome'] + '</td>' +
                '<td> <button class="btn btn-primary alterar-btn">Alterar</button> </td>' +
                '<td> <button class="btn btn-primary excluir-btn">Excluir</button> </td>' +
                '</tr>';

            $('#tableBody').append(tr);
            limparCampos();
        }
        else {
            $("#mensagem").text(msg);
        }
    });

    $('#table').on('click', '.alterar-btn', function () {
        var $row = $(this).closest('tr');
        var cpf = $row.find('td:eq(0)').text(); // Obtém o CPF da primeira coluna
        var nome = $row.find('td:eq(1)').text(); // Obtém o Nome da segunda coluna
        $row.remove();
        $("#CPFBeneficiario").val(cpf);
        $("#NomeBeneficiario").val(nome);
    });

    $('#table').on('click', '.excluir-btn', function () {
        $(this).closest('tr').remove();
    });

    function preencheObj() {
        var cpf = $("#CPFBeneficiario").val();
        var nome = $("#NomeBeneficiario").val();

        var benef = { 'cpf': cpf, 'nome': nome };

        return benef;
    }

    function verificarCampos(cpf, nome) {
        msg = "";
        if (!TestaCPF(cpf.replace(".", "").replace(".", "").replace("-", "")) || cpf == "") {
            msg += "Cpf inválido";
        }

        if (nome == "") {
            if (msg == "") {
                msg = "Nome é obrigatório";
            }
            else {
                msg += ", Nome é obrigatório"
            }

            return msg;
        }

        return msg;
    }

    function limparCampos() {
        $("#CPFBeneficiario").val('');
        $("#NomeBeneficiario").val('');
    }

    function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }
}); 