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

// Ação do novo Botão Salvar (Com verificação de segurança)
const btnSalvar = document.getElementById('btn-salvar-pref');
if (btnSalvar) {
    btnSalvar.onclick = () => {
        localStorage.setItem('user_p', JSON.stringify({ tamanho: sz, espaco: ls, altura: lh }));
        
        // Mantém a cor visual escolhida salva também
        const classesBody = Array.from(document.body.classList);
        const temaAtivo = classesBody.find(c => c.startsWith('tema-'));
        if (temaAtivo) {
            localStorage.setItem('user_tema', temaAtivo);
        }
        
        alert("Suas preferências de acessibilidade foram salvas no navegador!");
    };
}