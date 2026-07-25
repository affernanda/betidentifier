const palavrasIniciais = [
{ termo: "0dds", peso: 5, ativo: true },
{ termo: "4viator", peso: 5, ativo: true },
{ termo: "5lot", peso: 5, ativo: true },
{ termo: "5lots", peso: 5, ativo: true },
{ termo: "5take", peso: 5, ativo: true },
{ termo: "ap0sta", peso: 5, ativo: true },
{ termo: "ap0star", peso: 5, ativo: true },
{ termo: "ap0stas", peso: 5, ativo: true },
{ termo: "ap0ste", peso: 5, ativo: true },
{ termo: "apost4", peso: 4, ativo: true },
{ termo: "aposta", peso: 5, ativo: true },
{ termo: "apostar", peso: 5, ativo: true },
{ termo: "apostas", peso: 5, ativo: true },
{ termo: "apostasaovivo", peso: 5, ativo: true },
{ termo: "aposte", peso: 5, ativo: true },
{ termo: "aposte agora", peso: 5, ativo: true },
{ termo: "aposte e ganhe", peso: 5, ativo: true },
{ termo: "aposteagora", peso: 5, ativo: true },
{ termo: "aposteeganhe", peso: 5, ativo: true },
{ termo: "av1ator", peso: 5, ativo: true },
{ termo: "aviat0r", peso: 5, ativo: true },
{ termo: "aviator", peso: 5, ativo: true },
{ termo: "aviattor", peso: 5, ativo: true },
{ termo: "b.et", peso: 5, ativo: true },
{ termo: "b00kmaker", peso: 2, ativo: true },
{ termo: "b0nus", peso: 4, ativo: true },
{ termo: "b1aze", peso: 5, ativo: true },
{ termo: "b3t", peso: 5, ativo: true },
{ termo: "bet", peso: 5, ativo: true },
{ termo: "bet355", peso: 5, ativo: true },
{ termo: "betan0", peso: 5, ativo: true },
{ termo: "betano", peso: 5, ativo: true },
{ termo: "betfa1r", peso: 5, ativo: true },
{ termo: "betfair", peso: 5, ativo: true },
{ termo: "betnacional", peso: 5, ativo: true },
{ termo: "bets", peso: 5, ativo: true },
{ termo: "bett", peso: 5, ativo: true },
{ termo: "betting", peso: 5, ativo: true },
{ termo: "bing0", peso: 2, ativo: true },
{ termo: "bingo", peso: 3, ativo: true },
{ termo: "bingoo", peso: 2, ativo: true },
{ termo: "blackj4ck", peso: 5, ativo: true },
{ termo: "blackjack", peso: 5, ativo: true },
{ termo: "blase", peso: 4, ativo: true },
{ termo: "blaz3", peso: 5, ativo: true },
{ termo: "blaze", peso: 5, ativo: true },
{ termo: "blngo", peso: 2, ativo: true },
{ termo: "bonus", peso: 2, ativo: true },
{ termo: "bonus de aposta", peso: 5, ativo: true },
{ termo: "bonus de cassino", peso: 5, ativo: true },
{ termo: "bonusdeaposta", peso: 5, ativo: true },
{ termo: "bonusdecassino", peso: 5, ativo: true },
{ termo: "bonuss", peso: 3, ativo: true },
{ termo: "bookm4ker", peso: 2, ativo: true },
{ termo: "bookmaker", peso: 2, ativo: true },
{ termo: "bookmakerr", peso: 2, ativo: true },
{ termo: "c0tacoes", peso: 3, ativo: true },
{ termo: "caça niqueis", peso: 5, ativo: true },
{ termo: "caça niquel", peso: 5, ativo: true },
{ termo: "cacanickel", peso: 4, ativo: true },
{ termo: "cacaniqueis", peso: 5, ativo: true },
{ termo: "cacaniquel", peso: 5, ativo: true },
{ termo: "cadastro", peso: 1, ativo: true },
{ termo: "cas1no", peso: 5, ativo: true },
{ termo: "casa de aposta", peso: 5, ativo: true },
{ termo: "casa de apostas", peso: 5, ativo: true },
{ termo: "casaniqueis", peso: 4, ativo: true },
{ termo: "casin0", peso: 5, ativo: true },
{ termo: "casino", peso: 5, ativo: true },
{ termo: "casinoonline", peso: 5, ativo: true },
{ termo: "casinos", peso: 5, ativo: true },
{ termo: "caslno", peso: 5, ativo: true },
{ termo: "cassin0", peso: 5, ativo: true },
{ termo: "cassino", peso: 5, ativo: true },
{ termo: "cassinoaovivo", peso: 5, ativo: true },
{ termo: "cassinoonline", peso: 5, ativo: true },
{ termo: "cassinos", peso: 5, ativo: true },
{ termo: "casslno", peso: 5, ativo: true },
{ termo: "casssino", peso: 5, ativo: true },
{ termo: "centavos", peso: 1, ativo: true },
{ termo: "clique aqui", peso: 1, ativo: true },
{ termo: "cotac0es", peso: 3, ativo: true },
{ termo: "cotac4o", peso: 3, ativo: true },
{ termo: "cotacao", peso: 3, ativo: true },
{ termo: "cotagoes", peso: 3, ativo: true },
{ termo: "cottacao", peso: 3, ativo: true },
{ termo: "cr4sh", peso: 4, ativo: true },
{ termo: "crash", peso: 3, ativo: true },
{ termo: "crashh", peso: 3, ativo: true },
{ termo: "crie sua conta", peso: 1, ativo: true },
{ termo: "dinheiro", peso: 2, ativo: true },
{ termo: "dinheiro facil com jogos", peso: 5, ativo: true },
{ termo: "dinheiro fácil com jogos", peso: 5, ativo: true },
{ termo: "esportes da sorte", peso: 5, ativo: true },
{ termo: "estrelabet", peso: 5, ativo: true },
{ termo: "f0rtunedragon", peso: 5, ativo: true },
{ termo: "f0rtunemouse", peso: 5, ativo: true },
{ termo: "f0rtuneox", peso: 5, ativo: true },
{ termo: "f0rtunetiger", peso: 5, ativo: true },
{ termo: "fature", peso: 2, ativo: true },
{ termo: "fortune dragon", peso: 5, ativo: true },
{ termo: "fortune mouse", peso: 5, ativo: true },
{ termo: "fortune ox", peso: 5, ativo: true },
{ termo: "fortune rabbit", peso: 5, ativo: true },
{ termo: "fortune tiger", peso: 5, ativo: true },
{ termo: "fortune0x", peso: 5, ativo: true },
{ termo: "fortunedrag0n", peso: 5, ativo: true },
{ termo: "fortunerabbitt", peso: 5, ativo: true },
{ termo: "G6ANHA", peso: 5, ativo: true },
{ termo: "fortunet1ger", peso: 5, ativo: true },
{ termo: "fortunetlger", peso: 5, ativo: true },
{ termo: "g4mble", peso: 4, ativo: true },
{ termo: "g4mbling", peso: 5, ativo: true },
{ termo: "gambl1ng", peso: 5, ativo: true },
{ termo: "premics diariqs", peso: 4, ativo: true },
{ termo: "gambl3", peso: 4, ativo: true },
{ termo: "gamble", peso: 5, ativo: true },
{ termo: "gambling", peso: 5, ativo: true },
{ termo: "gambllng", peso: 5, ativo: true },
{ termo: "ganhar", peso: 2, ativo: true },
{ termo: "ganhardinheiro", peso: 5, ativo: true },
{ termo: "ganhe", peso: 2, ativo: true },
{ termo: "ganhe agora", peso: 4, ativo: true },
{ termo: "ganhe apostando", peso: 5, ativo: true },
{ termo: "ganhe bonus", peso: 4, ativo: true },
{ termo: "ganhe dinheiro", peso: 4, ativo: true },
{ termo: "ganhe dinheiro apostando", peso: 5, ativo: true },
{ termo: "ganhe dinheiro jogando", peso: 5, ativo: true },
{ termo: "ganhe pix", peso: 4, ativo: true },
{ termo: "ganhe pix apostando", peso: 5, ativo: true },
{ termo: "ganhe pix jogando", peso: 5, ativo: true },
{ termo: "ganheagora", peso: 5, ativo: true },
{ termo: "ganheb0nus", peso: 5, ativo: true },
{ termo: "ganhedinheiro", peso: 5, ativo: true },
{ termo: "ganhedinheiroapostando", peso: 5, ativo: true },
{ termo: "ganhedinheirojogando", peso: 5, ativo: true },
{ termo: "ganhefacil", peso: 4, ativo: true },
{ termo: "ganhos", peso: 2, ativo: true },
{ termo: "ganhou", peso: 2, ativo: true },
{ termo: "ganhou bonus", peso: 4, ativo: true },
{ termo: "gir0gratis", peso: 5, ativo: true },
{ termo: "gire", peso: 2, ativo: true },
{ termo: "gire e ganhe", peso: 4, ativo: true },
{ termo: "giro", peso: 2, ativo: true },
{ termo: "giro gratis", peso: 4, ativo: true },
{ termo: "girogratis", peso: 5, ativo: true },
{ termo: "girogratls", peso: 5, ativo: true },
{ termo: "giros", peso: 2, ativo: true },
{ termo: "giros gratis", peso: 5, ativo: true },
{ termo: "girosgratis", peso: 5, ativo: true },
{ termo: "gratis", peso: 1, ativo: true },
{ termo: "j0god0tigre", peso: 5, ativo: true },
{ termo: "j0godotigre", peso: 5, ativo: true },
{ termo: "jackp0t", peso: 5, ativo: true },
{ termo: "jackpot", peso: 4, ativo: true },
{ termo: "jackpott", peso: 4, ativo: true },
{ termo: "jogar", peso: 1, ativo: true },
{ termo: "jogo", peso: 1, ativo: true },
{ termo: "jogo de azar", peso: 5, ativo: true },
{ termo: "jogo do tigre", peso: 5, ativo: true },
{ termo: "jogo do tigrinho", peso: 5, ativo: true },
{ termo: "jogod0tigre", peso: 5, ativo: true },
{ termo: "jogodot1gre", peso: 5, ativo: true },
{ termo: "jogodotigr3", peso: 5, ativo: true },
{ termo: "jogodotigre", peso: 5, ativo: true },
{ termo: "jogos", peso: 1, ativo: true },
{ termo: "jogos de azar", peso: 5, ativo: true },
{ termo: "jogue", peso: 2, ativo: true },
{ termo: "jogue agora", peso: 4, ativo: true },
{ termo: "jogue e ganhe", peso: 5, ativo: true },
{ termo: "jogueagora", peso: 5, ativo: true },
{ termo: "joguecomresponsab1lidade", peso: 5, ativo: true },
{ termo: "joguecomresponsabilidade", peso: 5, ativo: true },
{ termo: "joguecomresponsablidade", peso: 5, ativo: true },
{ termo: "joguecomresponssabilidade", peso: 5, ativo: true },
{ termo: "jogueeganhe", peso: 5, ativo: true },
{ termo: "kt0", peso: 5, ativo: true },
{ termo: "kto", peso: 5, ativo: true },
{ termo: "luck bet", peso: 5, ativo: true },
{ termo: "luck.bet", peso: 5, ativo: true },
{ termo: "luckbet", peso: 5, ativo: true },
{ termo: "luckbett", peso: 5, ativo: true },
{ termo: "lucre", peso: 2, ativo: true },
{ termo: "lucro", peso: 1, ativo: true },
{ termo: "maiorde18", peso: 5, ativo: true },
{ termo: "milhoes", peso: 1, ativo: true },
{ termo: "multiplicador", peso: 3, ativo: true },
{ termo: "multiplicadorx", peso: 4, ativo: true },
{ termo: "novibet", peso: 5, ativo: true },
{ termo: "odd", peso: 3, ativo: true },
{ termo: "oddalta", peso: 4, ativo: true },
{ termo: "oddds", peso: 4, ativo: true },
{ termo: "odds", peso: 4, ativo: true },
{ termo: "oddsaltas", peso: 5, ativo: true },
{ termo: "odss", peso: 4, ativo: true },
{ termo: "oferta", peso: 1, ativo: true },
{ termo: "p0ker", peso: 5, ativo: true },
{ termo: "p1x", peso: 3, ativo: true },
{ termo: "pa1pite", peso: 4, ativo: true },
{ termo: "pagamento", peso: 1, ativo: true },
{ termo: "pagamento imediato", peso: 3, ativo: true },
{ termo: "palp1te", peso: 4, ativo: true },
{ termo: "palpite", peso: 3, ativo: true },
{ termo: "palpites", peso: 3, ativo: true },
{ termo: "palpitte", peso: 4, ativo: true },
{ termo: "pix", peso: 1, ativo: true },
{ termo: "piximediato", peso: 5, ativo: true },
{ termo: "pixnahora", peso: 5, ativo: true },
{ termo: "pixx", peso: 3, ativo: true },
{ termo: "pok3r", peso: 5, ativo: true },
{ termo: "poker", peso: 4, ativo: true },
{ termo: "premiacao diaria", peso: 4, ativo: true },
{ termo: "premio", peso: 2, ativo: true },
{ termo: "premio diario", peso: 4, ativo: true },
{ termo: "premios", peso: 2, ativo: true },
{ termo: "premios diarios", peso: 4, ativo: true },
{ termo: "proibidoparamenores", peso: 5, ativo: true },
{ termo: "promocao", peso: 1, ativo: true },
{ termo: "r0leta", peso: 5, ativo: true },
{ termo: "registrar", peso: 1, ativo: true },
{ termo: "registre-se", peso: 1, ativo: true },
{ termo: "renda extra", peso: 2, ativo: true },
{ termo: "rodadas gratis", peso: 5, ativo: true },
{ termo: "rodadasgratis", peso: 5, ativo: true },
{ termo: "rodadasgratls", peso: 5, ativo: true },
{ termo: "roleta", peso: 5, ativo: true },
{ termo: "roletta", peso: 4, ativo: true },
{ termo: "rouIette", peso: 5, ativo: true },
{ termo: "roulette", peso: 5, ativo: true },
{ termo: "royal", peso: 2, ativo: true },
{ termo: "s4que", peso: 4, ativo: true },
{ termo: "sacar", peso: 3, ativo: true },
{ termo: "saque", peso: 3, ativo: true },
{ termo: "saque imediato", peso: 4, ativo: true },
{ termo: "saque imediato no pix", peso: 5, ativo: true },
{ termo: "saque na hora", peso: 4, ativo: true },
{ termo: "saqueimediato", peso: 5, ativo: true },
{ termo: "saquenahora", peso: 5, ativo: true },
{ termo: "saquepix", peso: 5, ativo: true },
{ termo: "sl0t", peso: 5, ativo: true },
{ termo: "sl0ts", peso: 5, ativo: true },
{ termo: "slot", peso: 5, ativo: true },
{ termo: "slots", peso: 5, ativo: true },
{ termo: "somenteparamaiores", peso: 5, ativo: true },
{ termo: "sportbook", peso: 5, ativo: true },
{ termo: "sportingbet", peso: 5, ativo: true },
{ termo: "sportsbo0k", peso: 5, ativo: true },
{ termo: "sportsbok", peso: 5, ativo: true },
{ termo: "sportsbook", peso: 5, ativo: true },
{ termo: "st4ke", peso: 5, ativo: true },
{ termo: "stak3", peso: 5, ativo: true },
{ termo: "stake", peso: 5, ativo: true },
{ termo: "suaaposta", peso: 5, ativo: true },
{ termo: "superbet", peso: 5, ativo: true },
{ termo: "t1grinho", peso: 5, ativo: true },
{ termo: "tigr1nho", peso: 5, ativo: true },
{ termo: "tigrinh0", peso: 5, ativo: true },
{ termo: "tigrinho", peso: 5, ativo: true },
{ termo: "tigrlnho", peso: 5, ativo: true },
{ termo: "va1debet", peso: 5, ativo: true },
{ termo: "vaidebet", peso: 5, ativo: true },
];

