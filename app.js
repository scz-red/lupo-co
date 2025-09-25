// ======== app.js (TC fijo dentro del archivo) ========
document.addEventListener('DOMContentLoaded', function () {
  const amountInput   = document.getElementById('amount');
  const receivedInput = document.getElementById('received-amount');
  const resultAmount  = document.getElementById('result-amount');
  const resultCard    = document.getElementById('result-card');
  const calculateBtn  = document.getElementById('calculate-btn');
  const WHATSAPP_NUMBER = '59175333489';

  // ---------- TIPO DE CAMBIO FIJO ----------
  // EDITA AQUÍ: COP por 1 BOB (ejemplo: 190 significa 1 BOB = 190 COP)
  const COP_PER_BOB = 311; // ← pon tu valor
  // ---------- FIN TIPO DE CAMBIO ----------

  // % de margen/descuento en frontend (mantén si ya lo usabas)
  const FRONTEND_DISCOUNT = 0.12;     // 12%
  const MULT = 1 - FRONTEND_DISCOUNT; // 0.88

  function updateCotizDatetime() {
    const el = document.getElementById('cotiz-datetime');
    if (!el) return;
    // Muestra cuándo “definiste” el TC (opcional: deja un texto fijo)
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const d = String(now.getDate()).padStart(2,'0');
    const mo = String(now.getMonth()+1).padStart(2,'0');
    const y = now.getFullYear();
    el.textContent = `TC fijo: ${COP_PER_BOB} COP/BOB — ${h}:${m} ${d}/${mo}/${y}`;
  }

  function calculateTransfer() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      receivedInput.value = '';
      resultAmount.textContent = '0';
      resultCard.style.display = 'none';
      return;
    }

    const cop = Math.round(amount * COP_PER_BOB * MULT);
    receivedInput.value = cop.toLocaleString('es-CO');
    resultAmount.textContent = cop.toLocaleString('es-CO');
    resultCard.style.display = 'block';
    updateCotizDatetime();
  }

  amountInput.addEventListener('input', calculateTransfer);
  calculateTransfer();

  // --- Botón Enviar Dinero (igual que antes) ---
  calculateBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor ingresa un monto válido en Bolivianos (BOB).');
      return;
    }
    const cop = Math.round(amount * COP_PER_BOB * MULT);
    const message = `Hola, quiero enviar ${amount} BOB (${cop.toLocaleString('es-CO')} COP) a Colombia. ¿Me ayudan con el envío?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    calculateBtn.style.backgroundColor = '#28a745';
    calculateBtn.innerHTML = '<i class="fas fa-check"></i> Redirigiendo a WhatsApp...';

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setTimeout(() => {
        calculateBtn.style.backgroundColor = '';
        calculateBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Dinero';
      }, 3000);
    }, 800);
  });
});

// ===== Service Worker (opcional, como lo tenías) =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/service-worker.js')
    .then(reg => console.log('✅ Service Worker registrado:', reg))
    .catch(err => console.error('❌ Error registrando el Service Worker:', err));
}

// ===== Instalación PWA (opcional, como lo tenías) =====
let deferredPrompt;
const installBtn = document.getElementById('install-btn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.style.display = 'block';
});
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') installBtn.style.display = 'none';
      deferredPrompt = null;
    }
  });
}
window.addEventListener('appinstalled', () => {
  if (installBtn) installBtn.style.display = 'none';
});

// ===== iOS helper (opcional) =====
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;
if (isIOS && isSafari && !isInStandaloneMode) {
  const iosBtn = document.getElementById('ios-install-btn');
  const iosModal = document.getElementById('ios-modal');
  if (iosBtn && iosModal) {
    iosBtn.style.display = 'block';
    iosBtn.addEventListener('click', () => { iosModal.style.display = 'block'; });
  }
}
