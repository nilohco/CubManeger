$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbTecnico = localStorage.getItem("tbTecnico");// Recupera os dados armazenados

	tbTecnico = JSON.parse(tbTecnico); // Converte string para objeto

	if(tbTecnico == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbTecnico = [];

	function Adicionar(){
		

		var cliente = JSON.stringify({
			
			Nome     : $("#txtNome").val(),
			Peso     : $("#txtPeso").val(),
			Esporte     : $("#txtEsporte").val(),
			Telefone : $("#txtTelefone").val(),
		
		});

		tbTecnico.push(cliente);

		localStorage.setItem("tbTecnico", JSON.stringify(tbTecnico));

		alert("Registro adicionado.");
		return true;
	}

	function Editar(){
		tbTecnico[indice_selecionado] = JSON.stringify({
			
			Nome     : $("#txtNome").val(),
			Peso     : $("#txtPeso").val(),
			Esporte     : $("#txtEsporte").val(),
			Telefone : $("#txtTelefone").val(),
		
			});
		localStorage.setItem("tbTecnico", JSON.stringify(tbTecnico));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			
			"	<th>Acao</th>"+
			"	<th>Nome</th>"+
			"	<th>Peso</th>"+
			"	<th>Esporte</th>"+
			"	<th>Telefone</th>"+
			
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbTecnico){
			var cli = JSON.parse(tbTecnico[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='JsTecnico/edit.png' alt='"+i+"' class='btnEditar'/><img src='JsTecnico/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Peso+"</td>" + 
										 "	<td>"+cli.Esporte+"</td>" + 
										 "	<td>"+cli.Telefone+"</td>" + 
								 
		  								 "</tr>");
		 }
	}

	function Excluir(){
		
		tbTecnico.splice(indice_selecionado, 1);
		localStorage.setItem("tbTecnico", JSON.stringify(tbTecnico));
		alert("Registro excluído.");
	}

	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbTecnico) {
            var i = JSON.parse(tbTecnico[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}

	Listar();

	$("#frmCadastro").bind("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$(".btnEditar").bind("click", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbTecnico[indice_selecionado]);
		
		$("#txtNome").val(cli.Nome);
		$("#txtPeso").val(cli.Peso);
		$("#txtEsporte").val(cli.Esporte);
		$("#txtTelefone").val(cli.Telefone);
		
		
		$("#txtNome").focus();
	});

	$(".btnExcluir").bind("click", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
//Funcoes buscar

function Buscar(tipo, busca){
		//vetor que vai conter o resultado
		var resultado = [];

		//para cada item na tabela, verifica se atende ao filtro
		//se atender, adiciona o item no vetor resultado
		for (var item in tbTecnico) {
            var i = JSON.parse(tbTecnico[item]);
            if (i[tipo].toString().indexOf(busca) > -1)
               resultado.push(i);
        }

        //esvazia a tabela de relatório
        $("#tblRelatorio tbody").html("");

        //para cada item no resultado, exibe na tabela de relatório
        for(var i in resultado){
			var cli = resultado[i];
		  	$("#tblRelatorio tbody").append("<tr>"+
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Peso+"</td>" + 
										 "	<td>"+cli.Esporte+"</td>" + 
										 "	<td>"+cli.Telefone+"</td>" + 
		  								 "</tr>");
		 }
	}

	//chama a função de busca passando os parâmetros
	$("#btnBuscar").click(function(){
		var tipo = $("#selTipo").val();
		var busca = $("#txtBusca").val();
		Buscar(tipo, busca);
	})

	$("#btnImprimir").click(function(){		
		//esconde os demais componentes, deixando só a tabela visível
		$("#divBusca, #divRodape").hide();
		//imprime a janela
		window.print();
		//exibe os demais componentes
		$("#divBusca, #divRodape").show();
	});

});