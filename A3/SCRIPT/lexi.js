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


// NAVEGAÇÃO PRINCIPAL E MENU DESLIZANTE
    const sPrincipal = document.getElementById('sidebar-principal'); //const é usada para criar variáveis que não mudam de "lugar"
    const sPref = document.getElementById('sidebar-preferencias');
    const sPesquisa = document.getElementById('sidebar-pesquisa');

    const tLivros = document.getElementById('tela-livros');
    const tPref = document.getElementById('tela-preferencias');
    const tPesquisa = document.getElementById('tela-pesquisar')

//Liga e Desliga o menu que estiver na tela
const btnAbrirMenu = document.getElementById('btn-abrir-menu');
if(btnAbrirMenu){
    btnAbrirMenu.onclick = () => {
        if (sPref.style.display === 'block') {
            sPref.classList.toggle('aberta');
        } else {
            sPrincipal.classList.toggle('aberta');
        }
    };
}

// Navegação para PESQUISAR
document.getElementById('nav-ir-pesquisar').onclick = () => {
    sPrincipal.style.display = 'none';
    sPrincipal.classList.remove('aberta'); // Fecha o menu lateral
    tLivros.style.display = 'none';
    tPref.style.display = 'none';

    sPesquisa.style.display = 'block';
    setTimeout(() => sPesquisa.classList.add('aberta', 10))
    tPesquisa.style.display = 'block'; // Mostra tela
};

// Navegação para BIBLIOTECA
document.getElementById('nav-ir-biblioteca').onclick = () => {
    sPrincipal.classList.remove('aberta');
    tPesquisa.style.display = 'none';
    tPref.style.display = 'none';
    tLivros.style.display = 'grid'; // Mostra os livros
};

// Ir para Preferências
document.getElementById('nav-ir-preferencias').onclick = () => {
    sPrincipal.style.display = 'none';
    sPrincipal.classList.remove('aberta');
    tLivros.style.display = 'none';
    
    sPref.style.display = 'block';
    setTimeout(() => sPref.classList.add('aberta'), 10);
    tPref.style.display = 'flex';
};

// Voltar da Pesquisa
const btnVoltarPesq = document.getElementById('btn-voltar-pesquisa');
if(btnVoltarPesq){
    btnVoltarPesq.onclick = () => {
        sPesquisa.style.display = 'none'; 
        sPesquisa.classList.remove('aberta');
        tPesquisa.style.display = 'none'; 

        sPrincipal.style.display = 'block';
        setTimeout(() => sPrincipal.classList.add('aberta'), 10);
        tLivros.style.display = 'grid';
    };
}

// O Botão de Voltar (Dentro das preferências)
const btnVoltarPref = document.getElementById('btn-voltar-pref');
if(btnVoltarPref){
    btnVoltarPref.onclick = () => {
        sPref.style.display = 'none'; //esconde p
        sPref.classList.remove('aberta');
        tPref.style.display = 'none'; 

        sPrincipal.style.display = 'block';
        setTimeout(() => sPrincipal.classList.add('aberta'),10);
        tLivros.style.display = 'grid';
    };
}

// Voltar logo      
    document.getElementById('btn-logo-home').onclick = (e) => {
        e.preventDefault(); //'e' representa o clique. preventDefault() evita que a página recarregue ao cilcar no link.
        sPref.style.display = 'none';
        sPref.classList.remove('aberta');
        tPref.style.display =  'none';

        sPrincipal.style.display = 'block';
        setTimeout(() => sPrincipal.classList.add('aberta'),10);
        tLivros.style.display = 'grid';
        };

// API DO GOOGLE BOOKS 

const btnBusca = document.querySelector('.btn-busca');
const inputBusca = document.querySelector('.input-busca');
const gridResultados = document.getElementById('resultados-google');

