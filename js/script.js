
document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const receivedInput = document.getElementById('received-amount');
    const resultCard = document.getElementById('result-card');
    const calculateBtn = document.getElementById('calculate-btn');

    const EXCHANGE_RATE = 240;
    const WHATSAPP_NUMBER = '59171077231';

    amountInput.addEventListener('input', function() {
        calculateTransfer();
    });

    function calculateTransfer() {
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount) && amount > 0) {
            const receivedAmount = Math.round(amount * EXCHANGE_RATE);
            receivedInput.value = receivedAmount.toLocaleString('es-CO');
            document.getElementById('result-amount').textContent = receivedAmount.toLocaleString('es-CO');
            resultCard.style.display = 'block';
        } else {
            receivedInput.value = '';
            resultCard.style.display = 'none';
        }
    }

    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const amount = parseFloat(amountInput.value);
        if (!isNaN(amount) && amount > 0) {
            const receivedAmount = Math.round(amount * EXCHANGE_RATE);
            const message = `Hola, quiero enviar ${amount} BOB (${receivedAmount.toLocaleString('es-CO')} COP) a Colombia. ¿Me ayudan con el envío?`;
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
        } else {
            alert('Por favor ingresa un monto válido en Bolivianos (BOB)');
        }
    });

    if (amountInput.value) {
        calculateTransfer();
    }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/service-worker.js')
    .then(reg => console.log('✅ Service Worker registrado:', reg))
    .catch(err => console.error('❌ Error registrando el Service Worker:', err));
}
