// ==========================
// CONFIGURAÇÕES PRINCIPAIS
// ==========================

// Palavras realmente relacionadas a apostas para texto normal da página
const palavrasBloqueadas = [
    "bet",
    "bets",
    "aposta",
    "apostas",
    "cassino",
    "cassinos",
    "casino",
    "gambling",
    "gamble",
    "tigrinho",
    "fortune tiger",
    "betano",
    "bet365",
    "blaze",
    "roleta",
    "jogue e ganhe",
    "jogue agora",
    "luck.bet",
    "luck bet",
    "aviator",
    "dinheiro fácil",
    "dinheiro facil"
];

// Indicadores genéricos de anúncio.
// Eles NÃO removem nada sozinhos.
// Servem apenas para decidir se vale rodar OCR em uma imagem.
const indicadoresDeAnuncio = [
    "ad",
    "ads",
    "advert",
    "advertisement",
    "banner",
    "sponsor",
    "sponsored",
    "promo",
    "publicidade",
    "anuncio",
    "anúncio"
];

// Regras de pontuação para OCR.
// Termos fortes valem mais; termos genéricos valem pouco.
const regrasOCR = [
    { termo: "bet", peso: 5 },
    { termo: "bets", peso: 5 },
    { termo: "aposta", peso: 5 },
    { termo: "apostas", peso: 5 },
    { termo: "cassino", peso: 5 },
    { termo: "cassinos", peso: 5 },
    { termo: "casino", peso: 5 },
    { termo: "gambling", peso: 5 },
    { termo: "gamble", peso: 5 },
    { termo: "bet365", peso: 6 },
    { termo: "betano", peso: 6 },
    { termo: "blaze", peso: 5 },
    { termo: "tigrinho", peso: 5 },
    { termo: "fortune tiger", peso: 5 },
    { termo: "luck.bet", peso: 5 },
    { termo: "luck bet", peso: 5 },
    { termo: "aviator", peso: 4 },
    { termo: "roleta", peso: 4 },
    { termo: "jogue agora", peso: 4 },
    { termo: "jogue e ganhe", peso: 4 },

    // Termos mais genéricos: não devem remover sozinhos
    { termo: "jogue", peso: 2 },
    { termo: "ganhe", peso: 2 },
    { termo: "bonus", peso: 2 },
    { termo: "bônus", peso: 2 },
    { termo: "pix", peso: 1 },
    { termo: "pagamento", peso: 3 },
    { termo: "centavos", peso: 2 },
    { termo: "milhoes", peso: 1 },
    { termo: "milhões", peso: 1 },
    { termo: "fature", peso: 2 },
    { termo: "dinheiro", peso: 2 }
];

// Pontuação mínima para remover imagem por OCR
const SCORE_MINIMO_OCR = 5;

// Controle de OCR simultâneo
let ocrEmExecucao = 0;
const LIMITE_OCR_SIMULTANEO = 2;

