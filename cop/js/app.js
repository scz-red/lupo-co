document.addEventListener('DOMContentLoaded', () => {
  const amountInput = document.getElementById('amount');
  const receivedInput = document.getElementById('received-amount');
  const resultCard = document.getElementById('result-card');
  const resultAmountEl = document.getElementById('result-amount');
  const calculateBtn = document.getElementById('calculate-btn');

  // Configuración (ajusta tasa cuando quieras)
  const EXCHANGE_RATE = 0.00221;  // 1 COP = 0.00240 BOB
  const WHATSAPP_NUMBER = '59175333489';

  // Fecha/hora
  const timeEl = document.getElementById('current-date-time');
  const updateDateTime = () => {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('es-ES', {
      day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'
    });
    timeEl.innerHTML = `${fmt.format(now)} <i class="fas fa-check-circle" style="color: var(--yellow); margin-left: 5px;"></i>`;
  };
  updateDateTime(); setInterval(updateDateTime, 60_000);

  // Utilidades
  const animateCount = (el, to, ms=400) => {
    const from = parseFloat(el.textContent.replace(',', '.')) || 0;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / ms);
      const val = from + (to - from) * (1 - Math.pow(1 - p, 3)); // ease-out
      el.textContent = val.toFixed(2);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const formatCOP = (n) => new Intl.NumberFormat('es-CO').format(n);

  // Cálculo
  const calculate = () => {
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
      const received = +(amount * EXCHANGE_RATE).toFixed(2);
      receivedInput.value = received.toFixed(2);
      resultCard.style.display = 'block';
      animateCount(resultAmountEl, received);
    } else {
      receivedInput.value = '';
      resultCard.style.display = 'none';
    }
  };

  amountInput.addEventListener('input', calculate);

  // Enviar a WhatsApp
  calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount) && amount > 0) {
      const received = (amount * EXCHANGE_RATE).toFixed(2);
      const msg = `Hola, quiero enviar ${formatCOP(amount)} COP (${received} BOB) a Bolivia. ¿Me ayudan con el envío?`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      calculateBtn.disabled = true;
      const prev = calculateBtn.innerHTML;
      calculateBtn.innerHTML = '<i class="fas fa-check"></i> Redirigiendo a WhatsApp...';

      setTimeout(() => {
        window.open(url, '_blank');
        setTimeout(() => {
          calculateBtn.disabled = false;
          calculateBtn.innerHTML = prev;
        }, 1400);
      }, 600);
    } else {
      alert('Por favor ingresa un monto válido en Pesos Colombianos (COP)');
    }
  });

  // Autocalcular si hay valor
  if (amountInput.value) calculate();
});