if (btnBusca && inputBusca && gridResultados) {
    btnBusca.onclick = async () => {
        const termo = inputBusca.value.trim(); 
        
        if (termo === "") {
            alert("Por favor, digita o nome de um livro para pesquisar!");
            return;
        }

        gridResultados.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-weight: bold;">A procurar no Google Livros... 🔍</p>';

        try {
            const resposta = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${termo}`);
            const dados = await resposta.json();

            gridResultados.innerHTML = ''; 

            if (dados.items && dados.items.length > 0) {
                const livrosAchados = dados.items.slice(0, 4);

                livrosAchados.forEach(item => {
                    const livro = item.volumeInfo;
                    const capa = livro.imageLinks ? livro.imageLinks.thumbnail : 'IMG/livro1.jpeg'; 
                    const titulo = livro.title;
                    const autor = livro.authors ? livro.authors[0] : 'Autor desconhecido';

                    const htmlDoCard = `
                        <article class="book-card" style="width: 100%;">
                            <div class="card-title-area" style="padding: 10px;">
                                <h3 style="font-size: 1.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${titulo}">${titulo}</h3>
                                <p style="font-size: 0.8rem;">${autor}</p>
                            </div>
                            <div class="card-body-area" style="padding: 10px;">
                                <div class="book-cover" style="height: 200px;">
                                    <img src="${capa}" alt="Capa" style="object-fit: cover; width: 100%; height: 100%;">
                                    <span class="tag-formato" style="background-color: var(--azul-profundo); border: 1px solid var(--areia);">GOOGLE LIVROS</span>
                                </div>
                            </div>
                        </article>
                    `;
                    gridResultados.innerHTML += htmlDoCard;
                });
            } else {
                gridResultados.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Nenhum livro encontrado. Tenta outro nome.</p>';
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro ao conectar com o Google. Verifica a tua internet.");
        }
    };
}


// ABAS DE PREFERÊNCIA
        const abaTipo = document.getElementById('aba-tipografia');
        const abaCores = document.getElementById('aba-cores');
        const abaAudio = document.getElementById('aba-audio');

        const secaoTipo = document.getElementById('secao-tipografia');
        const secaoCores = document.getElementById('secao-cores');
        const secaoAudio = document.getElementById('secao-audio');

        const resetarAbas = () => {
            abaTipo.classList.remove('active'); 
            abaCores.classList.remove('active');
            abaAudio.classList.remove('active');

            secaoTipo.style.display = 'none';
            secaoCores.style.display = 'none';
            secaoAudio.style.display = 'none';
        };

// Quando clica em Tipografia
        abaTipo.onclick = () => {
            resetarAbas();
            abaTipo.classList.add('active'); // Coloca o tracinho laranja do lado
            secaoTipo.style.display = 'block'; // Mostra as fontes
        };
// Quando clica em Cores e Contraste
        abaCores.onclick = () => {
            resetarAbas();
            abaCores.classList.add('active');
            secaoCores.style.display = 'block'; // Mostra os temas
        };
// Quando clica em Áudio
        abaAudio.onclick = () => {
            resetarAbas();
            abaAudio.classList.add('active');
            secaoAudio.style.display = 'block'; // Mostra o áudio
        };

// LÓGICA DE TEMAS DE CORES E BRILHO
const body = document.body;

//Função para limpar TODOS os temas antes de aplicar um novo
const limparTemas = () => {
    body.classList.remove('tema-caramelo', 'tema-barro', 'tema-arara', 'tema-cinza', 'tema-noturno');
};

document.getElementById('tema-padrao').onclick = limparTemas;
document.getElementById('tema-caramelo').onclick = () => { limparTemas(); body.classList.add('tema-caramelo'); };
document.getElementById('tema-barro').onclick = () => { limparTemas(); body.classList.add('tema-barro'); };
document.getElementById('tema-arara').onclick = () => { limparTemas(); body.classList.add('tema-arara'); };
document.getElementById('tema-cinza').onclick = () => { limparTemas(); body.classList.add('tema-cinza'); };
document.getElementById('tema-noturno').onclick = () => { limparTemas(); body.classList.add('tema-noturno'); };

// Controle da Barrinha de Brilho
const sliderBrilho = document.getElementById('slider-brilho');
const peliculaBrilho = document.getElementById('pelicula-brilho');

sliderBrilho.oninput = (e) => {
    peliculaBrilho.style.opacity = e.target.value;
};
       
// LÓGICA DE TEXTO
    document.getElementById('aumentar-texto').onclick = () => { sz += 2; texto.style.fontSize = sz + 'px'; }; // aplica o novo tamanho ao CSS do texto
        // soma 2 ao valor atual da variavel 'sz' sz + 2 = sz
    document.getElementById('diminuir-texto').onclick = () => { if(sz > 16) sz -= 2; texto.style.fontSize = sz + 'px';};
                                                           //sz = sz - 2;
    document.getElementById('aumentar-letras').onclick = () => { ls += 0.05; texto.style.letterSpacing = ls + 'em';};
    document.getElementById('diminuir-letras').onclick = () => { if(ls > 0) ls -= 0.05; texto.style.letterSpacing = ls + 'em';};
    document.getElementById('aumentar-linhas').onclick = () => { lh += 0.2; texto.style.lineHeight = lh;};
    document.getElementById('diminuir-linhas').onclick = () => { if(lh > 1.2) lh -= 0.2; texto.style.lineHeight = lh;};
    document.getElementById('align-left').onclick = () => {texto.style.textAlign = 'left';};
    document.getElementById('align-justify').onclick = () => {texto.style.textAlign = 'justify';};
    document.getElementById('seletor-fontes').onchange = (e) => { texto.style.fontFamily = e.target.value; };

    const btnEsq = document.getElementById('align-left');
    const btnJust = document.getElementById('align-justify');
    const botoesAlinhamento = [btnEsq, btnJust];

    btnEsq.onclick = () => { texto.style.textAlign = 'left'; ativarBotaoUnico(btnEsq, botoesAlinhamento);};
    btnJust.onclick = () => { texto.style.textAlign = 'justify'; ativarBotaoUnico(btnJust, botoesAlinhamento);};

// LÓGICA DE ÁUDIO 
const synth = window.speechSynthesis; 
let utterance = new SpeechSynthesisUtterance(); 
let velocidadeAudio = 1.0; 
let vozesPT = []; // Vai guardar as vozes em português

// 1.Acha as vozes do Windows/Mac/Chrome
const carregarVozes = () => {
    const vozesDisponiveis = synth.getVoices();
    const seletorVoz = document.getElementById('seletor-voz');
    
    vozesPT = vozesDisponiveis.filter(voz => voz.lang.includes('pt-BR') || voz.lang.includes('pt-PT'));// Filtra para pegar vozes do pt-BR
    
    if (vozesPT.length > 0) {
        seletorVoz.innerHTML = ''; // Limpa o "Carregando vozes..."

        vozesPT.forEach((voz, index) => {  // Coloca cada voz que achou
            const option = document.createElement('option');
            option.value = index;

            //Coloca aviso se for online e não conseguir marcar
            let aviso = "";
            if (!voz.localService) {
                aviso = " (Sem Marca-Texto)";
            } 

            option.textContent = voz.name + aviso; //o nome das vozes
            seletorVoz.appendChild(option);
        });
    } else {
        seletorVoz.innerHTML = '<option value="">Voz padrão do sistema</option>';
    }
};

carregarVozes(); //garante o carregamento
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = carregarVozes;
}

// 2. Variáveis do Marca-Texto
let marcaTextoAtivo = false;
const textoOriginal = texto.innerText; 

// Botões do Marca-Texto 
const btnDestOn = document.getElementById('destaque-on');
const btnDestOff = document.getElementById('destaque-off');
const botoesDestaque = [btnDestOn, btnDestOff];

btnDestOn.onclick = () => { marcaTextoAtivo = true; ativarBotaoUnico(btnDestOn, botoesDestaque); };
btnDestOff.onclick = () => { marcaTextoAtivo = false; texto.innerHTML = textoOriginal; ativarBotaoUnico(btnDestOff, botoesDestaque); };

// Selecionando os botões para a lista de ativação
const bPlay = document.getElementById('btn-play');
const bPause = document.getElementById('btn-pause');
const bStop = document.getElementById('btn-stop');
const botoesControle = [bPlay, bPause, bStop];

// 4. Botão Tocar
bPlay.onclick = () => {
    ativarBotaoUnico(bPlay, botoesControle);
    synth.cancel(); 
    
    utterance.text = textoOriginal;
    utterance.rate = velocidadeAudio; 
    
    const vozEscolhida = document.getElementById('seletor-voz').value; // Pega a voz que o usuário selecionou na caixinha
    if (vozEscolhida !== "" && vozesPT.length > 0) {
        utterance.voice = vozesPT[vozEscolhida]; // Aplica a voz 
    } else {
        utterance.lang = 'pt-BR'; // Se der erro, tenta forçar o BR
    }
    
// O Marca-texto
    utterance.onboundary = (event) => {
        if (marcaTextoAtivo && event.name === 'word') {
            const charIndex = event.charIndex;
            let endCharIndex = textoOriginal.indexOf(' ', charIndex);
            if (endCharIndex === -1) endCharIndex = textoOriginal.length;

            const antes = textoOriginal.substring(0, charIndex);
            const palavra = textoOriginal.substring(charIndex, endCharIndex);
            const depois = textoOriginal.substring(endCharIndex);

            texto.innerHTML = antes + '<span class="palavra-destacada">' + palavra + '</span>' + depois;
        }
    };

    utterance.onend = () => { 
        texto.innerHTML = textoOriginal;
        bPlay.classList.remove('btn-ativo');
    };
    synth.speak(utterance);
};

// 5. Botão Pausar
bPause.onclick = () => {
    if (synth.speaking) {
        if (synth.paused) {
            synth.resume();
            ativarBotaoUnico(bPlay, botoesControle); 
        }else{ 
            synth.pause();
            ativarBotaoUnico(bPause, botoesControle);
        } 
    }
};

//Botão Parar
bStop.onclick = () => {
    synth.cancel(); 
    texto.innerHTML = textoOriginal; 
    botoesControle.forEach(b => b.classList.remove('btn-ativo'));
};

//Botões de Velocidade
const bLenta = document.getElementById('vel-lenta');
const bNormal = document.getElementById('vel-normal');
const bRapida = document.getElementById('vel-rapida');
const bRapida2 = document.getElementById('vel-rapida2x');
const botoesVelocidade = [bLenta, bNormal, bRapida, bRapida2];

bLenta.onclick = () => { velocidadeAudio = 0.5; ativarBotaoUnico(bLenta, botoesVelocidade); };
bNormal.onclick = () => { velocidadeAudio = 1.0; ativarBotaoUnico(bNormal, botoesVelocidade); };
bRapida.onclick = () => { velocidadeAudio = 1.5; ativarBotaoUnico(bRapida, botoesVelocidade); };
bRapida2.onclick = () => { velocidadeAudio = 2.0; ativarBotaoUnico(bRapida2, botoesVelocidade); };

// Salvamento
const salvarPreferencias = () => {
    const configuracoes = {
        tamanho: sz,
        espaco: ls,
        altura: lh
        };
    localStorage.setItem('user_p', JSON.stringify(configuracoes));
    alert("Preferências salvas com sucesso!");
};
document.getElementById('btn-salvar-pref').onclick = salvarPreferencias;

// BANCO DE DADOS 

// Nossa lista de livros (Array de Objetos) com todas as propriedades
const acervoLivros = [
    // PERFIL DA SANDY (perfil1)
    { titulo: "A Revolução dos Bichos", autor: "George Orwell", capa: "IMG/ficcao/ArevolucaoDosBichos.jpeg", formato: "KINDLE", dono: "perfil1" },
    { titulo: "1984", autor: "George Orwell", capa: "IMG/ficcao/1984.jpeg", formato: "GOOGLE LIVROS", dono: "perfil1"},
    { titulo: "O amanhã não está à venda", autor: "Ailton Krenak", capa: "IMG/filosofia/oAmanhaNaoEstaAvenda.jpeg", formato: "GOOGLE LIVROS", dono: "perfil1"},
    { titulo: "A Hora da Estrela", autor: "Clarice Lispector", capa: "IMG/classicos/aHoraDaEstrela.jpeg", formato: "KINDLE", dono: "perfil1" },
    { titulo: "O Alienista", autor: "Machado de Assis", capa: "IMG/classicos/oAlienista.jpeg", formato: "GOOGLE LIVROS", dono: "perfil1"},
    { titulo: "Mulheres, cultura e política", autor: "Angela Davis", capa: "IMG/sociedade/mulheresCulturaEpolitica.jpeg", formato: "KINDLE", dono: "perfil1" },
    { titulo: "Não me faça pensar", autor: "Steve Krug", capa: "IMG/ensino/naoMeFacaPensar.jpeg", formato: "PDF", dono: "perfil1" },
    { titulo: "Edital Concurso 2026", autor: "Documento Oficial", capa: "IMG/documentos/edital.jpeg", formato: "PDF", dono: "perfil1" },
    { titulo: "Livro Didático", autor: "Escolar", capa: "IMG/documentos/livroEscola.jpeg", formato: "PDF", dono: "perfil1" },

    // CATÁLOGO GERAL (Deslogado)
    { titulo: "O Iluminado", autor: "Stephen King", capa: "IMG/terror/oIluminado.jpeg", formato: "KINDLE", dono: "geral" },
    { titulo: "Apostila Curso", autor: "Material Didático", capa: "IMG/ensino/apostilaEnem.png", formato: "PDF", dono: "geral" },
    { titulo: "Crepúsculo", autor: "Stephenie Meyer", capa: "IMG/romance/crepusculo.jpeg", formato: "KINDLE", dono: "geral" },
    { titulo: "Tudo sobre o amor", autor: "bell hooks", capa: "IMG/sociedade/tudoSobreOamor.jpeg", formato: "PDF", dono: "geral" }
];

// Função que desenha os livros na tela baseada no dono
const renderizarBiblioteca = (tipoUsuario) => {
    const grid = document.getElementById('tela-livros');
    if (!grid) return;
    
    grid.innerHTML = ""; // Limpa a tela antes de desenhar

    // Usando o filter() do JavaScript para pegar só os livros certos
    const livrosFiltrados = acervoLivros.filter(livro => livro.dono === tipoUsuario);

    // Usando o forEach() para criar o HTML de cada livro
    livrosFiltrados.forEach(livro => {
        
        // Monta o HTML do card com a classe com-resumo ativada
        const cardHTML = `
            <article class="book-card com-resumo">
                <div class="card-title-area">
                    <h3 style="font-size: 1.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${livro.titulo}">${livro.titulo}</h3>
                    <p>${livro.autor}</p>
                </div>                    
                <div class="card-body-area">
                    <div class="book-cover">
                        <img src="${livro.capa}" alt="Capa ${livro.titulo}">
                        <span class="tag-formato">${livro.formato}</span>
                        
                        <div class="resumo-overlay">
                            <p>Clique para acessar as configurações e leitura de "${livro.titulo}".</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
        
        grid.innerHTML += cardHTML; // Joga na tela!
    });
};

