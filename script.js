const codeReader = new ZXing.BrowserMultiFormatReader();
const video = document.getElementById('video');
const resultElement = document.getElementById('result');
const historyElement = document.getElementById('history');

let scannedCodes = new Set();

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // para iOS
    video.play();
    scanCode();
  })
  .catch(err => {
    resultElement.innerText = "🚫 No se pudo acceder a la cámara: " + err;
  });

function scanCode() {
  codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
    if (result) {
      const code = result.text;

      if (!scannedCodes.has(code)) {
        scannedCodes.add(code);
        resultElement.textContent = `✅ Código detectado: ${code}`;
        addToHistory(code);
      }
    }
  });
}

function addToHistory(code) {
  const li = document.createElement('li');
  li.textContent = code;
  historyElement.prepend(li);
}
