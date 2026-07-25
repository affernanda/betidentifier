// ===============================
// OCR COM TESSERACT
// ===============================

window.ConsciousOCR = (() => {
    let workerPromise = null;

    const IDIOMAS_OCR = "por+eng";

    const CAMINHO_WORKER = chrome.runtime.getURL("tesseract/worker.min.js");
    const CAMINHO_CORE = chrome.runtime.getURL("tesseract/tesseract-core.wasm.js");
    const CAMINHO_TESSDATA = chrome.runtime.getURL("tesseract/tessdata/");

    // ===============================
    // CRIA OU REUTILIZA O WORKER
    // ===============================

    async function obterWorker() {
        if (workerPromise) {
            console.log("[OCR] Reutilizando worker já criado.");
            return workerPromise;
        }

        console.log("[OCR] Criando worker do Tesseract...");
        console.log("[OCR] Worker path:", CAMINHO_WORKER);
        console.log("[OCR] Tessdata path:", CAMINHO_TESSDATA);
        console.log("[OCR] Idiomas:", IDIOMAS_OCR);

        workerPromise = (async () => { 
    try { 

        const worker = await Tesseract.createWorker( 
            IDIOMAS_OCR, 
            { 
                workerPath: CAMINHO_WORKER,
                corePath: CAMINHO_CORE,
                langPath: CAMINHO_TESSDATA + "/", 
                workerBlobURL: false 
            } 
        ); 
 
        await worker.setParameters({ 
            tessedit_pageseg_mode: 6 
        }); 
 
        console.log("[OCR] Worker criado e inicializado com sucesso."); 
 
        return worker; 
    } catch (erro) { 
        console.error("[OCR] Erro ao criar worker:", erro); 
 
        workerPromise = null; 
 
        throw erro; 
    } 
})();

        return workerPromise;
    }

    // ===============================
    // AUMENTA A IMAGEM E DEIXA EM PRETO E BRANCO PARA LER TRANQUILAMENTE
    // ===============================

    function ampliarImagemParaOCR(img, escala = 4) {

        try {

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const largura =
                (img.naturalWidth || img.width) * escala;

            const altura =
                (img.naturalHeight || img.height) * escala;

            canvas.width = largura;
            canvas.height = altura;

            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(img, 0, 0, largura, altura);

            // ===================================
            // TENTA MELHORAR A IMAGEM
            // ===================================

            const imageData =
                ctx.getImageData(0, 0, largura, altura);

            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {

                const media =
                    (data[i] + data[i + 1] + data[i + 2]) / 3;

                const cor = media > 140 ? 255 : 0;

                data[i] = cor;
                data[i + 1] = cor;
                data[i + 2] = cor;
            }

            ctx.putImageData(imageData, 0, 0);

            console.log("[OCR] Canvas OCR melhorado criado.");

            return canvas;

        } catch (erro) {

            console.warn(
                "[OCR] Canvas bloqueado por CORS. Usando imagem original.",
                erro
            );

            return img;
        }
    }

    async function criarImagemSeguraParaOCR(img) {

        try {

            const response = await fetch(img.src);

            const blob = await response.blob();

            const objectURL = URL.createObjectURL(blob);

            return new Promise((resolve, reject) => {

                const novaImg = new Image();

                novaImg.onload = () => resolve(novaImg);

                novaImg.onerror = reject;

                novaImg.src = objectURL;
            });

        } catch (erro) {

            console.warn(
                "[OCR] Não foi possível criar imagem segura.",
                erro
            );

            return img;
        }
    }

    // ===============================
    // EXTRAI TEXTO DE UMA IMAGEM
    // ===============================

    async function extrairTextoDaImagem(img) {
        if (!img) {
            console.warn("[OCR] Imagem inválida.");
            return "";
        }

        if (!window.Tesseract) {
            console.error("[OCR] Biblioteca Tesseract não foi carregada.");
            return "";
        }

        const src = img.currentSrc || img.src || "";

        if (!src) {
            console.warn("[OCR] Imagem sem src.");
            return "";
        }

        try {
            console.log("--------------------------------------");
            console.log("[OCR] Iniciando OCR da imagem.");
            console.log("[OCR] Imagem:", img);
            console.log("[OCR] SRC:", src);

            const worker = await obterWorker();

            console.log("[OCR] Worker obtido. Iniciando recognize...");

            const imgSegura =
                await criarImagemSeguraParaOCR(img);

            const canvasOCR = ampliarImagemParaOCR(img, 4);

            const resultado =
                await worker.recognize(canvasOCR);

            console.log("[OCR] Recognize finalizado.");

            const textoExtraido = resultado?.data?.text || "";

            return textoExtraido;
        } catch (erro) {
            console.error("[OCR] Erro ao analisar imagem:", erro);
            return "";
        }
    }

    return {
        extrairTextoDaImagem
    };
})();