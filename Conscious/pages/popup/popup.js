const btnAbrirPainel = document.getElementById("btnAbrirPainel");

btnAbrirPainel.addEventListener("click", () => {
    const url = chrome.runtime.getURL("../pages/site/index.html");

    chrome.tabs.create({
        url: url
    });
});