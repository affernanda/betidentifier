// Lista de palavras que serão usadas para identificar conteúdo indesejado
const palavrasBloqueadas = ["bet", "apostas", "aposta", "cassino", "cassinos", "casino", "gambling", "gamble", "campaign", "tigrinho"];

function contem(texto) {
    return texto && palavrasBloqueadas.some(p => texto.toLowerCase().includes(p));
}

// Função principal que percorre a página e remove elementos indesejados
function limparPagina() {

    document.querySelectorAll("a, div, span, iframe").forEach(el => {

        // if (el.tagName === "INPUT" && el.type === "text") {

        //     if (contem(el.value)) {
        //         el.value = ""; // limpa o conteúdo digitado
        //     }

        //     return; // não continua pra não cair na lógica de remoção
        // }


        const texto = el.innerText || "";
        const link = el.href || el.src || "";


        // Se o texto OU o link contiver palavras bloqueadas
        if (contem(texto) || contem(link)) {

            // Só remove elementos menores (tentativa de evitar remover conteúdo principal)
            if (el.offsetHeight < 400) {

                el.remove();
            }
        }
    });
}

// Executa a limpeza assim que o script roda
limparPagina();

let timeout;

// Cria um observador para detectar mudanças
const observer = new MutationObserver(() => {

    clearTimeout(timeout);
    timeout = setTimeout(limparPagina, 500);
});

// Inicia a observação da página inteira
observer.observe(document.body, {
    childList: true, // observa adição/remoção de elementos
    subtree: true
});