// ==========================
// FUNÇÕES AUXILIARES
// ==========================

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function escaparRegex(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Verifica termo como palavra/frase, evitando "bet" dentro de "between"
function contemTermo(texto, termo) {
    if (!texto || !termo) return false;

    const textoNormalizado = normalizarTexto(texto);
    const termoNormalizado = normalizarTexto(termo);
    const termoEscapado = escaparRegex(termoNormalizado);

    // Para frases, permite separadores simples entre palavras
    if (termoNormalizado.includes(" ")) {
        return textoNormalizado.includes(termoNormalizado);
    }

    const regex = new RegExp(`(^|[^a-z0-9])${termoEscapado}([^a-z0-9]|$)`, "i");
    return regex.test(textoNormalizado);
}

// Verifica palavras bloqueadas em texto normal
function contem(texto) {
    if (!texto) return false;

    return palavrasBloqueadas.some(palavra =>
        contemTermo(texto, palavra)
    );
}

// Verifica apenas se parece anúncio, sem remover
function pareceAnuncio(texto) {
    if (!texto) return false;

    return indicadoresDeAnuncio.some(indicador =>
        contemTermo(texto, indicador)
    );
}

// Calcula score do OCR
function calcularScoreOCR(texto) {
    let score = 0;
    const termosEncontrados = [];

    regrasOCR.forEach(regra => {
        if (contemTermo(texto, regra.termo)) {
            score += regra.peso;
            termosEncontrados.push(regra.termo);
        }
    });

    return { score, termosEncontrados };
}

// Remove elemento de forma conservadora
function removerElemento(el) {
    if (!el) return;

    if (["P", "SPAN", "A", "LI", "H1", "H2", "H3", "H4"].includes(el.tagName)) {
        el.remove();
        return;
    }

    const alvo = el.closest("iframe, a, div, section, aside, article") || el;

    // Evita apagar blocos enormes da página
    if (alvo.offsetHeight > 600 || alvo.offsetWidth > 1200) {
        el.remove();
        return;
    }

    alvo.remove();
}

// ==========================
// OCR EM IMAGENS
// ==========================

function imagemParaPNG(img) {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement("canvas");

            const largura = img.naturalWidth || img.width;
            const altura = img.naturalHeight || img.height;

            if (!largura || !altura) {
                reject("Imagem sem largura/altura válida.");
                return;
            }

            canvas.width = largura;
            canvas.height = altura;

            const ctx = canvas.getContext("2d");

            // Fundo branco ajuda quando a imagem tem transparência
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const dataURL = canvas.toDataURL("image/png");

            resolve(dataURL);

        } catch (erro) {
            reject(erro);
        }
    });
}

async function analisarImagem(img) {

    // Se já existem OCRs rodando, espera e tenta de novo
    if (ocrEmExecucao >= LIMITE_OCR_SIMULTANEO) {
        console.log("[Conscious OCR] Fila cheia, tentando novamente em breve:", img.src);

        setTimeout(() => {
            analisarImagem(img);
        }, 1500);

        return;
    }

    try {
        if (typeof Tesseract === "undefined") {
            console.log("[Conscious OCR] Tesseract não disponível.");
            return;
        }

        ocrEmExecucao++;

        console.log("[Conscious OCR] Iniciando OCR na imagem:", img.src);

        // Converte a imagem para PNG antes de enviar ao Tesseract
        const imagemPNG = await imagemParaPNG(img);

        console.log("[Conscious OCR] Idiomas usados: eng");
        console.log("[Conscious OCR] Caminho dos idiomas:", chrome.runtime.getURL("tessdata"));

        const result = await Tesseract.recognize(
            imagemPNG,
            "eng",
            {
                workerPath: chrome.runtime.getURL("worker.min.js"),
                logger: () => {}
            }
        );

        const textoExtraido = result.data.text || "";
        const resultadoOCR = calcularScoreOCR(textoExtraido);

        console.log("[Conscious OCR] Texto extraído:", textoExtraido);
        console.log("[Conscious OCR] Score:", resultadoOCR.score);
        console.log("[Conscious OCR] Termos encontrados:", resultadoOCR.termosEncontrados);

        if (resultadoOCR.score >= SCORE_MINIMO_OCR) {
            console.log("[Conscious OCR] Imagem removida pelo OCR.");
            removerElemento(img);
        } else {
            console.log("[Conscious OCR] OCR rodou, mas o score foi baixo. Imagem mantida.");
        }

    } catch (e) {
        console.log("[Conscious OCR] Erro OCR:", e);
    } finally {
        ocrEmExecucao--;
    }
}

// ==========================
// DECIDE SE VALE ANALISAR IMAGEM COM OCR
// ==========================

function deveAnalisarImagem(img) {
    if (!img) return false;
    if (img.dataset.processado) return false;

    const src = img.src || "";
    const alt = img.alt || "";
    const title = img.title || "";
    const classe = img.className || "";
    const id = img.id || "";

    if (!src) return false;

    const dadosImagem = `${src} ${alt} ${title} ${classe} ${id}`;
    const dadosNormalizados = normalizarTexto(dadosImagem);

    // TESTE CONTROLADO:
    // Imagens com class="ocr-test" sempre vão para OCR,
    // mas não são removidas por metadados.
    if (classe.includes("ocr-test")) {
        return true;
    }

    // Evita imagens pequenas em sites reais
    if (img.width < 200 || img.height < 100) return false;
    if (img.offsetWidth < 200 || img.offsetHeight < 100) return false;

    // Ignora imagens comuns
    const ignorar = [
        "poster",
        "film-poster",
        "alternative-poster",
        "cover",
        "thumbnail",
        "thumb",
        "avatar",
        "profile",
        "logo",
        "icon",
        "favicon",
        "emoji"
    ];

    if (ignorar.some(p => dadosNormalizados.includes(p))) {
        img.dataset.processado = "true";
        return false;
    }

    // Se os metadados já tiverem palavra forte de aposta, remove sem OCR
    if (contem(dadosImagem)) {
        img.dataset.processado = "true";
        removerElemento(img);
        return false;
    }

    // Se parecer anúncio, roda OCR.
    // Mas a remoção depende do score do OCR.
    return pareceAnuncio(dadosImagem);
}

