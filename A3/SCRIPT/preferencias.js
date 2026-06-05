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

abaTipo.onclick = () => {
resetarAbas();
abaTipo.classList.add('active');
secaoTipo.style.display = 'block';
};
abaCores.onclick = () => {
resetarAbas();
abaCores.classList.add('active');
secaoCores.style.display = 'block';
};
abaAudio.onclick = () => {
resetarAbas();
abaAudio.classList.add('active');
secaoAudio.style.display = 'block';
};

const body = document.body;

const limparTemas = () => {
    body.classList.remove('tema-caramelo', 'tema-barro', 'tema-arara', 'tema-cinza', 'tema-noturno', 'tema-daltonico');
};

document.getElementById('tema-padrao').onclick = limparTemas;
document.getElementById('tema-caramelo').onclick = () => { limparTemas(); body.classList.add('tema-caramelo'); };
document.getElementById('tema-barro').onclick = () => { limparTemas(); body.classList.add('tema-barro'); };
document.getElementById('tema-arara').onclick = () => { limparTemas(); body.classList.add('tema-arara'); };
document.getElementById('tema-cinza').onclick = () => { limparTemas(); body.classList.add('tema-cinza'); };
document.getElementById('tema-noturno').onclick = () => { limparTemas(); body.classList.add('tema-noturno'); };
document.getElementById('tema-daltonico').onclick = () => { limparTemas(); body.classList.add('tema-daltonico'); };

const sliderBrilho = document.getElementById('slider-brilho');
const peliculaBrilho = document.getElementById('pelicula-brilho');

sliderBrilho.oninput = (e) => {
    peliculaBrilho.style.opacity = e.target.value;
};

document.getElementById('aumentar-texto').onclick = () => { sz += 2; texto.style.fontSize = sz + 'px'; };
document.getElementById('diminuir-texto').onclick = () => { if(sz > 16) sz -= 2; texto.style.fontSize = sz + 'px';};
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

const synth = window.speechSynthesis; 
let utterance = new SpeechSynthesisUtterance(); 
let velocidadeAudio = 1.0; 
let vozesPT = [];

const carregarVozes = () => {
    const vozesDisponiveis = synth.getVoices();
    const seletorVoz = document.getElementById('seletor-voz');
    vozesPT = vozesDisponiveis.filter(voz => voz.lang.includes('pt-BR') || voz.lang.includes('pt-PT'));
    if (vozesPT.length > 0) {
        seletorVoz.innerHTML = ''; 
        vozesPT.forEach((voz, index) => {  
            const option = document.createElement('option');
            option.value = index;
            let aviso = "";
            if (!voz.localService) {
                aviso = " (Sem Marca-Texto)";
            } 
            option.textContent = voz.name + aviso;
            seletorVoz.appendChild(option);
        });
    } else {
        seletorVoz.innerHTML = '<option value="">Voz padrão do sistema</option>';
    }
};

carregarVozes();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = carregarVozes;
}

let marcaTextoAtivo = false;
const textoOriginal = texto.innerText; 
const btnDestOn = document.getElementById('destaque-on');
const btnDestOff = document.getElementById('destaque-off');
const botoesDestaque = [btnDestOn, btnDestOff];

btnDestOn.onclick = () => { marcaTextoAtivo = true; ativarBotaoUnico(btnDestOn, botoesDestaque); };
btnDestOff.onclick = () => { marcaTextoAtivo = false; texto.innerHTML = textoOriginal; ativarBotaoUnico(btnDestOff, botoesDestaque); };

const bPlay = document.getElementById('btn-play');
const bPause = document.getElementById('btn-pause');
const bStop = document.getElementById('btn-stop');
const botoesControle = [bPlay, bPause, bStop];

