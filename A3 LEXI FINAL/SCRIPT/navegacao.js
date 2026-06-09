const verificarBloqueio = (container, nomeDaArea) => {
    const estaLogado = localStorage.getItem('sessaoAtiva') === 'sim';
    
    if (!estaLogado && container) {

        const titulo = container.querySelector('h2');
        const h2Salvo = titulo ? titulo.outerHTML : '';

        container.innerHTML = `
            ${h2Salvo}
            <div class="aviso-login" style="grid-column: 1 / -1; text-align: center; padding: 60px; max-width: 500px; margin: 0 auto; background: var(--preview-fundo); border-radius: 20px; border: 2px dashed var(--azul-profundo);">
                <h3 style="font-family: 'OpenDyslexic', sans-serif; font-size: 1.6rem; color: var(--azul-profundo); margin-bottom: 15px;">Acesso Restrito</h3>
<p style="margin-bottom: 30px; font-size: 1.2rem; line-height: 1.6; font-family: var(--fonte-global); letter-spacing: var(--letras-global); word-spacing: var(--palavras-global); color: var(--preto-lexi);">Faça login ou crie uma conta para acessar <b>${nomeDaArea}</b>.</p>
                <a href="login.html" class="btn-tema" style="display: inline-block; padding: 1px 30px; text-decoration: none; font-weight: bold; line-height: 45px; height: 45px;">Entrar agora</a>
            </div>
        `;
    }
};

const sPrincipal = document.getElementById('sidebar-principal'); 
const subPreferencias = document.getElementById('sub-preferencias'); 
const subBiblioteca = document.getElementById('sub-biblioteca'); 

const tSincronizar = document.getElementById('tela-sincronizar');
const tLivros = document.getElementById('tela-livros'); 
const tPref = document.getElementById('tela-preferencias');
const tPesquisa = document.getElementById('tela-pesquisa'); 
const tBiblioteca = document.getElementById('tela-minha-biblioteca'); 
const tArquivos = document.getElementById('tela-arquivos'); 
const tFaq = document.getElementById('tela-faq'); 

const fecharSubMenus = () => {
    if (subPreferencias) subPreferencias.classList.remove('expandido');
    if (subBiblioteca) subBiblioteca.classList.remove('expandido');
};

const resetarLayoutGeral = () => {
    if (tSincronizar) tSincronizar.style.display = 'none';
    if (tLivros) tLivros.style.display = 'none';
    if (tPref) tPref.style.display = 'none';
    if (tPesquisa) tPesquisa.style.display = 'none';
    if (tBiblioteca) tBiblioteca.style.display = 'none';
    if (tArquivos) tArquivos.style.display = 'none'; 
    if (tFaq) tFaq.style.display = 'none'; 
};

const gerenciarVoltarHome = () => {
    resetarLayoutGeral();
    fecharSubMenus();
    if (sPrincipal) sPrincipal.classList.remove('aberta'); 
    if (tLivros) tLivros.style.display = 'grid';
    if (typeof renderizarVitrine === 'function') renderizarVitrine();
};

document.getElementById('btn-logo-home')?.addEventListener('click', (e) => {
    if (e) e.preventDefault();
    gerenciarVoltarHome();
});

// INTERAÇÕES DE NAVEGAÇÃO

document.getElementById('nav-ir-pesquisar').onclick = () => {
    if (tPesquisa && tPesquisa.style.display === 'block') {
        sPrincipal.classList.toggle('aberta');
        return; 
    }
    resetarLayoutGeral(); fecharSubMenus();
    sPrincipal.classList.add('aberta'); 
    if (tPesquisa) tPesquisa.style.display = 'block';
};

document.getElementById('nav-ir-biblioteca').onclick = () => {
    if (subBiblioteca && subBiblioteca.classList.contains('expandido')) {
        sPrincipal.classList.remove('aberta');
        subBiblioteca.classList.remove('expandido');
        return;
    }
    resetarLayoutGeral(); fecharSubMenus(); 
    sPrincipal.classList.add('aberta');
    if (subBiblioteca) subBiblioteca.classList.add('expandido');
    
    if (tBiblioteca) tBiblioteca.style.display = 'block';
    if (typeof renderizarMinhaBiblioteca === 'function') renderizarMinhaBiblioteca();
};

document.getElementById('nav-ir-arquivos').onclick = () => {
    if (tArquivos && tArquivos.style.display === 'block') {
        sPrincipal.classList.toggle('aberta');
        return;
    }
    resetarLayoutGeral(); fecharSubMenus();
    sPrincipal.classList.add('aberta');
    if (tArquivos){
        tArquivos.style.display = 'block';
        verificarBloqueio(tArquivos, "Arquivos e Documentos");
    }
};

document.getElementById('nav-ir-sincronizar').onclick = () => {
    if (tSincronizar && tSincronizar.style.display === 'block') {
        sPrincipal.classList.toggle('aberta');
        return;
    }
    resetarLayoutGeral(); fecharSubMenus();
    sPrincipal.classList.add('aberta');
    if (tSincronizar){
        tSincronizar.style.display = 'block';
        verificarBloqueio(tSincronizar, "Sincronização de Contas");
    }
};

document.getElementById('nav-ir-preferencias').onclick = () => {
    if (subPreferencias && subPreferencias.classList.contains('expandido')) {
        sPrincipal.classList.remove('aberta'); 
        subPreferencias.classList.remove('expandido'); 
        return; 
    }
    resetarLayoutGeral(); fecharSubMenus(); 
    sPrincipal.classList.add('aberta'); 
    if (subPreferencias) subPreferencias.classList.add('expandido'); 
    if (tPref) tPref.style.display = 'block';
};

const linkFaq = document.getElementById('link-footer-faq');
if (linkFaq) {
    linkFaq.onclick = (e) => {
        e.preventDefault();
        resetarLayoutGeral(); fecharSubMenus();
        if (sPrincipal) sPrincipal.classList.remove('aberta');
        if (tFaq) tFaq.style.display = 'block';
        window.scrollTo(0,0);
    };
}