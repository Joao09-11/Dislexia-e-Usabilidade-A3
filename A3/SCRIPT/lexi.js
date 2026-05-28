// 1. VARIÁVEIS GLOBAIS E FUNÇÕES ÚTEIS
const texto = document.getElementById('texto-exemplo');
let sz = 16, ls = 0.16, lh = 1.5;  //usamos let pq esse valores vão mudar
//sz tamanho atual, ls espaco da letra atual e lh espaco da linha atual //

// Função que faltava: Acende o botão clicado e apaga os outros
const ativarBotaoUnico = (btn, lista) => {
    lista.forEach(b => b.classList.remove('btn-ativo'));
    btn.classList.add('btn-ativo');
};

// CARREGAR PREFERÊNCIAS SALVAS (JSON NA MEMÓRIA)

window.onload = () => {
    const memoria = localStorage.getItem('user_p');

    if(memoria) {
        const p = JSON.parse(memoria); // Desempacota o JSON
        sz = p.tamanho; ls = p.espaco; lh = p.altura;
        texto.style.fontSize = sz + 'px';
        texto.style.letterSpacing = ls + 'em';
        texto.style.lineHeight = lh;
    }
};


// ==========================================
// TELA PRINCIPAL (A Vitrine Pública)
// ==========================================

function renderizarVitrine() {
    const containerVitrine = document.getElementById('tela-livros'); 
    
    // Se não encontrar o container, para a execução para evitar erros
    if (!containerVitrine) return;

    // Limpa o ecrã antes de desenhar
    containerVitrine.innerHTML = "";

    // Percorre o catálogo e monta a estrutura usando as classes do teu CSS
    CATALOGO_LIVROS.forEach(livro => {
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
        containerVitrine.innerHTML += cardHTML;
    });
}

// ==========================================
// Gerenciamento de Estado e Inicialização
// ==========================================
window.addEventListener('load', async () => {
    
    // A MÁGICA ACONTECE AQUI: Chama o Fetch e espera os livros chegarem!
    await carregarDadosJSON();

    const atualizarCabecalho = () => {
        const headerRight = document.querySelector('.header-right');
        const nome = localStorage.getItem('usuarioNome') || 'Sandy';

        if (headerRight) {
            headerRight.innerHTML = `
                <div style="position: relative; display: flex; align-items: center;">
                    <div id="btn-abrir-perfil" style="cursor: pointer; background-color: var(--azul-profundo); padding: 4px; border-radius: 50%; border: 2px solid var(--areia); transition: 0.3s;" title="Meu Perfil">
                        <img src="IMG/user-header.png" alt="Foto de Perfil" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; display: block;">
                    </div>

                    <div id="menu-dropdown-perfil" class="dropdown-perfil">
                        <div class="dropdown-header">
                            <img src="IMG/user-header.png" alt="Foto Maior">
                            <h4>${nome}</h4>
                            <p>${nome.toLowerCase()}@lexi.com.br</p>
                        </div>
                        <div class="dropdown-body">
                            <button class="dropdown-item">Meus Dados</button>
                            <button class="dropdown-item">Configurações</button>
                            <button class="dropdown-item">Ajuda</button>
                            <div class="dropdown-divisor"></div>
                            <button id="btn-sair-conta" class="dropdown-item" style="color: #D32F2F;">Sair da Conta</button>
                        </div>
                    </div>
                </div>
            `;

            // Lógica de Abrir/Fechar o Menu ao clicar na foto
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

            // Lógica de Sair da Conta
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
        renderizarVitrine(); // Mostra a vitrine geral depois de logar!
    } else if (localStorage.getItem('sessaoAtiva') === 'sim') {
        atualizarCabecalho();
        renderizarVitrine(); // Mostra a vitrine geral se já estiver logada!
    } else {
        renderizarVitrine(); // Mostra a vitrine geral para visitantes deslogados!
    }
});