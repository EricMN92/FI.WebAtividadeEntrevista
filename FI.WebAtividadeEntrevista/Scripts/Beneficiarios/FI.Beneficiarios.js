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
        $("#mensagem").text('');
    });

    $('#table').on('click', '.excluir-btn', function () {
        $(this).closest('tr').remove();
        $("#mensagem").text('');
    });

    function preencheObj() {
        var cpf = $("#CPFBeneficiario").val();
        var nome = $("#NomeBeneficiario").val();

        var benef = { 'cpf': cpf, 'nome': nome };

        return benef;
    }

    function verificarCampos(cpf, nome) {
        msg = "";
        if (!testaCPF(cpf.replace(".", "").replace(".", "").replace("-", "")) || cpf == "") {
            msg += "Cpf inválido";
        }

        var cpfDuplicado = verificaDuplicacao(cpf);

        if (cpfDuplicado != '') {
            if (msg == "") {
                msg += cpfDuplicado;
            }
            else {
                msg += ", " + cpfDuplicado
            }
        }

        if (nome == "") {
            if (msg == "") {
                msg = "Nome é obrigatório";
            }
            else {
                msg += ", Nome é obrigatório"
            }
        }

        return msg;
    }

    function limparCampos() {
        $("#CPFBeneficiario").val('');
        $("#NomeBeneficiario").val('');
        $("#mensagem").text('');
    }

    function testaCPF(strCPF) {
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

    function verificaDuplicacao(strCPF) {

        var cpfEncontrado = false;

        $('#table tbody tr').each(function () {
            // Acessar todas as células da linha atual
            var celulas = $(this).find('td');

            // Iterar sobre todas as células da linha atual
            celulas.each(function () {
                // Acessar o conteúdo de cada célula
                var conteudoCelula = $(this).text();

                if (conteudoCelula == strCPF) {
                    cpfEncontrado = true;
                    return false; // Isso interrompe o loop externo
                }
            });

            if (cpfEncontrado) {
                return false; // Isso interrompe o loop externo
            }
        });

        if (cpfEncontrado) {
            return 'CPF já adicionado';
        } else {
            return '';
        }
    }
}); 