// ==========================================
// 11. VERIFICAR LOGIN E CHAMAR A RENDERIZAÇÃO
// ==========================================
window.addEventListener('load', () => {
    
    // Função para atualizar o cabeçalho (Header)
    const atualizarCabecalho = (nome) => {
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            headerRight.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; cursor: pointer; background-color: var(--azul-profundo); padding: 6px; border-radius: 30px;">
                    <img src="IMG/perfil-1.png" alt="Foto de Perfil" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;">
                </div>
            `;
        }
    };

    // Lógica de verificação
    if (localStorage.getItem('fazerLogin') === 'sim') {
        const nome = localStorage.getItem('usuarioNome') || 'Sandy';
        alert(`Bem-vinda de novo, ${nome}!`);
        
        atualizarCabecalho(nome);
        renderizarBiblioteca('perfil1'); // Desenha os livros da Sandy
        
        localStorage.removeItem('fazerLogin');
        localStorage.setItem('sessaoAtiva', 'sim');
        
    } else if (localStorage.getItem('sessaoAtiva') === 'sim') {
        const nome = localStorage.getItem('usuarioNome') || 'Sandy';
        atualizarCabecalho(nome);
        renderizarBiblioteca('perfil1'); // Desenha os livros da Sandy sem o alert
        
    } else {
        // Se ninguém logou, desenha o catálogo geral
        renderizarBiblioteca('geral');
    }
});