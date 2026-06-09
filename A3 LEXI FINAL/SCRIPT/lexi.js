const texto = document.getElementById('texto-exemplo');
let sz = 16, ls = 0.16, lh = 1.5;
const ativarBotaoUnico = (btn, lista) => {
    lista.forEach(b => b.classList.remove('btn-ativo'));
    btn.classList.add('btn-ativo');
};

function renderizarVitrine() {
    const containerVitrine = document.getElementById('tela-livros'); 
    if (!containerVitrine) return;

    containerVitrine.className = "";
    containerVitrine.innerHTML = "";

    const catalogoPublico = CATALOGO_LIVROS.filter(l => l.genero !== 'Documentos');

    const destaques = catalogoPublico.filter(l => l.genero === 'Romance' || l.genero === 'Clássicos');
    const refletir = catalogoPublico.filter(l => l.genero === 'Filosofia' || l.genero === 'Sociedade' || l.genero === 'Ensino');
    const relaxar = catalogoPublico.filter(l => l.genero === 'Ficção' || l.genero === 'Fantasia' || l.genero === 'Terror');

window.rolarCarrossel = (botao, direcao) => {
    const track = botao.parentElement.querySelector('.carrossel-track');
    const scrollAmount = track.clientWidth;
    track.scrollBy({ left: scrollAmount * direcao, behavior: 'smooth' });
};
const criarCarrossel = (titulo, livros) => {
    if (livros.length === 0) return "";
    let cards = livros.map(livro => `
        <article class="book-card" tabindex="0" aria-label="Livro: ${livro.titulo}">
            <div class="card-body-area">
                <div class="book-cover"><img src="${livro.capa}" alt="Capa"></div>
            </div>
            <div class="card-title-area">
                <h3 style="font-size: 1.2rem; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${livro.titulo}</h3>
                <p style="font-size: 0.9rem; opacity: 0.9;">${livro.autor} • ${livro.ano}</p>
            </div>
        </article>
    `).join('');

    return `
        <div class="carrossel-secao">
            <h2 class="carrossel-titulo">${titulo}</h2>
            <div class="carrossel-wrapper">
                <button class="btn-scroll prev-btn" onclick="rolarCarrossel(this, -1)" aria-label="Rolar para a esquerda">&#10094;</button>
                <div class="carrossel-track">${cards}</div>
                <button class="btn-scroll next-btn" onclick="rolarCarrossel(this, 1)" aria-label="Rolar para a direita">&#10095;</button>
            </div>
        </div>
    `;
};

    containerVitrine.innerHTML += criarCarrossel("Livros em alta", destaques);
    containerVitrine.innerHTML += criarCarrossel("Livros para refletir", refletir);
    containerVitrine.innerHTML += criarCarrossel("Livros para relaxar", relaxar);
}

window.addEventListener('load', async () => {
    await carregarDadosJSON();

    const atualizarCabecalho = () => {
        const headerRight = document.querySelector('.header-right');
        const nome = localStorage.getItem('usuarioNome') || 'Sandy';

        if (headerRight) {
headerRight.innerHTML = `
    <div class="container-perfil-header">
        
        <div id="btn-abrir-perfil" class="avatar-botao-perfil" title="Meu Perfil">
            <img src="IMG/user-header.png" alt="Foto de Perfil" class="avatar-foto-header">
        </div>

        <div id="menu-dropdown-perfil" class="dropdown-perfil">
            <div class="dropdown-header">
                <img src="IMG/user-header.png" alt="Foto Maior">
                <strong style="font-size: 1.1rem; color: var(--azul-profundo); display: block; margin-bottom: 5px;">${nome}</strong>
                <p>${nome.toLowerCase()}@lexi.com.br</p>
            </div>
            <div class="dropdown-body">
                <button class="dropdown-item">Meus Dados</button>
                <button class="dropdown-item">Configurações</button>
                <button class="dropdown-item">Ajuda</button>
                <div class="dropdown-divisor"></div>
                <button id="btn-sair-conta" class="dropdown-item btn-sair-vermelho">Sair da Conta</button>
            </div>
        </div>
    </div>
`;

const btnPerfil = document.getElementById('btn-abrir-perfil');
const menuDropdown = document.getElementById('menu-dropdown-perfil');

    if (btnPerfil && menuDropdown) {
        btnPerfil.onclick = (e) => {
        e.stopPropagation(); 
        menuDropdown.classList.toggle('mostrar');
        };

    document.addEventListener('click', (event) => {
        if (!menuDropdown.contains(event.target) && !btnPerfil.contains(event.target)) {
            menuDropdown.classList.remove('mostrar');
            }
        });
    }

    const btnSair = document.getElementById('btn-sair-conta');
        if (btnSair) {
            btnSair.onclick = () => {
            localStorage.removeItem('sessaoAtiva');
            localStorage.removeItem('usuarioNome');
            window.location.reload(); 
            };
        }
    }
};

    if (localStorage.getItem('fazerLogin') === 'sim') {
        const nome = localStorage.getItem('usuarioNome') || 'Sandy';
        alert(`Bem-vinda de novo, ${nome}!`);
        atualizarCabecalho();
        localStorage.removeItem('fazerLogin');
        localStorage.setItem('sessaoAtiva', 'sim');
        renderizarVitrine(); 
    } else if (localStorage.getItem('sessaoAtiva') === 'sim') {
        atualizarCabecalho();
        renderizarVitrine(); 
    } else {
        renderizarVitrine();
    }
});