function normalizarTermo(termo) {
    return termo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u035f]/g, "")
        .trim()
        .replace(/\s+/g, " ");
}

function inicializarBancoPalavras(origem = "desconhecida") {
    chrome.storage.local.get(["bancoPalavras"], (resultado) => {
        const bancoSalvo = resultado.bancoPalavras;

        if (!Array.isArray(bancoSalvo) || bancoSalvo.length === 0) {
            chrome.storage.local.set({
                bancoPalavras: palavrasIniciais
            }, () => {
                console.log(`[Conscious] Banco de palavras criado. Origem: ${origem}`);
            });

            return;
        }

        const mapa = new Map();

        bancoSalvo.forEach((palavra) => {
            if (!palavra || !palavra.termo) return;

            const chave = normalizarTermo(palavra.termo);

            mapa.set(chave, {
                termo: palavra.termo,
                peso: Number(palavra.peso) || 1,
                ativo: palavra.ativo !== false
            });
        });

        let alterou = false;

        palavrasIniciais.forEach((palavraInicial) => {
            const chave = normalizarTermo(palavraInicial.termo);

            if (!mapa.has(chave)) {
                mapa.set(chave, palavraInicial);
                alterou = true;
            }
        });

        if (alterou) {
            chrome.storage.local.set({
                bancoPalavras: Array.from(mapa.values())
            }, () => {
                console.log(`[Conscious] Banco atualizado com novas palavras. Origem: ${origem}`);
            });
        } else {
            console.log(`[Conscious] Banco já existe e está atualizado. Origem: ${origem}`);
        }
    });
}

