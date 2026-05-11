// Palavras/domínios usados para bloquear URLs diretamente
const palavrasBloqueadasURL = [
    "betano",
    "bet365",
    "blaze",
    "cassino",
    "cassinos",
    "casino",
    "gambling",
    "gamble",
    "tigrinho",
    "fortune-tiger",
    "fortune tiger"
];

// Evita redirecionar a mesma aba várias vezes seguidas
const abasRedirecionadas = new Set();

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function urlBloqueada(url) {
    if (!url) return false;

    const urlNormalizada = normalizarTexto(url);

    return palavrasBloqueadasURL.some(termo => {
        const termoNormalizado = normalizarTexto(termo);
        return urlNormalizada.includes(termoNormalizado);
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url) return;

    const url = changeInfo.url;

    // Não tenta redirecionar páginas internas do Chrome/extensões
    if (
        url.startsWith("chrome://") ||
        url.startsWith("chrome-extension://") ||
        url.startsWith("edge://") ||
        url.startsWith("about:")
    ) {
        return;
    }

    // Evita redirecionar a página de destino
    if (url.startsWith("https://www.google.com")) {
        abasRedirecionadas.delete(tabId);
        return;
    }

    if (!urlBloqueada(url)) {
        abasRedirecionadas.delete(tabId);
        return;
    }

    if (abasRedirecionadas.has(tabId)) return;

    abasRedirecionadas.add(tabId);

    chrome.tabs.update(tabId, {
        url: "https://www.google.com"
    }, () => {
        if (chrome.runtime.lastError) {
            console.log("Redirecionamento ignorado:", chrome.runtime.lastError.message);
        }
    });
});

chrome.tabs.onRemoved.addListener((tabId) => {
    abasRedirecionadas.delete(tabId);
});