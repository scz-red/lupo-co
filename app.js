// ================================
// LUPO - app.js (V2 PRO UX Pack)
// ================================

(() => {
  // ---------- CONFIG ----------
  const WHATSAPP_NUMBER = "59175333489";
  const COP_PER_BOB = 384;
  const FRONTEND_DISCOUNT = 0.10; // 10%
  const MULT = 1 - FRONTEND_DISCOUNT;

  // ---------- HELPERS ----------
  const fmtCOP = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
  const fmtBOB = new Intl.NumberFormat("es-BO", { maximumFractionDigits: 0 });
  const $ = (id) => document.getElementById(id);

  function nowStampCompact() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  }

  function nowStampDate() {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, "0");
    const mo = String(now.getMonth() + 1).padStart(2, "0");
    const y = now.getFullYear();
    return `${d}/${mo}/${y}`;
  }

  function computeCOP(amountBob) {
    return Math.round(amountBob * COP_PER_BOB * MULT);
  }

  // ---------- PRO: Counter animation ----------
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

  // ---------- PRO: Ripple ----------
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

  // ---------- CALC ----------
  function calculateTransfer({ animate = true } = {}) {
    const amountInput = $("amount");
    const receivedInput = $("received-amount");
    const resultAmountEl = $("result-amount");
    const resultCard = $("result-card");
    const cotizDatetime = $("cotiz-datetime");
    const ratePillValue = $("rate-pill-value");

    if (!amountInput || !receivedInput || !resultAmountEl || !resultCard) return;

    const amount = Number(amountInput.value);
    if (!Number.isFinite(amount) || amount <= 0) {
      receivedInput.value = "";
      resultAmountEl.textContent = "0";
      resultCard.style.display = "none";
      if (cotizDatetime) cotizDatetime.textContent = "";
      if (ratePillValue) ratePillValue.textContent = "—";
      return;
    }

    const cop = computeCOP(amount);

    receivedInput.value = fmtCOP.format(cop);
    resultCard.style.display = "block";

    const prev = Number(String(resultAmountEl.textContent).replace(/[^\d]/g, "")) || 0;
    if (animate) animateNumber(resultAmountEl, prev, cop);
    else resultAmountEl.textContent = fmtCOP.format(cop);

    // Texto más humano + marcado CO
    if (cotizDatetime) {
      cotizDatetime.textContent =
        `Destino: Colombia · Tipo de cambio ${fmtCOP.format(COP_PER_BOB)} COP/BOB · ${nowStampCompact()} · ${nowStampDate()}`;
    }

    if (ratePillValue) {
      ratePillValue.textContent = `${fmtCOP.format(COP_PER_BOB)} COP/BOB`;
    }
  }

  // ---------- Send button ----------
  function setupSendButton() {
    const amountInput = $("amount");
    const btn = $("calculate-btn");
    if (!amountInput || !btn) return;

    const originalHTML = btn.innerHTML; // queda "Enviar dinero"

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addRipple(btn, e);

      const amount = Number(amountInput.value);
      if (!Number.isFinite(amount) || amount <= 0) {
        alert("Por favor ingresa un monto válido en Bolivianos (BOB).");
        amountInput.focus();
        return;
      }

      calculateTransfer({ animate: true });

      const cop = computeCOP(amount);
      const msg = `Hola, quiero enviar ${fmtBOB.format(amount)} BOB (${fmtCOP.format(cop)} COP) a Colombia. ¿Me ayudan con el envío?`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      // loading pro
      btn.classList.add("is-loading");
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

      try { navigator.vibrate?.(18); } catch {}

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");

        btn.classList.remove("is-loading");
        btn.innerHTML = '<i class="fas fa-check"></i> Enviado';

        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 1600);
      }, 450);
    });
  }

  // ---------- PWA ----------
  function setupPWAInstall() {
    let deferredPrompt = null;
    const installBtn = $("install-btn");

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBtn) installBtn.style.display = "block";
    });

    if (installBtn) {
      installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice?.outcome === "accepted") installBtn.style.display = "none";
        deferredPrompt = null;
      });
    }

    window.addEventListener("appinstalled", () => {
      if (installBtn) installBtn.style.display = "none";
    });
  }

  function setupIOSHelper() {
    const iosBtn = $("ios-install-btn");
    const iosModal = $("ios-modal");
    if (!iosBtn || !iosModal) return;

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isSafari = /safari/.test(ua) && !/crios|fxios|edgios|chrome/.test(ua);
    const isStandalone = window.navigator.standalone === true;

    if (isIOS && isSafari && !isStandalone) {
      iosBtn.style.display = "block";
      iosBtn.addEventListener("click", () => (iosModal.style.display = "block"));
    }
  }

  // ---------- Reveal on scroll ----------
  function setupReveal() {
    const nodes = document.querySelectorAll(".step, .info-card, .hero-card");
    nodes.forEach(n => n.classList.add("reveal"));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("is-in");
      });
    }, { threshold: 0.12 });

    nodes.forEach(n => io.observe(n));
  }

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("is-loaded");

    const amountInput = $("amount");
    if (amountInput) {
      amountInput.addEventListener("input", () => calculateTransfer({ animate: false }));
    }

    calculateTransfer({ animate: false });
    setupSendButton();
    setupReveal();
    setupPWAInstall();
    setupIOSHelper();
  });
})();
