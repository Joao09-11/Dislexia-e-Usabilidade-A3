// ==========================================
// 1. DECLARAÇÃO DOS ELEMENTOS GLOBAIS
// ==========================================
const sPrincipal = document.getElementById('sidebar-principal'); 
const subPreferencias = document.getElementById('sub-preferencias'); 
const subBiblioteca = document.getElementById('sub-biblioteca'); 

const tSincronizar = document.getElementById('tela-sincronizar');
const tLivros = document.getElementById('tela-livros'); 
const tPref = document.getElementById('tela-preferencias');
const tPesquisa = document.getElementById('tela-pesquisa'); 
const tBiblioteca = document.getElementById('tela-minha-biblioteca'); 
const tArquivos = document.getElementById('tela-arquivos'); // Novo elemento adicionado

// ==========================================
// 2. FUNÇÕES DE LIMPEZA
// ==========================================
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
    if (tArquivos) tArquivos.style.display = 'none'; // Reseta arquivos também
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

// ==========================================
// 3. INTERAÇÕES COM ALTERNÂNCIA DE ESTADO (TOGGLE)
// ==========================================

// Aba Pesquisar
document.getElementById('nav-ir-pesquisar').onclick = () => {
    if (tPesquisa && tPesquisa.style.display === 'block') {
        sPrincipal.classList.toggle('aberta');
        return; 
    }
    resetarLayoutGeral(); fecharSubMenus();
    sPrincipal.classList.add('aberta'); 
    if (tPesquisa) tPesquisa.style.display = 'block';
};

// Aba Biblioteca
document.getElementById('nav-ir-biblioteca').onclick = () => {
    if (subBiblioteca && subBiblioteca.classList.contains('expandido')) {
        sPrincipal.classList.remove('aberta');
        subBiblioteca.classList.remove('expandido');
        return;
    }
    resetarLayoutGeral();
    fecharSubMenus(); 
    sPrincipal.classList.add('aberta');
    if (subBiblioteca) subBiblioteca.classList.add('expandido');
    
    if (tBiblioteca) tBiblioteca.style.display = 'block';
    if (typeof renderizarMinhaBiblioteca === 'function') renderizarMinhaBiblioteca();
};

// Aba Arquivos (Nova funcionalidade integrada)
document.getElementById('nav-ir-arquivos').onclick = () => {
    if (tArquivos && tArquivos.style.display === 'block') {
        sPrincipal.classList.toggle('aberta');
        return;
    }
    resetarLayoutGeral(); fecharSubMenus();
    sPrincipal.classList.add('aberta');
    if (tArquivos) tArquivos.style.display = 'block';
};

// Aba Sincronizar
document.getElementById('nav-ir-sincronizar').onclick = () => {
    if (tSincronizar && tSincronizar.style.display === 'block') {
        sPrincipal.classList.toggle('aberta');
        return;
    }
    resetarLayoutGeral(); fecharSubMenus();
    sPrincipal.classList.add('aberta');
    if (tSincronizar) tSincronizar.style.display = 'block';
};

// Aba Preferências
document.getElementById('nav-ir-preferencias').onclick = () => {
    if (subPreferencias && subPreferencias.classList.contains('expandido')) {
        sPrincipal.classList.remove('aberta'); 
        subPreferencias.classList.remove('expandido'); 
        return; 
    }
    resetarLayoutGeral();
    fecharSubMenus(); 
    sPrincipal.classList.add('aberta'); 
    if (subPreferencias) subPreferencias.classList.add('expandido'); 
    if (tPref) tPref.style.display = 'flex';
};
