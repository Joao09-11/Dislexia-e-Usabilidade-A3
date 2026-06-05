let CATALOGO_LIVROS = [];
let BIBLIOTECAS_USUARIOS = {};

async function carregarDadosJSON() {
    try {
        const resposta = await fetch('JSON/dados.json');
        const dados = await resposta.json();
        
        CATALOGO_LIVROS = dados.catalogo;
        BIBLIOTECAS_USUARIOS = dados.bibliotecas;
        console.log("Sucesso: Os dados do JSON foram carregados!");
        
    } catch (erro) {
        console.error("Ops! Não foi possível carregar o banco de dados:", erro);
        const gridVitrine = document.getElementById('tela-livros');
        if (gridVitrine) {
            gridVitrine.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: red; font-weight: bold;">Erro de conexão: Não foi possível carregar os livros no momento.</p>`;
        }
    }
}