const sitesBloqueados = [
    { site: "bet365.bet.br", ativo: true },
    { site: "betano.bet.br", ativo: true },
    { site: "blaze.bet.br", ativo: true },
    { site: "superbet.bet.br", ativo: true },
    { site: "sportingbet.bet.br", ativo: true },
    { site: "estrelabet.bet.br", ativo: true },
    { site: "novibet.bet.br", ativo: true },
    { site: "kto.bet.br", ativo: true },
    { site: "pixbet.bet.br", ativo: true },
    { site: "betnacional.bet.br", ativo: true },
    { site: "superbet.com", ativo: true },
    { site: "sportingbet.com", ativo: true },
    { site: "estrelabet.com", ativo: true },
    { site: "novibet.com", ativo: true },
    { site: "kto.com", ativo: true },
    { site: "pixbet.com", ativo: true },
    { site: "betnacional.com", ativo: true },
    { site: "stake.com", ativo: true },
    { site: "1xbet.com", ativo: true },
    { site: "betfair.com", ativo: true },
    { site: "parimatch.com", ativo: true },
    { site: "betway.com", ativo: true }
];

function inicializarBancoSitesBloqueados(origem = "desconhecida") {

    chrome.storage.local.get(["sitesBloqueados"], (resultado) => {

        const bancoSalvo = resultado.sitesBloqueados;

        if (!Array.isArray(bancoSalvo) || bancoSalvo.length === 0) {

            chrome.storage.local.set({
                sitesBloqueados: sitesBloqueados
            }, () => {
                console.log(`[Conscious] Banco de sites criado. Origem: ${origem}`);
            });

            return;
        }

        const mapa = new Map();

        bancoSalvo.forEach((siteObj) => {

            if (!siteObj || !siteObj.site) return;

            const chave = siteObj.site
                .toLowerCase()
                .trim();

            mapa.set(chave, {
                site: siteObj.site,
                ativo: siteObj.ativo !== false
            });
        });

        let alterou = false;

        sitesBloqueados.forEach((siteInicial) => {

            const chave = siteInicial.site
                .toLowerCase()
                .trim();

            if (!mapa.has(chave)) {

                mapa.set(chave, siteInicial);

                alterou = true;
            }
        });

        if (alterou) {

            chrome.storage.local.set({
                sitesBloqueados: Array.from(mapa.values())
            }, () => {
                console.log(`[Conscious] Banco de sites atualizado. Origem: ${origem}`);
            });

        } else {

            console.log(`[Conscious] Banco de sites já atualizado. Origem: ${origem}`);
        }
    });
}

