(() => {
  // ===== CONFIG =====
  const WHATSAPP_NUMBER = "59175333489";
  const COP_PER_BOB = 384; // ajusta si cambia
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
    return Math.round(bob * COP_PER_BOB);
  }

  function animateNumber(el, from, to, duration = 520) {
    const start = performance.now();
    const diff = to - from;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(from + diff * eased);
      el.textContent = fmtCOP.format(value);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function addRipple(btn, ev) {
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

  function calculate({ animate = true } = {}) {
    const amount = $("amount");
    const received = $("received-amount");
    const resultCard = $("result-card");
    const resultAmount = $("result-amount");
    const rateEl = $("rate-pill-value");
    const dateEl = $("cotiz-datetime");

    const bob = Number(amount.value);

    // rate + date siempre visibles (serio)
    if (rateEl) rateEl.textContent = `${fmtCOP.format(COP_PER_BOB)} COP/BOB`;
    if (dateEl) dateEl.textContent = nowStamp();

    if (!Number.isFinite(bob) || bob <= 0) {
      received.value = "";
      resultAmount.textContent = "0";
      resultCard.style.display = "none";
      return;
    }

    const cop = computeCOP(bob);
    received.value = fmtCOP.format(cop);

    resultCard.style.display = "block";
    const prev = Number(String(resultAmount.textContent).replace(/[^\d]/g, "")) || 0;

    if (animate) animateNumber(resultAmount, prev, cop);
    else resultAmount.textContent = fmtCOP.format(cop);
  }

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
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  // Marquee PRO: duplicar contenido para loop perfecto
  function setupMarquee() {
    const marquee = document.getElementById("marquee");
    const track = document.getElementById("marqueeTrack");
    if (!marquee || !track) return;

    if (!track.dataset.duplicated) {
      track.innerHTML += track.innerHTML;
      track.dataset.duplicated = "1";
    }

    let t = null;
    const pause = () => {
      marquee.classList.add("paused");
      if (t) clearTimeout(t);
    };
    const resume = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => marquee.classList.remove("paused"), 900);
    };

    marquee.addEventListener("pointerdown", pause, { passive: true });
    marquee.addEventListener("touchstart", pause, { passive: true });
    marquee.addEventListener("pointerup", resume, { passive: true });
    marquee.addEventListener("touchend", resume, { passive: true });
    marquee.addEventListener("mouseleave", () => marquee.classList.remove("paused"), { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const amount = $("amount");
    if (amount) amount.addEventListener("input", () => calculate({ animate: false }));

    calculate({ animate: false });
    setupSend();
    setupMarquee();
  });
})();
