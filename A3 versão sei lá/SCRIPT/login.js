// Exemplo de como dar a "Pulseira VIP" no login.js
const btnEntrar = document.getElementById('btn-login'); // Ajuste para o ID do seu botão

if (btnEntrar) {
    btnEntrar.addEventListener('click', (evento) => {
        evento.preventDefault(); // Evita que a página recarregue do jeito antigo
        
        // Salva a pulseira VIP no navegador
        localStorage.setItem('usuarioLogado', 'perfil1'); 
        
        // Manda o usuário para a tela principal
        window.location.href = 'lexi.html'; 
    });
}
// Exemplo de como tirar a "Pulseira VIP"
const btnSair = document.getElementById('btn-sair-conta'); // Ajuste para o ID do seu botão no lexi.html

if (btnSair) {
    btnSair.addEventListener('click', () => {
        // Remove o usuário do navegador
        localStorage.removeItem('usuarioLogado'); 
        
        // Manda de volta para a tela de login
        window.location.href = 'login.html'; 
    });
}