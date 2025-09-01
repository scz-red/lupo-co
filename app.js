// moved from inline <script>
document.addEventListener('DOMContentLoaded', function () {
  const amountInput   = document.getElementById('amount');
  const receivedInput = document.getElementById('received-amount');
  const resultAmount  = document.getElementById('result-amount');
  const resultCard    = document.getElementById('result-card');
  const calculateBtn  = document.getElementById('calculate-btn');
  const WHATSAPP_NUMBER = '59171077231';

  // ===== % de descuento (frontend) =====
  const FRONTEND_DISCOUNT = 0.12;              // 10%
  const MULT = 1 - FRONTEND_DISCOUNT;          // 0.90

  // --- CACHÉ de 1 minuto ---
  let cachedRate = null; // COP por 1 BOB
  let cachedTime = 0;
  const CACHE_TIME = 60 * 1000;

  async function getBobToCopRate() {
    const now = Date.now();
    if (cachedRate && (now - cachedTime < CACHE_TIME)) return cachedRate;

    try {
      const res = await fetch('https://api.lupo.lat/cambio_a_bob?moneda=cop&monto=100');
      const data = await res.json();
      // data.resultado = BOB por 100 COP  -> BOB/COP
      if (!data || !data.resultado || data.resultado <= 0) throw new Error('API inválida');
      cachedRate = 100 / data.resultado;      // COP/BOB
      cachedTime = now;
      return cachedRate;
    } catch (e) {
      console.error('Error tasa COP:', e);
      return cachedRate || 0; // fallback a lo último válido
    }
  }

  function updateCotizDatetime() {
    const fechaEl = document.getElementById('cotiz-datetime');
    if (!fechaEl) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const d = now.getDate();
    const mo = now.getMonth() + 1;
    const y = now.getFullYear();
    fechaEl.textContent = `${h}:${m} ${d}/${mo}/${y}`;
  }

  async function calculateTransfer() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      receivedInput.value = '';
      resultAmount.textContent = '0';
      resultCard.style.display = 'none';
      return;
    }
    const rate = await getBobToCopRate();      // COP/BOB
    if (!rate) return;

    const cop = Math.round(amount * rate * MULT); // aplica descuento único
    receivedInput.value = cop.toLocaleString('es-CO');
    resultAmount.textContent = cop.toLocaleString('es-CO');
    resultCard.style.display = 'block';
    updateCotizDatetime();
  }

  amountInput.addEventListener('input', calculateTransfer);
  calculateTransfer();

  // --- Botón Enviar Dinero ---
  calculateBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor ingresa un monto válido en Bolivianos (BOB)');
      return;
    }
    const rate = await getBobToCopRate();
    const cop = Math.round(amount * rate * MULT); // mismo descuento

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
    }, 1000);
  });

  if (amountInput.value) calculateTransfer();
});


// moved from inline <script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/service-worker.js')
    .then(reg => console.log('✅ Service Worker registrado:', reg))
    .catch(err => console.error('❌ Error registrando el Service Worker:', err));
}


// moved from inline <script>
let deferredPrompt;
  const installBtn = document.getElementById('install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    // Evita que el navegador muestre su propio prompt
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('✅ Usuario aceptó instalar la app');
        installBtn.style.display = 'none';
      } else {
        console.log('❌ Usuario rechazó instalar la app');
      }
      deferredPrompt = null;
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('🎉 App instalada');
    installBtn.style.display = 'none';
  });


// moved from inline <script>
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;

  if (isIOS && isSafari && !isInStandaloneMode) {
    const iosBtn = document.getElementById('ios-install-btn');
    const iosModal = document.getElementById('ios-modal');

    iosBtn.style.display = 'block';
    iosBtn.addEventListener('click', () => {
      iosModal.style.display = 'block';
    });
  }
