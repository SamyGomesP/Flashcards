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
		
		
		function salvar() {
			let titulo =  document.getElementById("titulo").value;
			let textarea = document.querySelector(".textarea");
			let texto = textarea.value.trim();
			
			if (texto === "" || titulo === "") return;
			
			let formulario = document.querySelector(".cards");
			if (formulario) formulario.remove();
			// "se formulario existe, remova"
			
			
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
				});
				
			btnEditar.addEventListener("click", function(event) {
				event.stopPropagation();
				adicionar();
				
				
			document.getElementById("titulo").value = frente.childNodes[0].textContent;
			document.querySelector(".textarea").value = verso.textContent;
			
			novoCard.remove();
			verificarCards();
			
			});
			
			boxCards.appendChild(novoCard);
			
			novoCard.addEventListener('click', rotacionar);
			
			verificarCards();
					
			}
			
		function rotacionar(event) {
			event.currentTarget.classList.toggle('rodar');
			}
			
		more.addEventListener('click', adicionar);		
		verificarCards();
		
		
	
	
/*
!aviso = se não tem cards e o aviso ainda não existe, cria o aviso
"if (formulario) formulario.remove();"= se o formulário existe, remove ele"
*/		
