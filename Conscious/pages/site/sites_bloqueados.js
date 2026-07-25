const inputTermo = document.getElementById("termo");
const inputPeso = document.getElementById("peso");
const btnAdicionar = document.getElementById("btnAdicionar");
const tabelaSites = document.getElementById("tabelaSites");
const totalSites = document.getElementById("totalSites");
const mensagemVazia = document.getElementById("mensagemVazia");
const inputPesquisa = document.getElementById("pesquisaSite");

// ==========================
// NORMALIZAÇÃO DO LINK
// ==========================

function normalizarSite(site) {
    return site
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/$/, "");
}

// ==========================
// CARREGAR LINKS BLOQUEADOS
// ==========================

function carregarLinksBloqueados() {
    chrome.storage.local.get(["sitesBloqueados"], (resultado) => {
        const banco = resultado.sitesBloqueados || [];

        const textoPesquisa = inputPesquisa.value.trim().toLowerCase();

        const bancoFiltrado = banco.filter((item) => {
            return item.site.toLowerCase().includes(textoPesquisa);
        });

        const bancoOrdenado = bancoFiltrado
            .map((item) => {
                const indexOriginal = banco.indexOf(item);

                return {
                    ...item,
                    indexOriginal: indexOriginal
                };
            })
            .sort((a, b) => a.site.localeCompare(b.site));

        tabelaSites.innerHTML = "";

        totalSites.textContent = `${bancoOrdenado.length} link${bancoOrdenado.length !== 1 ? "s" : ""}`;

        if (bancoOrdenado.length === 0) {
            mensagemVazia.style.display = "block";

            if (textoPesquisa) {
                mensagemVazia.textContent = "Nenhum link encontrado.";
            } else {
                mensagemVazia.textContent = "Nenhum link bloqueado cadastrado.";
            }

            return;
        }

        mensagemVazia.style.display = "none";

        bancoOrdenado.forEach((item) => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${item.site}</td>

                <td class="${item.ativo ? "status-ativo" : "status-inativo"}">
                    ${item.ativo ? "Ativo" : "Inativo"}
                </td>

                <td>
                    <button class="btn-status" data-index="${item.indexOriginal}">
                        ${item.ativo ? "Desativar" : "Ativar"}
                    </button>

                    <button class="btn-remover" data-index="${item.indexOriginal}">
                        Remover
                    </button>
                </td>
            `;

            tabelaSites.appendChild(linha);
        });

        adicionarEventosBotoes();
    });
}

// ==========================
// EVENTOS DOS BOTÕES DA TABELA
// ==========================

function adicionarEventosBotoes() {
    const botoesStatus = document.querySelectorAll(".btn-status");
    const botoesRemover = document.querySelectorAll(".btn-remover");

    botoesStatus.forEach((botao) => {
        botao.addEventListener("click", () => {
            const index = Number(botao.dataset.index);
            alterarStatus(index);
        });
    });

    botoesRemover.forEach((botao) => {
        botao.addEventListener("click", () => {
            const index = Number(botao.dataset.index);
            removerLink(index);
        });
    });
}

// ==========================
// ADICIONAR LINK BLOQUEADO
// ==========================

function adicionarLinkBloqueado() {

    const siteDigitado = inputTermo.value.trim();

    if (!siteDigitado) {
        alert("Digite um link.");
        return;
    }

    const siteNormalizado = normalizarSite(siteDigitado);

    chrome.storage.local.get(["sitesBloqueados"], (resultado) => {

        const banco = Array.isArray(resultado.sitesBloqueados)
            ? resultado.sitesBloqueados
            : [];

        const jaExiste = banco.some(item =>
            normalizarSite(item.site) === siteNormalizado
        );

        if (jaExiste) {
            alert("Esse site já existe.");
            return;
        }

        banco.push({
            site: siteNormalizado,
            ativo: true
        });

        chrome.storage.local.set({
            sitesBloqueados: banco
        }, () => {

            inputTermo.value = "";

            carregarLinksBloqueados();
        });
    });
}

// ==========================
// REMOVER LINK
// ==========================

function removerLink(index) {
    chrome.storage.local.get(["sitesBloqueados"], (resultado) => {
        const banco = resultado.sitesBloqueados || [];

        banco.splice(index, 1);

        chrome.storage.local.set({
            sitesBloqueados: banco
        }, () => {
            carregarLinksBloqueados();
        });
    });
}

// ==========================
// ATIVAR / DESATIVAR LINK
// ==========================

function alterarStatus(index) {
    chrome.storage.local.get(["sitesBloqueados"], (resultado) => {
        const banco = resultado.sitesBloqueados || [];

        banco[index].ativo = !banco[index].ativo;

        chrome.storage.local.set({
            sitesBloqueados: banco
        }, () => {
            carregarLinksBloqueados();
        });
    });
}

// ==========================
// EVENTOS
// ==========================

btnAdicionar.addEventListener("click", adicionarLinkBloqueado);

inputTermo.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarLinkBloqueado();
    }
});

if (inputPeso) {
    inputPeso.style.display = "none";
}

inputPesquisa.addEventListener("input", carregarLinksBloqueados);

carregarLinksBloqueados();