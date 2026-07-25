const inputTermo = document.getElementById("termo");
const inputPeso = document.getElementById("peso");
const btnAdicionar = document.getElementById("btnAdicionar");
const tabelaPalavras = document.getElementById("tabelaPalavras");
const totalPalavras = document.getElementById("totalPalavras");
const mensagemVazia = document.getElementById("mensagemVazia");
const inputPesquisa = document.getElementById("pesquisaPalavra");

function carregarPalavras() {
    chrome.storage.local.get(["bancoPalavras"], (resultado) => {
        const banco = resultado.bancoPalavras || [];

        const textoPesquisa = inputPesquisa.value.trim().toLowerCase();

        const bancoFiltrado = banco.filter((item) => {
            return item.termo.toLowerCase().includes(textoPesquisa);
        });

        const bancoOrdenado = bancoFiltrado
            .map((item) => {
                const indexOriginal = banco.indexOf(item);

                return {
                    ...item,
                    indexOriginal: indexOriginal
                };
            })
            .sort((a, b) => Number(b.peso) - Number(a.peso));

        tabelaPalavras.innerHTML = "";

        totalPalavras.textContent = `${bancoOrdenado.length} palavra${bancoOrdenado.length !== 1 ? "s" : ""}`;

        if (bancoOrdenado.length === 0) {
            mensagemVazia.style.display = "block";

            if (textoPesquisa) {
                mensagemVazia.textContent = "Nenhuma palavra encontrada.";
            } else {
                mensagemVazia.textContent = "Nenhuma palavra cadastrada.";
            }

            return;
        }

        mensagemVazia.style.display = "none";

        bancoOrdenado.forEach((item) => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${item.termo}</td>
                <td>${item.peso}</td>
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

            tabelaPalavras.appendChild(linha);
        });

        adicionarEventosBotoes();
    });
}

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
            removerPalavra(index);
        });
    });
}

function adicionarPalavra() {
    const termo = inputTermo.value.trim();
    const peso = Number(inputPeso.value);

    if (!termo) {
        alert("Digite uma palavra ou frase.");
        return;
    }

    if (!peso || peso < 1 || peso > 5) {
        alert("Digite um peso entre 1 e 5.");
        return;
    }

    chrome.storage.local.get(["bancoPalavras"], (resultado) => {
        const banco = resultado.bancoPalavras || [];

        const termoJaExiste = banco.some((item) => {
            return item.termo.toLowerCase() === termo.toLowerCase();
        });

        if (termoJaExiste) {
            alert("Essa palavra já está cadastrada.");
            return;
        }

        banco.push({
            termo: termo,
            peso: peso,
            ativo: true
        });

        chrome.storage.local.set({
            bancoPalavras: banco
        }, () => {
            inputTermo.value = "";
            inputPeso.value = "";

            carregarPalavras();
        });
    });
}

function removerPalavra(index) {
    chrome.storage.local.get(["bancoPalavras"], (resultado) => {
        const banco = resultado.bancoPalavras || [];

        banco.splice(index, 1);

        chrome.storage.local.set({
            bancoPalavras: banco
        }, () => {
            carregarPalavras();
        });
    });
}

function alterarStatus(index) {
    chrome.storage.local.get(["bancoPalavras"], (resultado) => {
        const banco = resultado.bancoPalavras || [];

        banco[index].ativo = !banco[index].ativo;

        chrome.storage.local.set({
            bancoPalavras: banco
        }, () => {
            carregarPalavras();
        });
    });
}

btnAdicionar.addEventListener("click", adicionarPalavra);

inputTermo.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarPalavra();
    }
});

inputPeso.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarPalavra();
    }
});

inputPesquisa.addEventListener("input", carregarPalavras);

carregarPalavras();