(() => {
  // ===== CONFIG =====
  const WHATSAPP_NUMBER = "59175333489";
  const COP_PER_BOB = 384;        // 1 BOB = 384 COP (ejemplo)
  const FRONTEND_DISCOUNT = 0.10; // 10% (ajústalo si quieres)
  const MULT = 1 - FRONTEND_DISCOUNT;

  // ===== HELPERS =====
  const fmtCOP = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
  const fmtBOB = new Intl.NumberFormat("es-BO", { maximumFractionDigits: 0 });
  const $ = (id) => document.getElementById(id);

  function nowStamp() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    return `${hh}:${mm} · ${dd}/${mo}/${yy}`;
  }

  function computeCOP(bob) {
    return Math.round(bob * COP_PER_BOB * MULT);
  }

  function animateNumber(el, from, to, duration = 520) {
    if (!el) return;
    const start = performance.now();
    const diff = to - from;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const value = Math.round(from + diff * eased);
      el.textContent = fmtCOP.format(value);
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  function addRipple(btn, ev) {
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (ev?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (ev?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  }

  // ===== MAIN CALC =====
  function calculate({ animate = true } = {}) {
    const amount = $("amount");
    const received = $("received-amount");
    const resultCard = $("result-card");
    const resultAmount = $("result-amount");
    const meta = $("cotiz-datetime");
    const ratePill = $("rate-pill-value");

    if (!amount || !received || !resultCard || !resultAmount) return;

    const bob = Number(amount.value);

    if (!Number.isFinite(bob) || bob <= 0) {
      received.value = "";
      resultAmount.textContent = "0";
      resultCard.style.display = "none";
      if (meta) meta.textContent = "";
      if (ratePill) ratePill.textContent = "—";
      return;
    }

    const cop = computeCOP(bob);

    received.value = fmtCOP.format(cop);
    resultCard.style.display = "block";

    const prev = Number(String(resultAmount.textContent).replace(/[^\d]/g, "")) || 0;
    if (animate) animateNumber(resultAmount, prev, cop);
    else resultAmount.textContent = fmtCOP.format(cop);

    if (meta) meta.textContent = `Destino: Colombia · TC ${fmtCOP.format(COP_PER_BOB)} COP/BOB · ${nowStamp()}`;
    if (ratePill) ratePill.textContent = `${fmtCOP.format(COP_PER_BOB)} COP/BOB`;
  }

  // ===== SEND (WhatsApp) =====
  function setupSend() {
    const amount = $("amount");
    const btn = $("calculate-btn");
    if (!amount || !btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addRipple(btn, e);

      const bob = Number(amount.value);
      if (!Number.isFinite(bob) || bob <= 0) {
        alert("Por favor ingresa un monto válido en BOB.");
        amount.focus();
        return;
      }

      calculate({ animate: true });

      const cop = computeCOP(bob);
      const msg = `Hola, quiero enviar ${fmtBOB.format(bob)} BOB (${fmtCOP.format(cop)} COP) a Colombia. ¿Me ayudan con el envío?`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      btn.classList.add("is-loading");
      btn.querySelector(".cta-content").innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Procesando...`;

      try { navigator.vibrate?.(18); } catch {}

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
        btn.classList.remove("is-loading");
        btn.querySelector(".cta-content").innerHTML = `<i class="fa-solid fa-check"></i> Enviado`;

        setTimeout(() => {
          btn.querySelector(".cta-content").innerHTML = `<i class="fa-solid fa-paper-plane"></i> Enviar dinero`;
        }, 1400);
      }, 420);
    });
  }

  // ===== INIT =====
  document.addEventListener("DOMContentLoaded", () => {
    const amount = $("amount");
    if (amount) amount.addEventListener("input", () => calculate({ animate: false }));
    calculate({ animate: false });
    setupSend();
  });
})();
