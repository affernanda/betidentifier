// ===============================
// BANCO DE PALAVRAS
// ===============================

let bancoPalavras = [];

const PONTUACAO_MINIMA_REMOCAO = 5;

let observerAtivo = null;

let temporizadorAnalise = null;


// ===============================
// FUNÇÃO PARA NORMALIZAR TEXTO
// ===============================

function normalizarTexto(texto) {
    texto = String(texto || "");

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ===============================
// FUNÇÃO PARA ESCAPAR REGEX
// ===============================

function escaparRegex(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


// ===============================
// FUNÇÃO PARA VERIFICAR SE O TEXTO CONTÉM UM TERMO
// ===============================

function contemTermo(texto, termo) {
    if (!texto || !termo) return false;

    const textoNormalizado = normalizarTexto(texto);
    const termoNormalizado = normalizarTexto(termo);
    const termoEscapado = escaparRegex(termoNormalizado);

    if (termoNormalizado.includes(" ")) {
        return textoNormalizado.includes(termoNormalizado);
    }

    const regex = new RegExp(`(^|[^a-z0-9])${termoEscapado}([^a-z0-9]|$)`, "i");

    return regex.test(textoNormalizado);
}


// ===============================
// FUNÇÃO PARA CALCULAR A PONTUAÇÃO
// ===============================

function calcularPontuacao(texto) {
    let pontuacao = 0;
    let encontrados = [];

    bancoPalavras.forEach((item) => {
        if (!item.ativo) return;

        if (contemTermo(texto, item.termo)) {
            const peso = Number(item.peso) || 0;

            pontuacao += peso;

            encontrados.push({
                termo: item.termo,
                peso: peso
            });
        }
    });

    return {
        pontuacao,
        encontrados
    };
}


// ===============================
// FUNÇÃO PARA PEGAR TEXTO DO ELEMENTO
// ===============================

function pegarTextoElemento(elemento) {
    if (!elemento) return "";
    return elemento.innerText || elemento.textContent || "";
}


// ===============================
// FUNÇÃO PARA PEGAR TEXTO DO ALT DA IMAGEM
// ===============================

function pegarTextoAltImagem(img) {
    if (!img) return "";

    const textos = [
        img.getAttribute("alt"),
        img.getAttribute("title"),
        img.getAttribute("aria-label")
    ];

    return textos
        .filter(Boolean)
        .join(" ")
        .trim();
}


// ===============================
// FUNÇÃO PARA VERIFICAR SE ELEMENTO ESTÁ VISÍVEL
// ===============================

function elementoVisivel(elemento) {
    if (!elemento) return false;

    const estilo = window.getComputedStyle(elemento);
    const rect = elemento.getBoundingClientRect();

    return (
        estilo.display !== "none" &&
        estilo.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
    );
}


// ===============================
// FUNÇÃO PARA VERIFICAR SE ESTÁ NO INSTAGRAM
// ===============================

function estaNoInstagram() {
    return location.hostname.includes("instagram.com");
}


// ===============================
// FUNÇÃO PARA ENCONTRAR POST DO INSTAGRAM
// USADO APENAS PARA IMAGENS / ALT / OCR
// ===============================

function encontrarPostInstagram(elemento) {
    if (!elemento) return null;

    const artigo = elemento.closest("article");

    if (artigo && elementoVisivel(artigo)) {
        return artigo;
    }

    const dialog = elemento.closest("div[role='dialog']");

    if (dialog && elementoVisivel(dialog)) {
        const artigoDentroDialog = dialog.querySelector("article");

        if (artigoDentroDialog && elementoVisivel(artigoDentroDialog)) {
            return artigoDentroDialog;
        }

        return dialog;
    }

    return null;
}


// ===============================
// FUNÇÃO PARA ENCONTRAR BLOCO GENÉRICO OFENSOR
// ===============================

function encontrarBlocoOfensor(elemento) {
    let melhorBloco = elemento;

    let textoMelhorBloco = pegarTextoElemento(melhorBloco).trim();

    let pai = elemento.parentElement;

    while (pai && pai !== document.body && pai !== document.documentElement) {
        if (!elementoVisivel(pai)) break;

        const textoPai = pegarTextoElemento(pai).trim();
        const rectPai = pai.getBoundingClientRect();

        const areaTela = window.innerWidth * window.innerHeight;
        const areaPai = rectPai.width * rectPai.height;

        const crescimentoTexto =
            textoMelhorBloco.length > 0
                ? textoPai.length / textoMelhorBloco.length
                : 999;

        const paiGrandeDemais =
            rectPai.width > window.innerWidth * 0.9 ||
            rectPai.height > window.innerHeight * 0.8 ||
            areaPai > areaTela * 0.45;

        const paiPareceContainer = crescimentoTexto > 1.8;

        if (paiGrandeDemais || paiPareceContainer) {
            break;
        }

        melhorBloco = pai;
        textoMelhorBloco = textoPai;
        pai = pai.parentElement;
    }

    return melhorBloco;
}


// ===============================
// FUNÇÃO PARA ENCONTRAR BLOCO RELACIONADO À IMAGEM
// USADO PARA ALT E OCR
// ===============================

function encontrarBlocoRelacionadoImagem(elemento) {
    if (!elemento) return null;

    if (estaNoInstagram()) {
        const postInstagram = encontrarPostInstagram(elemento);

        if (postInstagram) {
            return postInstagram;
        }
    }

    const link = elemento.closest("a");

    if (link && elementoVisivel(link)) {
        return link;
    }

    const blocoImagem = elemento.closest("figure, picture");

    if (blocoImagem && elementoVisivel(blocoImagem)) {
        return blocoImagem;
    }

    return elemento;
}


// ===============================
// FUNÇÃO PARA REMOVER ELEMENTO
// ===============================

function removerElemento(elemento, resultado, motivo = "texto") {
    if (!elemento) return;

    if (!elemento.isConnected) return;

    console.warn(`[BLOQUEADO] Elemento removido da página por ${motivo}.`);
    console.warn("[BLOQUEADO] Pontuação total:", resultado.pontuacao);
    console.warn("[BLOQUEADO] Palavras encontradas:", resultado.encontrados);
    console.warn("[BLOQUEADO] Elemento:", elemento);

    elemento.remove();
}


// ===============================
// FUNÇÃO PARA ANALISAR UM ELEMENTO DE TEXTO
// TEXTO / LEGENDA / COMENTÁRIO REMOVE SÓ O PRÓPRIO TEXTO
// ===============================

function analisarElemento(elemento) {
    if (!elemento) return;

    if (!elementoVisivel(elemento)) return;

    if (elemento.dataset.analisadoApostas === "true") return;

    elemento.dataset.analisadoApostas = "true";

    const texto = pegarTextoElemento(elemento);

    if (!texto.trim()) return;

    const resultado = calcularPontuacao(texto);

    console.log("[ANÁLISE] Elemento analisado:", elemento);
    console.log("[ANÁLISE] Texto analisado:", texto);
    console.log("[ANÁLISE] Pontuação calculada:", resultado.pontuacao);
    console.log("[ANÁLISE] Palavras encontradas:", resultado.encontrados);

    if (resultado.pontuacao >= PONTUACAO_MINIMA_REMOCAO) {
        console.warn("[DECISÃO] Bloqueio aplicado.");
        console.warn(
            `[DECISÃO] Motivo: pontuação ${resultado.pontuacao} >= ${PONTUACAO_MINIMA_REMOCAO}`
        );

        removerElemento(elemento, resultado, "texto/legenda/comentário ofensivo");
    } else {
        console.log("[DECISÃO] Elemento mantido.");
        console.log(
            `[DECISÃO] Motivo: pontuação ${resultado.pontuacao} < ${PONTUACAO_MINIMA_REMOCAO}`
        );
    }
}


// ===============================
// FUNÇÃO PARA ANALISAR ALT DE UMA IMAGEM
// ALT OFENSIVO REMOVE A IMAGEM / POST RELACIONADO
// ===============================

function analisarAltImagem(img) {
    if (!img) return false;

    if (!elementoVisivel(img)) return false;

    if (img.dataset.altAnalisadoApostas === "true") return false;

    img.dataset.altAnalisadoApostas = "true";

    const textoAlt = pegarTextoAltImagem(img);

    if (!textoAlt.trim()) return false;

    const resultado = calcularPontuacao(textoAlt);

    console.log("[ALT ANÁLISE] Imagem analisada:", img);
    console.log("[ALT ANÁLISE] Texto ALT:", textoAlt);
    console.log("[ALT ANÁLISE] Pontuação:", resultado.pontuacao);
    console.log("[ALT ANÁLISE] Termos encontrados:", resultado.encontrados);

    if (resultado.pontuacao >= PONTUACAO_MINIMA_REMOCAO) {
        console.warn("[ALT DECISÃO] BLOQUEAR IMAGEM/POST");
        console.warn(
            `[ALT DECISÃO] Pontuação ${resultado.pontuacao} >= ${PONTUACAO_MINIMA_REMOCAO}`
        );

        const blocoRelacionado = encontrarBlocoRelacionadoImagem(img);

        removerElemento(blocoRelacionado, resultado, "alt ofensivo da imagem");

        return true;
    }

    console.log("[ALT DECISÃO] Imagem mantida.");
    return false;
}


// ===============================
// FUNÇÃO PARA ANALISAR TODAS AS IMAGENS PELO ALT
// ===============================

function analisarAltDasImagensDaPagina() {
    console.log("[ALT PÁGINA] Iniciando análise de ALT das imagens...");

    const imagens = document.querySelectorAll("img");

    console.log("[ALT PÁGINA] Total de imagens encontradas:", imagens.length);

    imagens.forEach((img) => {
        analisarAltImagem(img);
    });

    console.log("[ALT PÁGINA] Análise de ALT finalizada.");
}


// ===============================
// FUNÇÃO PARA ANALISAR A PÁGINA
// ===============================

async function analisarPagina() {
    if (!document.body) return;

    console.log("[PÁGINA] Iniciando análise da página...");

    const elementos = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, span, a, strong, em, small, button"
    );

    console.log("[PÁGINA] Total de elementos encontrados:", elementos.length);

    elementos.forEach((elemento) => {
        analisarElemento(elemento);
    });

    analisarAltDasImagensDaPagina();

    await analisarImagensDaPaginaComOCR();

    console.log("[PÁGINA] Análise da página finalizada.");
}


// ===============================
// FUNÇÃO PARA CARREGAR BANCO DE PALAVRAS
// ===============================

function carregarBancoPalavras() {
    chrome.storage.local.get(["bancoPalavras"], async (resultado) => {
        bancoPalavras = resultado.bancoPalavras || [];

        console.log("[BANCO] Banco de palavras carregado:", bancoPalavras);
        console.log("[BANCO] Total de palavras no banco:", bancoPalavras.length);

        await analisarPagina();

        observarMudancasNaPagina();
    });
}


// ===============================
// FUNÇÃO PARA OBSERVAR MUDANÇAS NA PÁGINA
// ===============================

function observarMudancasNaPagina() {
    if (observerAtivo) return;

    observerAtivo = new MutationObserver(() => {
        clearTimeout(temporizadorAnalise);

        temporizadorAnalise = setTimeout(() => {
            console.log("[MUDANÇA] Alteração detectada na página. Reanalisando...");
            analisarPagina();
        }, 500);
    });

    observerAtivo.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("[OBSERVADOR] Monitoramento de mudanças ativado.");
}


// ===============================
// CONFIGURAÇÕES DO OCR
// ===============================

const OCR_ATIVO = true;

const LARGURA_MINIMA_IMAGEM_OCR = 40;
const ALTURA_MINIMA_IMAGEM_OCR = 20;


// ===============================
// VERIFICA SE A IMAGEM PODE SER ANALISADA
// ===============================

function deveAnalisarImagem(img) {
    if (!OCR_ATIVO) return false;

    if (!img) return false;

    if (!img.isConnected) return false;

    if (img.dataset.ocrAnalisado === "true") return false;

    const src = img.currentSrc || img.src || "";

    if (!src) {
        console.log("[OCR IGNORADO] Imagem sem src:", img);
        return false;
    }

    const largura = img.naturalWidth || img.width || img.offsetWidth || 0;
    const altura = img.naturalHeight || img.height || img.offsetHeight || 0;

    if (largura < LARGURA_MINIMA_IMAGEM_OCR || altura < ALTURA_MINIMA_IMAGEM_OCR) {
        console.log("[OCR IGNORADO] Imagem muito pequena:", {
            largura,
            altura,
            img
        });

        return false;
    }

    return true;
}


// ===============================
// REMOVE IMAGEM OU BLOCO RELACIONADO
// OCR OFENSIVO REMOVE A IMAGEM / POST RELACIONADO
// ===============================

function removerImagemRelacionada(img, resultado) {
    console.warn("[OCR BLOQUEADO] Imagem bloqueada.");
    console.warn("[OCR BLOQUEADO] Pontuação:", resultado.pontuacao);
    console.warn("[OCR BLOQUEADO] Termos encontrados:", resultado.encontrados);
    console.warn("[OCR BLOQUEADO] Imagem:", img);

    const blocoRelacionado = encontrarBlocoRelacionadoImagem(img);

    if (blocoRelacionado) {
        removerElemento(blocoRelacionado, resultado, "OCR ofensivo da imagem");
        return;
    }

    img.remove();
}


// ===============================
// ANALISA UMA IMAGEM COM OCR
// ===============================

async function analisarImagemComOCR(img) {
    if (!deveAnalisarImagem(img)) return;

    img.dataset.ocrAnalisado = "true";

    console.log("--------------------------------------");
    console.log("[OCR ANÁLISE] Imagem candidata:", img);

    if (!window.ConsciousOCR) {
        console.error("[OCR] ocr.js não foi carregado corretamente.");
        return;
    }

    const textoOCR = await window.ConsciousOCR.extrairTextoDaImagem(img);

    if (!textoOCR.trim()) {
        console.log("[OCR DECISÃO] Nenhum texto encontrado. Imagem mantida.");
        return;
    }

    const resultado = calcularPontuacao(textoOCR);

    console.log("[OCR ANÁLISE] Texto extraído:", textoOCR);
    console.log("[OCR ANÁLISE] Pontuação:", resultado.pontuacao);
    console.log("[OCR ANÁLISE] Termos encontrados:", resultado.encontrados);

    if (resultado.pontuacao >= PONTUACAO_MINIMA_REMOCAO) {
        console.warn("[OCR DECISÃO] BLOQUEAR IMAGEM");
        console.warn(
            `[OCR DECISÃO] Pontuação ${resultado.pontuacao} >= ${PONTUACAO_MINIMA_REMOCAO}`
        );

        removerImagemRelacionada(img, resultado);
    } else {
        console.log("[OCR DECISÃO] NÃO BLOQUEAR IMAGEM");
        console.log(
            `[OCR DECISÃO] Pontuação ${resultado.pontuacao} < ${PONTUACAO_MINIMA_REMOCAO}`
        );
    }
}


// ===============================
// ANALISA TODAS AS IMAGENS COM OCR
// CHAMADA APENAS DEPOIS DA ANÁLISE DE TEXTO E ALT
// ===============================

async function analisarImagensDaPaginaComOCR() {
    if (!OCR_ATIVO) return;

    console.log("[OCR PÁGINA] Iniciando análise de imagens após texto e ALT...");

    const imagens = document.querySelectorAll("img");

    console.log("[OCR PÁGINA] Total de imagens encontradas:", imagens.length);

    for (const img of imagens) {
        await analisarImagemComOCR(img);
    }

    console.log("[OCR PÁGINA] Análise de imagens finalizada.");
}


// ===============================
// INÍCIO DA EXECUÇÃO
// ===============================

carregarBancoPalavras();