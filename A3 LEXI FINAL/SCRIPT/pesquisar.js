const inputBusca = document.getElementById('input-busca-geral');
const selectGenero = document.getElementById('filtro-genero');
const selectAno = document.getElementById('filtro-ano');
const selectAutor = document.getElementById('filtro-autor');
const gridResultados = document.getElementById('resultados-pesquisa');

function executarFiltragem() {
    if (!gridResultados) return;

    const termo = inputBusca ? inputBusca.value.trim().toLowerCase() : "";
    const generoSelecionado = selectGenero ? selectGenero.value.toLowerCase() : "todos";
    const anoSelecionado = selectAno ? selectAno.value : "todos";
    const autorSelecionado = selectAutor ? selectAutor.value.toLowerCase() : "todos";

    gridResultados.innerHTML = '';
    let encontrouAlgum = false;

    CATALOGO_LIVROS.forEach(livro => {
        if (livro.genero === 'Documentos') return;

        const bateuTexto = termo === "" || 
                           livro.titulo.toLowerCase().includes(termo) || 
                           livro.autor.toLowerCase().includes(termo);

        const bateuGenero = generoSelecionado === "todos" || livro.genero.toLowerCase() === generoSelecionado;
        const bateuAno = anoSelecionado === "todos" || livro.ano.toString() === anoSelecionado;
        const bateuAutor = autorSelecionado === "todos" || livro.autor.toLowerCase().includes(autorSelecionado);

        if (bateuTexto && bateuGenero && bateuAno && bateuAutor) {
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
if (selectGenero) selectGenero.addEventListener('change', executarFiltragem);
if (selectAno) selectAno.addEventListener('change', executarFiltragem);
if (selectAutor) selectAutor.addEventListener('change', executarFiltragem);

window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof executarFiltragem === 'function' && gridResultados) {
            executarFiltragem(); 
        }
    }, 500);
});