// ==========================
// LIMPEZA DE TEXTOS DA PÁGINA
// ==========================

function limparTextosDaPagina() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                const texto = node.nodeValue.trim();

                if (!texto) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (contem(texto)) {
                    return NodeFilter.FILTER_ACCEPT;
                }

                return NodeFilter.FILTER_REJECT;
            }
        }
    );

    const textosBloqueados = [];

    while (walker.nextNode()) {
        textosBloqueados.push(walker.currentNode);
    }

    textosBloqueados.forEach(textNode => {
        const elemento = textNode.parentElement;

        if (!elemento) return;

        const tag = elemento.tagName;

        if (["P", "SPAN", "A", "LI", "H1", "H2", "H3", "H4"].includes(tag)) {
            elemento.remove();
            return;
        }

        const bloco = elemento.closest("p, a, li, div, section, article, aside");

        if (bloco && bloco.offsetHeight < 500 && bloco.offsetWidth < 1200) {
            bloco.remove();
        } else {
            textNode.nodeValue = "";
        }
    });
}

// ==========================
// LIMPEZA DE IMAGENS COM LINK BLOQUEADO
// ==========================

function limparImagensComLinkBloqueado() {
    document.querySelectorAll("a[href]").forEach(link => {
        const href = link.href || "";

        // Remove apenas links que tenham imagem dentro
        if (contem(href) && link.querySelector("img")) {
            console.log("[Conscious] Imagem com link bloqueado removida:", href);
            link.remove();
        }
    });
}

// ==========================
// LIMPEZA PRINCIPAL
// ==========================

function limparPagina() {

    // Remove textos diretamente relacionados a apostas
    limparTextosDaPagina();

    // Remove imagens envolvidas por links de aposta
    limparImagensComLinkBloqueado();

    // Bloqueio por texto e links
    document.querySelectorAll("a, p, div, span, iframe, section, aside, article, li, h1, h2, h3, h4").forEach(el => {

        const texto = el.innerText || "";
        const link = el.href || el.src || "";

        // Não usa class/id aqui para remover,
        // para evitar falso positivo com "ad", "banner", "promo".
        const conteudoReal = `${texto} ${link}`;

        if (contem(conteudoReal)) {
            if (el.offsetHeight < 500 && el.offsetWidth < 1200) {
                removerElemento(el);
            }
        }
    });

    // OCR em imagens suspeitas
    document.querySelectorAll("img").forEach(img => {

        const tentarOCR = () => {
            if (!deveAnalisarImagem(img)) return;

            img.dataset.processado = "true";

            setTimeout(() => {
                analisarImagem(img);
            }, 500);
        };

        // Se a imagem ainda não carregou, espera carregar
        if (!img.complete || img.naturalWidth === 0) {
            img.addEventListener("load", tentarOCR, { once: true });
            return;
        }

        tentarOCR();
    });

    // Por segurança, NÃO limpamos containers vazios.
    // Isso evita quebrar layouts de sites reais.
    // limparContainersVazios();
}

// ==========================
// EXECUÇÃO INICIAL
// ==========================

limparPagina();

// ==========================
// OBSERVADOR DE MUDANÇAS
// ==========================

let timeout;

const observer = new MutationObserver(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        limparPagina();
    }, 700);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});


// Varrer o site por completo
// Susbtituir as palavras que a gente quer bloquear por outra que identifique deu certo
// Fazer um super banco de ADs para entender qual é a taxa de sucesso
