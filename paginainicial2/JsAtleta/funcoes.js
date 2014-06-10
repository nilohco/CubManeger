$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbAtletas = localStorage.getItem("tbAtletas");// Recupera os dados armazenados

	tbAtletas = JSON.parse(tbAtletas); // Converte string para objeto

	if(tbAtletas == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbAtletas = [];

	function Adicionar(){
		

		var atleta = JSON.stringify({
			
			Nome     : $("#txtNome").val(),
			Sobrenome:  $("#txtSobrenome").val(),
			Idade	 : $("#txtIdade").val(),
			Altura   : $("#txtAltura").val(),
			Peso     : $("#txtPeso").val(),
			Esporte  : $("#txtEsporte").val(),
			Telefone : $("#txtTelefone").val(),
		
		});

		tbAtletas.push(atleta);

		localStorage.setItem("tbAtletas", JSON.stringify(tbAtletas));

		alert("Registro adicionado.");
		return true;
	}

	function Editar(){
		tbAtletas[indice_selecionado] = JSON.stringify({
			
			Nome     : $("#txtNome").val(),
			Sobrenome: $("#txtSobrenome").val(),
			Idade	 : $("#txtIdade").val(),
			Altura   : $("#txtAltura").val(),
			Peso     : $("#txtPeso").val(),
			Esporte  : $("#txtEsporte").val(),
			Telefone : $("#txtTelefone").val(),
		
			});
		localStorage.setItem("tbAtletas", JSON.stringify(tbAtletas));
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
			"	<th>Sobrenome</th>"+
			"	<th>Idade</th>"+
			"	<th>Altura</th>"+
			"	<th>Peso</th>"+
			"	<th>Esporte</th>"+
			"	<th>Telefone</th>"+
			
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbAtletas){
			var cli = JSON.parse(tbAtletas[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='JsAtleta/edit.png' alt='"+i+"' class='btnEditar'/><img src='JsAtleta/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Sobrenome+"</td>" + 
										  "	<td>"+cli.Idade+"</td>" + 
										 "	<td>"+cli.Altura+"</td>" + 
										 "	<td>"+cli.Peso+"</td>" + 
										 "	<td>"+cli.Esporte+"</td>" + 
										 "	<td>"+cli.Telefone+"</td>" + 
								 
		  								 "</tr>");
		 }
	}

	function Excluir(){
		
		tbAtletas.splice(indice_selecionado, 1);
		localStorage.setItem("tbAtletas", JSON.stringify(tbAtletas));
		alert("Registro excluído.");
	}

	function Getatleta(propriedade, valor){
		var cli = null;
        for (var item in tbAtletas) {
            var i = JSON.parse(tbAtletas[item]);
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
		var cli = JSON.parse(tbAtletas[indice_selecionado]);
		
		$("#txtNome").val(cli.Nome);
		$("#txtSobrenome").val(cli.Sobrenome);
		$('txtIdade').val(cli.Idade);
		$("#txtAtura").val(cli.Altura);
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

//FUNÇOES DE BUSCA

function Buscar(tipo, busca){
		//vetor que vai conter o resultado
		var resultado = [];

		//para cada item na tabela, verifica se atende ao filtro
		//se atender, adiciona o item no vetor resultado
		for (var item in tbAtletas) {
            var i = JSON.parse(tbAtletas[item]);
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
										 "	<td>"+cli.Sobrenome+"</td>" + 
										 "	<td>"+cli.Idade+"</td>" + 
										 "	<td>"+cli.Altura+"</td>" + 
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