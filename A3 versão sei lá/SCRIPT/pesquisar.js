// MOTOR DE BUSCA COM FILTROS COMBINADOS
const inputBusca = document.getElementById('input-busca-geral');
const selectGenero = document.getElementById('filtro-genero');
const selectAno = document.getElementById('filtro-ano');
const gridResultados = document.getElementById('resultados-pesquisa');

function executarFiltragem() {
    if (!inputBusca || !gridResultados) return;

    const termo = inputBusca.value.trim().toLowerCase();
    const generoSelecionado = selectGenero ? selectGenero.value : "todos";
    const anoSelecionado = selectAno ? selectAno.value : "todos";

    // Se não digitou nada e não escolheu nenhum filtro, deixa a tela limpa
    if (termo === "" && generoSelecionado === "todos" && anoSelecionado === "todos") {
        gridResultados.innerHTML = '';
        return;
    }

    gridResultados.innerHTML = '';
    let encontrouAlgum = false;

    // Varia o catálogo de livros do dados.js
    CATALOGO_LIVROS.forEach(livro => {
        // 1. Filtro de Texto (Título ou Autor)
        const bateuTexto = termo === "" || 
                           livro.titulo.toLowerCase().includes(termo) || 
                           livro.autor.toLowerCase().includes(termo);

        // 2. Filtro de Gênero
        const bateuGenero = generoSelecionado === "todos" || livro.genero === generoSelecionado;

        // 3. Filtro de Ano
        const bateuAno = anoSelecionado === "todos" || livro.ano.toString() === anoSelecionado;

        // Só mostra o livro se ele passar nos TRÊS filtros ao mesmo tempo
        if (bateuTexto && bateuGenero && bateuAno) {
            encontrouAlgum = true;
            
            // ESTRUTURA HTML IDÊNTICA À DA VITRINE PRINCIPAL (lexi.js)
            const cardHTML = `
                <article class="book-card" tabindex="0" aria-label="Livro: ${livro.titulo}">
                    <div class="card-body-area">
                        <div class="book-cover">
                            <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
                        </div>
                    </div>
                    <div class="card-title-area">
                        <h3 style="font-size: 1.2rem; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${livro.titulo}</h3>
                        <p style="font-size: 0.9rem; opacity: 0.9;">${livro.autor} • ${livro.ano}</p>
                    </div>
                </article>
            `;
            gridResultados.innerHTML += cardHTML;
        }
    });

    if (!encontrouAlgum) {
        gridResultados.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-weight: bold; width: 100%; color: var(--azul-profundo);">Nenhum livro encontrado para os filtros aplicados.</p>`;
    }
}

// Escuta as mudanças em tempo real em todos os campos
if (inputBusca) inputBusca.addEventListener('input', executarFiltragem);
if (selectGenero) selectGenero.addEventListener('change', executarFiltragem);
if (selectAno) selectAno.addEventListener('change', executarFiltragem);
