// ================================
// LUPO - app.js (2026 Modern)
// ================================

(() => {
  // ---------- CONFIG ----------
  const WHATSAPP_NUMBER = "59175333489";

  // EDITA AQUÍ: COP por 1 BOB (ejemplo: 190 significa 1 BOB = 190 COP)
  const COP_PER_BOB = 384;

  // Margen/descuento en frontend (tu comentario decía 12% pero era 10%)
  const FRONTEND_DISCOUNT = 0.10;     // 10%
  const MULT = 1 - FRONTEND_DISCOUNT; // 0.90

  // ---------- HELPERS ----------
  const fmtCOP = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });
  const fmtBOB = new Intl.NumberFormat("es-BO", { maximumFractionDigits: 0 });

  const $ = (id) => document.getElementById(id);

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function setValue(el, value) {
    if (el) el.value = value;
  }

  function nowStamp() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const mo = String(now.getMonth() + 1).padStart(2, "0");
    const y = now.getFullYear();
    return `${h}:${m} ${d}/${mo}/${y}`;
  }

  function computeCOP(amountBob) {
    return Math.round(amountBob * COP_PER_BOB * MULT);
  }

  // ---------- CALC ----------
  function calculateTransfer() {
    const amountInput = $("amount");
    const receivedInput = $("received-amount");
    const resultAmount = $("result-amount");
    const resultCard = $("result-card");
    const cotizDatetime = $("cotiz-datetime");

    if (!amountInput || !receivedInput || !resultAmount || !resultCard) return;

    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount <= 0) {
      setValue(receivedInput, "");
      setText(resultAmount, "0");
      resultCard.style.display = "none";
      setText(cotizDatetime, "");
      return;
    }

    const cop = computeCOP(amount);

    setValue(receivedInput, fmtCOP.format(cop));
    setText(resultAmount, fmtCOP.format(cop));
    resultCard.style.display = "block";

    // TC fijo + timestamp
    if (cotizDatetime) {
      cotizDatetime.textContent = `TC fijo: ${fmtCOP.format(COP_PER_BOB)} COP/BOB — ${nowStamp()}`;
    }
  }

  // ---------- WHATSAPP ----------
  function setupWhatsappButton() {
    const amountInput = $("amount");
    const calculateBtn = $("calculate-btn");

    if (!amountInput || !calculateBtn) return;

    const originalHTML = calculateBtn.innerHTML;

    const setBtnState = (state) => {
      // state: "idle" | "loading" | "done"
      calculateBtn.classList.remove("is-wa-loading", "is-wa-done");
      if (state === "loading") calculateBtn.classList.add("is-wa-loading");
      if (state === "done") calculateBtn.classList.add("is-wa-done");
    };

    calculateBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const amount = Number(amountInput.value);

      if (!Number.isFinite(amount) || amount <= 0) {
        alert("Por favor ingresa un monto válido en Bolivianos (BOB).");
        amountInput.focus();
        return;
      }

      const cop = computeCOP(amount);

      const message =
        `Hola, quiero enviar ${fmtBOB.format(amount)} BOB ` +
        `(${fmtCOP.format(cop)} COP) a Colombia. ¿Me ayudan con el envío?`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      // UX: estado
      setBtnState("loading");
      calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abriendo WhatsApp...';

      setTimeout(() => {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setBtnState("done");
        calculateBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';

        setTimeout(() => {
          setBtnState("idle");
          calculateBtn.innerHTML = originalHTML;
        }, 2200);
      }, 450);
    });
  }

  // ---------- PWA + SW ----------
  function setupServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    // Nota: solo registra si tu ruta existe en tu hosting.
    // Si lo tienes en /js/service-worker.js perfecto.
    navigator.serviceWorker
      .register("/js/service-worker.js")
      .then((reg) => console.log("✅ Service Worker registrado:", reg.scope))
      .catch((err) => console.warn("⚠️ Service Worker no se registró:", err));
  }

  function setupPWAInstall() {
    let deferredPrompt = null;

    const installBtn = $("install-btn");
    if (!installBtn) return;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.style.display = "block";
    });

    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) return;

      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice?.outcome === "accepted") {
        installBtn.style.display = "none";
      }
      deferredPrompt = null;
    });

    window.addEventListener("appinstalled", () => {
      installBtn.style.display = "none";
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

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", () => {
    const amountInput = $("amount");
    if (amountInput) {
      amountInput.addEventListener("input", calculateTransfer);
      calculateTransfer();
    }

    setupWhatsappButton();
    setupServiceWorker();
    setupPWAInstall();
    setupIOSHelper();
  });
})();
