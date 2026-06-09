const botaoOlho = document.getElementById('toggleSenha');
const campoSenha = document.getElementById('input-senha');

if (botaoOlho && campoSenha) {
    botaoOlho.addEventListener('click', function () {
        if (campoSenha.type === 'password') {
            campoSenha.type = 'text';
            this.src = 'ICON/iconOlhoAberto.png';  
            this.setAttribute('aria-expanded', 'true');
            this.setAttribute('aria-label', 'Ocultar senha, exibindo em formato de pontos');
        } else {
            campoSenha.type = 'password';
            this.src = 'ICON/iconOlhoFechado.webp';             
            this.setAttribute('aria-expanded', 'false');
            this.setAttribute('aria-label', 'Mostrar senha em formato de texto legível');
        }
    });
    botaoOlho.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); 
            this.click(); 
        }
    });
}
const btnEntrar = document.getElementById('btn-login');
if (btnEntrar) {
    btnEntrar.addEventListener('click', (evento) => {
        evento.preventDefault(); 
        localStorage.setItem('usuarioLogado', 'perfil1'); 
        window.location.href = 'lexi.html'; 
    });
}
const btnSair = document.getElementById('btn-sair-conta');
if (btnSair) {
    btnSair.addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado'); 
        window.location.href = 'login.html'; 
    });
}