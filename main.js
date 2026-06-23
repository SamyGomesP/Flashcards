let more = document.getElementById("more");
	let boxCards = document.querySelector(".box-cards");
	
	
	function verificarCards() {
		let cards = document.getElementsByClassName("card");//lista
		let aviso = document.getElementById("aviso");
		
		if (cards.length == 0 && !aviso) {//!aviso = não existe
			let p = document.createElement("p");
			p.id = "aviso";
			p.innerHTML = `<p id="aviso">Seus flashcards<br>aparecerão aqui...</p>`
			boxCards.prepend(p);
			}
			else if (cards.length > 0 && aviso) {
				aviso.remove();
				}
		//"se houver card e aviso existir, remova aviso"		
		
		}
	
		
	function adicionar() {
		if (document.querySelector(".cards")) return;
		
		//O return sozinho dentro de uma função simplesmente para a execução ali.
		 
		let formulario = document.createElement("div");
		formulario.classList.add("cards");
		formulario.innerHTML = `
				<input type="text" id="titulo" placeholder="titulo">
				<textarea class="textarea" 
				wrap="hard" placeholder="Escreva o conteúdo do 
				card aqui..."></textarea>
				<div class="box-botoes">
					<div class="botoes">
						<button class="add-cards" id="check"
				onclick="salvar()"><i class="fa-solid fa-check"></i></button>
						<button id="cancelar" class="add-cards" onclick="cancelar()">X</button>
					</div>
				</div>`;
		boxCards.appendChild(formulario);
		}
		
		function cancelar() {
			let cards = document.querySelector(".cards");
			cards.remove();
			}


	function criarCard(titulo, texto) {

		let novoCard = document.createElement("div");
		novoCard.classList.add("card");
		
		let frente = document.createElement("div");
		frente.classList.add("frente");
		frente.textContent = titulo.toUpperCase();
		
		let verso = document.createElement("div");
		verso.classList.add("verso");
		verso.textContent = texto;
		
		novoCard.appendChild(frente);
		novoCard.appendChild(verso);
		
		let boxOpcoes = document.createElement("div");
		boxOpcoes.classList.add("box-opcoes");
		
		let btnExcluir = document.createElement("button");
		btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
		btnExcluir.classList.add("btn-opcao");
		
		let btnEditar = document.createElement("button");
		btnEditar.innerHTML = '<i class="fa-solid fa-pen"></i>'
		btnEditar.classList.add("btn-opcao");
		
		boxOpcoes.appendChild(btnEditar);
		boxOpcoes.appendChild(btnExcluir);
		
		frente.appendChild(boxOpcoes);
		
		btnExcluir.addEventListener("click", function(event) {
			event.stopPropagation();
			novoCard.remove();
			verificarCards();
			salvarNoStorage();
		});
			
		btnEditar.addEventListener("click", function(event) {
			event.stopPropagation();
			adicionar();
			
			
		document.getElementById("titulo").value = frente.childNodes[0].textContent;
		document.querySelector(".textarea").value = verso.textContent;
		
		novoCard.remove();
		verificarCards();
		salvarNoStorage(); 
		
		});
		
		boxCards.appendChild(novoCard);
		
		novoCard.addEventListener('click', rotacionar);
		
		verificarCards();
	}


	function salvar() {
		let titulo =  document.getElementById("titulo").value;
		let textarea = document.querySelector(".textarea");
		let texto = textarea.value.trim();
		
		if (texto === "" || titulo === "") return;
		
		let formulario = document.querySelector(".cards");
		if (formulario) formulario.remove();
		// "se formulario existe, remova"
		
		criarCard(titulo, texto);
		salvarNoStorage(); 
		}
		
	function rotacionar(event) {
		event.currentTarget.classList.toggle('rodar');
		}

	function salvarNoStorage() {
		let cards = document.querySelectorAll(".card");
		let dados = [];

		cards.forEach(function(card) {
			let titulo = card.querySelector(".frente").childNodes[0].textContent;
			let texto = card.querySelector(".verso").textContent;
			dados.push({ titulo: titulo, texto: texto });
		});

		localStorage.setItem("flashcards", JSON.stringify(dados));
	}

	//sempre é chamado ao carregar a página
	function carregarDoStorage() {
		let dados = JSON.parse(localStorage.getItem("flashcards"));

		if (!dados) return; // nada salvo ainda, para aqui

		dados.forEach(function(item) {
			criarCard(item.titulo, item.texto);
		
		});
	}

	function pesquisar() {
		let termo = document.querySelector(".search").value.trim().toLowerCase();
		let cards = document.querySelectorAll(".card");

		cards.forEach(function(card) {
			let titulo = card.querySelector(".frente").childNodes[0].textContent.toLowerCase();

			if (titulo.includes(termo)) {
				card.style.display = "";
			} else {
				card.style.display = "none";
			}
		});
	}

	more.addEventListener('click', adicionar);
	document.getElementById("pesquisar").addEventListener("click", pesquisar);
	document.querySelector(".search").addEventListener("input", pesquisar);

	carregarDoStorage();
	verificarCards();
	
	


/*
!aviso = se não tem cards e o aviso ainda não existe, cria o aviso
"if (formulario) formulario.remove();"= se o formulário existe, remove ele"
*/
