document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('amount');
  const receivedInput = document.getElementById('received-amount');
  const resultCard = document.getElementById('result-card');
  const calculateBtn = document.getElementById('calculate-btn');

  // Configuración
  const EXCHANGE_RATE = 0.00240; // 1 COP = 0.00240 BOB
  const WHATSAPP_NUMBER = '59175333489';

  // Mostrar fecha y hora actual
  function updateDateTime() {
    const now = new Date();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const dateStr = now.toLocaleDateString('es-ES', options);
    document.getElementById('current-date-time').innerHTML = `
      ${dateStr} <i class="fas fa-check-circle" style="color: var(--yellow); margin-left: 5px;"></i>
    `;
  }

  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Calcular automáticamente al escribir
  amountInput.addEventListener('input', calculateTransfer);

  // Función principal
  function calculateTransfer() {
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount) && amount > 0) {
      const receivedAmount = (amount * EXCHANGE_RATE).toFixed(2);
      receivedInput.value = receivedAmount;
      document.getElementById('result-amount').textContent = receivedAmount;
      resultCard.style.display = 'block';
    } else {
      receivedInput.value = '';
      resultCard.style.display = 'none';
    }
  }

  // Manejar el clic en el botón de enviar
  calculateBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount) && amount > 0) {
      const receivedAmount = (amount * EXCHANGE_RATE).toFixed(2);
      const message = `Hola, quiero enviar ${amount.toLocaleString('es-CO')} COP (${receivedAmount} BOB) a Bolivia. ¿Me ayudan con el envío?`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      // Feedback visual
      calculateBtn.style.backgroundColor = '#28a745';
      calculateBtn.innerHTML = '<i class="fas fa-check"></i> Redirigiendo a WhatsApp...';

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');

        // Restaurar el botón luego
        setTimeout(() => {
          calculateBtn.style.backgroundColor = '';
          calculateBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Dinero';
        }, 3000);
      }, 1000);
    } else {
      alert('Por favor ingresa un monto válido en Pesos Colombianos (COP)');
    }
  });

  // Calcular al cargar si hay un valor
  if (amountInput.value) {
    calculateTransfer();
  }
});
