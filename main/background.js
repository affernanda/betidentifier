const palavrasBloqueadas = ["bet", "apostas", "aposta", "cassino", "cassinos", "casino", "gambling", "gamble"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const url = changeInfo.url.toLowerCase();

    const bloqueado = palavrasBloqueadas.some(p =>
      url.includes(p)
    );

    if (bloqueado) {
      chrome.tabs.update(tabId, {
        url: "https://www.google.com"
      });
    }
  }
});