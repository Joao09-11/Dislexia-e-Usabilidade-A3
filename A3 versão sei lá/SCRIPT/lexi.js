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

// Quando o navegador terminar de carregar o HTML, ele chama a função para desenhar a vitrine
document.addEventListener('DOMContentLoaded', () => {
    renderizarVitrine();
});




// Gerenciamento de Estado de Login e Inicialização do App
window.addEventListener('load', () => {
    const atualizarCabecalho = () => {
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            headerRight.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; cursor: pointer; background-color: var(--azul-profundo); padding: 6px; border-radius: 30px;">
                    <img src="IMG/perfil-1.png" alt="Foto de Perfil" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;">
                </div>
            `;
        }
    };

    if (localStorage.getItem('fazerLogin') === 'sim') {
        const nome = localStorage.getItem('usuarioNome') || 'Sandy';
        alert(`Bem-vinda de novo, ${nome}!`);
        atualizarCabecalho();
        localStorage.removeItem('fazerLogin');
        localStorage.setItem('sessaoAtiva', 'sim');
        renderizarVitrine(); // Mostra a vitrine geral!
    } else if (localStorage.getItem('sessaoAtiva') === 'sim') {
        atualizarCabecalho();
        renderizarVitrine(); // Mostra a vitrine geral!
    } else {
        renderizarVitrine(); // Mostra a vitrine geral!
    }
});