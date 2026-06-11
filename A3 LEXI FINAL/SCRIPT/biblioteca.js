const inputBuscaBiblio = document.getElementById('input-busca-biblio');
const selectTipoBiblio = document.getElementById('filtro-tipo-biblio');
const controlesBiblio = document.getElementById('controles-biblioteca');
const gridBiblio = document.getElementById('grid-minha-biblioteca');

function renderizarMinhaBiblioteca() {
    if (!gridBiblio) return;

    const estaLogado = localStorage.getItem('sessaoAtiva') === 'sim'; 

    if (!estaLogado) {
        if (controlesBiblio) controlesBiblio.style.display = 'none'; 
        
        gridBiblio.innerHTML = `
            <div class="aviso-login" style="grid-column: 1 / -1; text-align: center; padding: 60px; max-width: 500px; margin: 0 auto; background: var(--preview-fundo); border-radius: 20px; border: 2px dashed var(--azul-profundo);">
                <h3 style="font-family: 'OpenDyslexic', sans-serif; font-size: 1.6rem; color: var(--azul-profundo); margin-bottom: 15px;">Acesso Restrito</h3>
                <p style="margin-bottom: 30px; font-size: 1.2rem; line-height: 1.6; font-family: var(--fonte-global); letter-spacing: var(--letras-global); word-spacing: var(--palavras-global); color: var(--preto-lexi)">Faça login ou crie uma conta para acessar sua Biblioteca.</p>
                <a href="login.html" class="btn-tema" style="display: inline-block; padding: 1px 30px; text-decoration: none; font-weight: bold; line-height: 45px; height: 45px;">Entrar agora</a>
            </div>
        `;
        return; 
    }

    if (controlesBiblio) controlesBiblio.style.display = 'flex'; 
    filtrarMinhaEstante();
}

function filtrarMinhaEstante() {
    if (!gridBiblio) return;

    const termo = inputBuscaBiblio ? inputBuscaBiblio.value.trim().toLowerCase() : "";
    const tipo = selectTipoBiblio ? selectTipoBiblio.value : "todos";

    gridBiblio.innerHTML = "";
    let encontrouAlgum = false;
    
    const livrosUsuario = BIBLIOTECAS_USUARIOS["perfil1"];

    livrosUsuario.forEach(itemUsuario => {
        const livro = CATALOGO_LIVROS.find(l => l.id === itemUsuario.idLivro);
        
        if (livro) {
            let bateu = false;
            
            if (tipo === 'todos') {
                bateu = termo === "" || livro.titulo.toLowerCase().includes(termo) || livro.autor.toLowerCase().includes(termo) || livro.genero.toLowerCase().includes(termo);
            } else if (tipo === 'titulo') {
                bateu = termo === "" || livro.titulo.toLowerCase().includes(termo);
            } else if (tipo === 'autor') {
                bateu = termo === "" || livro.autor.toLowerCase().includes(termo);
            } else if (tipo === 'genero') {
                bateu = termo === "" || livro.genero.toLowerCase().includes(termo);
            }

            if (bateu) {
                encontrouAlgum = true;
                
                let tagFormato = "";
                if (itemUsuario.formato !== "") {
                    tagFormato = `<span class="tag-formato">${itemUsuario.formato}</span>`;
                }

                const cardHTML = `
                    <article class="book-card" tabindex="0" aria-label="Livro: ${livro.titulo}">
                        <div class="card-body-area">
                            <div class="book-cover">
                                <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
                                ${tagFormato}
                            </div>
                        </div>
                        <div class="card-title-area">
                            <h3 style="font-size: 1.2rem; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${livro.titulo}</h3>
                            <p style="font-size: 0.9rem; opacity: 0.9;">${livro.autor} • ${livro.ano}</p>
                        </div>
                    </article>
                `;
                gridBiblio.innerHTML += cardHTML;
            }
        }
    });

    if (!encontrouAlgum) {
        gridBiblio.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-weight: bold; width: 100%; color: var(--azul-profundo);">Nenhum livro encontrado na sua estante.</p>`;
    }
}

if (inputBuscaBiblio) inputBuscaBiblio.addEventListener('input', filtrarMinhaEstante);
if (selectTipoBiblio) selectTipoBiblio.addEventListener('change', filtrarMinhaEstante);