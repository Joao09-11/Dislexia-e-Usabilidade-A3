// NAVEGAÇÃO PRINCIPAL (TELAS)
    //const é usada para criar variáveis que não mudam de "lugar"
        const sPrincipal = document.getElementById('sidebar-principal');
        const sPref = document.getElementById('sidebar-preferencias');

        const tLivros = document.getElementById('tela-livros');
        const tPref = document.getElementById('tela-preferencias');

// Navegação: Ir para Preferências
        document.getElementById('nav-ir-preferencias').onclick = () => {
            sPrincipal.style.display = 'none';
            tLivros.style.display = 'none';
            sPref.style.display = 'block';
            tPref.style.display = 'flex';
        }; //.display para esconder a tela e mostrar outra
            //.onclick fica esperando o usuario clicar no botão p fzr a função
            //() => {...} é arrow function 

// Navegação: Voltar logo
        const voltarHome = () => {
            sPref.style.display = 'none';
            tPref.style.display = 'none';
            sPrincipal.style.display = 'block';
            tLivros.style.display = 'grid';
        };
      
        document.getElementById('btn-logo-home').onclick = (e) => {
            e.preventDefault(); //'e' representa o clique. preventDefault() evita que a página recarregue ao cilcar no link.
            voltarHome(); //chama a função personalizada p/ troca as telas e mostrar a biblioteca
        };

// ABAS DE PREFERÊNCIA (Tipografia vs Cores)
        const abaTipo = document.getElementById('aba-tipografia');
        const abaCores = document.getElementById('aba-cores');
        const abaAudio = document.getElementById('aba-audio');

        const secaoTipo = document.getElementById('secao-tipografia');
        const secaoCores = document.getElementById('secao-cores');
        const secaoAudio = document.getElementById('secao-audio');

// Quando clica em Tipografia
        abaTipo.onclick = () => {
            abaTipo.classList.add('active'); // Coloca o tracinho laranja do lado
            abaCores.classList.remove('active');
            abaAudio.classList.remove('active');

            secaoTipo.style.display = 'block'; // Mostra as fontes
            secaoCores.style.display = 'none'; // Esconde as cores
            secaoAudio.style.display = 'none';
        };
        
// Quando clica em Cores e Contraste
        abaCores.onclick = () => {
            abaCores.classList.add('active');
            abaTipo.classList.remove('active');
            abaAudio.classList.remove('active');

            secaoCores.style.display = 'block'; // Mostra os temas
            secaoTipo.style.display = 'none';   // Esconde as fontes
            secaoAudio.style.display = 'none';
        };

// Quando clica em Áudio
        abaAudio.onclick = () => {
            abaAudio.classList.add('active');
            abaTipo.classList.remove('active');
            abaCores.classList.remove('active');
            
            secaoAudio.style.display = 'block'; // Mostra o áudio
            secaoTipo.style.display = 'none';   
            secaoCores.style.display = 'none';
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

    const texto = document.getElementById('texto-exemplo');
    let sz = 24, ls = 0.12, lh = 1.5;  //usamos let pq esse valores vão mudar
//sz tamanho atual, ls espaco da letra atual e lh espaco da linha atual //

        document.getElementById('aumentar-texto').onclick = () => { sz += 2; texto.style.fontSize = sz + 'px'; }; // aplica o novo tamanho ao CSS do texto
        // soma 2 ao valor atual da variavel 'sz' sz + 2 = sz
        document.getElementById('diminuir-texto').onclick = () => { if(sz > 12) sz -= 2; texto.style.fontSize = sz + 'px';};
                                                                            //sz = sz - 2;
        document.getElementById('aumentar-letras').onclick = () => { ls += 0.05; texto.style.letterSpacing = ls + 'em';};
        document.getElementById('diminuir-letras').onclick = () => { if(ls > 0) ls -= 0.05; texto.style.letterSpacing = ls + 'em';};

        document.getElementById('aumentar-linhas').onclick = () => { lh += 0.2; texto.style.lineHeight = lh;};
        document.getElementById('diminuir-linhas').onclick = () => { if(lh > 1.2) lh -= 0.2; texto.style.lineHeight = lh;};

        document.getElementById('align-left').onclick = () => {texto.style.textAlign = 'left';};
        document.getElementById('align-justify').onclick = () => {texto.style.textAlign = 'justify';};

        document.getElementById('seletor-fontes').onchange = (e) => { texto.style.fontFamily = e.target.value; };

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
const textoElemento = document.getElementById('texto-exemplo');
const textoOriginal = textoElemento.innerText; 

// 3. Ligar e Desligar o Marca-Texto
document.getElementById('destaque-on').onclick = () => { 
    marcaTextoAtivo = true;  
};
document.getElementById('destaque-off').onclick = () => { 
    marcaTextoAtivo = false; 
    textoElemento.innerHTML = textoOriginal; 
};

// 4. Botão Tocar
document.getElementById('btn-play').onclick = () => {
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

            textoElemento.innerHTML = antes + '<span class="palavra-destacada">' + palavra + '</span>' + depois;
        }
    };

    utterance.onend = () => { textoElemento.innerHTML = textoOriginal; };
    synth.speak(utterance);
};

// 5. Botão Pausar e Parar
document.getElementById('btn-pause').onclick = () => {
    if (synth.speaking) {
        if (synth.paused) synth.resume(); 
        else synth.pause(); 
    }
};
document.getElementById('btn-stop').onclick = () => {
    synth.cancel(); 
    textoElemento.innerHTML = textoOriginal; 
};

//Botões de Velocidade
document.getElementById('vel-lenta').onclick = () => { velocidadeAudio = 0.5;};
document.getElementById('vel-normal').onclick = () => { velocidadeAudio = 1.0;};
document.getElementById('vel-rapida').onclick = () => { velocidadeAudio = 1.5;};
document.getElementById('vel-rapida2x').onclick = () => { velocidadeAudio = 2.0;};

// Salvamento
const salvarPreferencias = () => {
    const configuracoes = {
        tamanho: sz,
        espaco: ls,
        altura: lh
        };
    localStorage.setItem('user_prefs', JSON.stringify(configuracoes));
};
document.getElementById('btn-salvar-pref').onclick = salvarPreferencias;