function siteEstaBloqueado(url, callback) {

    try {

        const urlObj = new URL(url);

        const hostname = urlObj.hostname
            .toLowerCase()
            .replace(/^www\./, "");

        chrome.storage.local.get(["sitesBloqueados"], (resultado) => {

            const banco = resultado.sitesBloqueados || [];

            const bloqueado = banco.some((item) => {

                if (!item.ativo) return false;

                const siteNormalizado = item.site
                    .toLowerCase()
                    .replace(/^www\./, "");

                return (
                    hostname === siteNormalizado ||
                    hostname.endsWith("." + siteNormalizado)
                );
            });

            callback(bloqueado);
        });

    } catch (erro) {

        callback(false);
    }
}

// ==========================
// INICIALIZAÇÃO DO BANCO
// ==========================

chrome.runtime.onInstalled.addListener(() => {
    inicializarBancoPalavras("instalação/atualização");
});

chrome.runtime.onStartup.addListener(() => {
    inicializarBancoPalavras("inicialização da extensão");
});

chrome.runtime.onInstalled.addListener(() => {
    inicializarBancoSitesBloqueados("instalação/atualização");
});

chrome.runtime.onStartup.addListener(() => {
    inicializarBancoSitesBloqueados("inicialização da extensão");
});

// ==========================
// REDIRECIONAMENTO
// ==========================

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {

    if (!changeInfo.url) return;

    siteEstaBloqueado(changeInfo.url, (bloqueado) => {

        if (bloqueado) {

            chrome.tabs.update(tabId, {
                url: "https://www.google.com"
            });

            console.log(
                "[Conscious] Site de aposta bloqueado:",
                changeInfo.url
            );
        }
    });
});