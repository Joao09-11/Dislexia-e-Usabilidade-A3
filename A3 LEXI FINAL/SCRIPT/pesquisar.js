const inputBusca = document.getElementById('input-busca-geral');
const selectTipo = document.getElementById('filtro-tipo-busca');
const gridResultados = document.getElementById('resultados-pesquisa');

function executarFiltragem() {
    if (!gridResultados) return;

    const termo = inputBusca ? inputBusca.value.trim().toLowerCase() : "";
    const tipo = selectTipo ? selectTipo.value : "todos";

    gridResultados.innerHTML = '';
    let encontrouAlgum = false;

    CATALOGO_LIVROS.forEach(livro => {
        if (livro.genero === 'Documentos') return;

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

if (inputBusca) inputBusca.addEventListener('input', executarFiltragem);
if (selectTipo) selectTipo.addEventListener('change', executarFiltragem);

window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof executarFiltragem === 'function' && gridResultados) {
            executarFiltragem(); 
        }
    }, 500);
});