bPlay.onclick = () => {
    ativarBotaoUnico(bPlay, botoesControle);
    synth.cancel(); 
    utterance.text = textoOriginal;
    utterance.rate = velocidadeAudio; 
    const vozEscolhida = document.getElementById('seletor-voz').value;
    if (vozEscolhida !== "" && vozesPT.length > 0) {
        utterance.voice = vozesPT[vozEscolhida];
    } else {
        utterance.lang = 'pt-BR';
    }
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

bStop.onclick = () => {
    synth.cancel(); 
    texto.innerHTML = textoOriginal; 
    botoesControle.forEach(b => b.classList.remove('btn-ativo'));
};

const bLenta = document.getElementById('vel-lenta');
const bNormal = document.getElementById('vel-normal');
const bRapida = document.getElementById('vel-rapida');
const bRapida2 = document.getElementById('vel-rapida2x');
const botoesVelocidade = [bLenta, bNormal, bRapida, bRapida2];

bLenta.onclick = () => { velocidadeAudio = 0.5; ativarBotaoUnico(bLenta, botoesVelocidade); };
bNormal.onclick = () => { velocidadeAudio = 1.0; ativarBotaoUnico(bNormal, botoesVelocidade); };
bRapida.onclick = () => { velocidadeAudio = 1.5; ativarBotaoUnico(bRapida, botoesVelocidade); };
bRapida2.onclick = () => { velocidadeAudio = 2.0; ativarBotaoUnico(bRapida2, botoesVelocidade); };

const btnSalvar = document.getElementById('btn-salvar-pref');
const btnResetar = document.getElementById('btn-resetar-pref');
if (btnSalvar) {
    btnSalvar.onclick = () => {
        const estaLogado = localStorage.getItem('sessaoAtiva') === 'sim';
        if (!estaLogado) {
            alert("Atenção: Você precisa estar conectado a uma conta para salvar suas preferências!");
            return;
        }
        localStorage.setItem('user_p', JSON.stringify({ tamanho: sz, espaco: ls, altura: lh }));
        const classesBody = Array.from(document.body.classList);
        const temaAtivo = classesBody.find(c => c.startsWith('tema-'));
        if (temaAtivo) localStorage.setItem('user_tema', temaAtivo);
        alert("Suas preferências foram salvas com sucesso!");
    };
}
if (btnResetar) {
    btnResetar.onclick = () => {
        sz = 14; 
        ls = 0.05; 
        lh = 1.5;
        marcaTextoAtivo = false;
        velocidadeAudio = 1.0;       
        if (texto) {
            texto.style.fontSize = sz + 'px';
            texto.style.letterSpacing = ls + 'em';
            texto.style.lineHeight = lh;
            texto.style.textAlign = 'left';
            texto.style.fontFamily = "'Verdana', sans-serif";
            texto.innerHTML = textoOriginal;
        }
        const seletorFontes = document.getElementById('seletor-fontes');
        if (seletorFontes) seletorFontes.value = 'Verdana';     
        const seletorVoz = document.getElementById('seletor-voz');
        if (seletorVoz && vozesPT.length > 0) seletorVoz.value = 0;
        const sliderBrilho = document.getElementById('slider-brilho');
        const peliculaBrilho = document.getElementById('pelicula-brilho');
        if (sliderBrilho) sliderBrilho.value = 0;
        if (peliculaBrilho) peliculaBrilho.style.opacity = 0;
        limparTemas();
    
        ativarBotaoUnico(document.getElementById('align-left'), botoesAlinhamento);
        ativarBotaoUnico(document.getElementById('destaque-off'), botoesDestaque);
        ativarBotaoUnico(document.getElementById('vel-normal'), botoesVelocidade);
        botoesControle.forEach(b => b.classList.remove('btn-ativo'));

        localStorage.removeItem('user_p');
        localStorage.removeItem('user_tema'); 
        alert("AS preferências foram restauradas - Padrão Lexi!");
    };
}
(() => {
    const memoriaPreferencias = localStorage.getItem('user_p');
    const memoriaTema = localStorage.getItem('user_tema');

    if (memoriaPreferencias) {
        const p = JSON.parse(memoriaPreferencias);
        sz = p.tamanho; ls = p.espaco; lh = p.altura;
        
        if (texto) {
            texto.style.fontSize = sz + 'px';
            texto.style.letterSpacing = ls + 'em';
            texto.style.lineHeight = lh;
        }
    }

    if (memoriaTema) {
        limparTemas();
        document.body.classList.add(memoriaTema);
    }
})();