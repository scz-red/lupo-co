:root{
  --co-y:#F7C600;
  --co-b:#003893;
  --co-r:#CE1126;

  --bg:#F6F8FF;
  --card:#FFFFFF;
  --text:#0B1220;
  --muted:#667085;

  --stroke: rgba(15,23,42,.10);
  --shadow: 0 24px 70px rgba(2,8,23,.14);
  --shadow2: 0 18px 50px rgba(2,8,23,.10);
  --radius: 22px;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--text);
  background:
    radial-gradient(900px 500px at 10% 0%, rgba(0,56,147,.10), transparent 60%),
    radial-gradient(900px 500px at 90% 10%, rgba(247,198,0,.08), transparent 55%),
    radial-gradient(900px 500px at 50% 95%, rgba(206,17,38,.06), transparent 55%),
    var(--bg);
}

.wrap{ max-width: 1120px; margin: 0 auto; padding: 0 18px; }

/* Firma Colombia */
.co-stripe{
  height:6px;
  background: linear-gradient(90deg,
    var(--co-y) 0%,
    var(--co-y) 50%,
    var(--co-b) 50%,
    var(--co-b) 75%,
    var(--co-r) 75%,
    var(--co-r) 100%
  );
  box-shadow: 0 12px 40px rgba(0,0,0,.10);
}

/* Topbar */
.topbar{
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,.72);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--stroke);
}
.topbar::after{
  content:"";
  position:absolute;
  left:0; right:0; bottom:-1px;
  height: 4px;
  background: linear-gradient(90deg, var(--co-y) 50%, var(--co-b) 75%, var(--co-r) 100%);
  opacity: .95;
}
.topbar-inner{
  height: 70px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
}
.brand{ display:flex; align-items:center; text-decoration:none; }
.brand-logo{ height: 46px; display:block; }

/* Switch países */
.country-switch{
  display:flex;
  gap:10px;
  padding:6px;
  border-radius: 999px;
  border:1px solid var(--stroke);
  background: rgba(255,255,255,.70);
  box-shadow: 0 10px 30px rgba(2,8,23,.06);
}
.pill{
  display:flex;
  align-items:center;
  gap:10px;
  padding: 10px 12px;
  border-radius: 999px;
  text-decoration:none;
  color: var(--text);
  font-weight: 900;
  transition: transform .15s ease, background .15s ease;
}
.pill img{ width:24px; height:24px; border-radius: 999px; }
.pill:hover{ transform: translateY(-1px); }
.pill.active{
  background: linear-gradient(135deg, rgba(0,56,147,.12), rgba(247,198,0,.10));
  border: 1px solid rgba(0,56,147,.18);
}

/* Hero: ORDENADO (menos scroll) */
.hero{
  padding: 16px 0 8px;
  display:grid;
  grid-template-columns: .98fr 1.02fr; /* desktop: card + texto */
  gap: 18px;
  align-items:start;
}

/* Card base */
.card{
  background: rgba(255,255,255,.88);
  border: 1px solid var(--stroke);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
}

/* Calculadora */
.calc-card{ padding: 18px; }

.card-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 10px;
  margin-bottom: 10px;
}
.card-title{
  display:flex;
  align-items:center;
  gap: 12px;
}
.iconbox{
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  background: rgba(0,56,147,.10);
  color: var(--co-b);
}
.card-title strong{ font-weight: 950; }
.card-title small{ display:block; color: var(--muted); font-weight: 750; margin-top:2px; }

.status{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,56,147,.16);
  background: rgba(0,56,147,.06);
  font-weight: 950;
  color: var(--co-b);
}
.status .dot{
  width:10px; height:10px; border-radius:999px;
  background:#22c55e;
  box-shadow: 0 0 0 4px rgba(34,197,94,.18);
}

.field{ margin-top: 12px; }
label{ display:block; font-weight: 950; margin-bottom: 8px; }

.money{ position: relative; }
.flag{
  position:absolute; left:12px; top:50%;
  transform: translateY(-50%);
  width:24px; height:24px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.10);
  box-shadow: 0 10px 24px rgba(2,8,23,.10);
  background-size: cover;
  background-position: center;
}
.flag.bo{ background-image: url("https://flagcdn.com/w40/bo.png"); }
.flag.co{ background-image: url("https://flagcdn.com/w40/co.png"); }

.input{
  width:100%;
  padding: 14px 14px 14px 46px;
  border-radius: 16px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.92);
  font-size: 1rem;
  transition: box-shadow .2s ease, border-color .2s ease;
}
.input:focus{
  outline:none;
  border-color: rgba(0,56,147,.40);
  box-shadow: 0 0 0 4px rgba(0,56,147,.12);
}

/* CTA IMPACTANTE */
.cta{
  margin-top: 14px;
  width: 100%;
  border: 0;
  border-radius: 18px;
  padding: 14px 14px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  box-shadow: 0 20px 70px rgba(0,56,147,.22);
  background: linear-gradient(135deg, #0b47b3, #0B57D0);
  color: #fff;
}

.cta-content{
  position: relative;
  z-index: 3;
  display:flex;
  align-items:center;
  justify-content:center;
  gap: 10px;
  font-weight: 950;
  font-size: 1.02rem;
  letter-spacing: .2px;
}

/* Wipe tricolor (impacto) */
.cta-bg{
  position:absolute;
  inset:-2px;
  z-index: 1;
  background: linear-gradient(90deg, var(--co-y), var(--co-b), var(--co-r), var(--co-b), var(--co-y));
  background-size: 260% 100%;
  animation: coWipe 3.8s ease-in-out infinite;
  opacity: .95;
  filter: saturate(1.08);
}
@keyframes coWipe{
  0%{ background-position: 0% 50%; }
  50%{ background-position: 100% 50%; }
  100%{ background-position: 0% 50%; }
}

/* Glow */
.cta-glow{
  position:absolute;
  inset:-60px;
  z-index: 2;
  pointer-events:none;
  background:
    radial-gradient(240px 120px at 20% 40%, rgba(247,198,0,.42), transparent 60%),
    radial-gradient(260px 140px at 55% 20%, rgba(0,56,147,.36), transparent 62%),
    radial-gradient(260px 160px at 80% 70%, rgba(206,17,38,.30), transparent 65%);
  filter: blur(16px);
  opacity: .75;
  animation: coGlow 5.4s ease-in-out infinite;
}
@keyframes coGlow{
  0%{ transform: translate(-10px, 6px) scale(1); }
  50%{ transform: translate(12px, -8px) scale(1.02); }
  100%{ transform: translate(-10px, 6px) scale(1); }
}

/* Press */
.cta:active{
  transform: translateY(1px) scale(.995);
  box-shadow: 0 12px 40px rgba(0,56,147,.22);
}

/* Ripple */
.cta .ripple{
  position:absolute;
  border-radius:999px;
  transform: scale(0);
  animation: ripple .55s ease-out;
  background: rgba(255,255,255,.35);
  pointer-events:none;
  z-index: 4;
}
@keyframes ripple{
  to{ transform: scale(4); opacity: 0; }
}

/* Loading shimmer */
.cta.is-loading{
  pointer-events:none;
  opacity:.92;
}
.cta.is-loading::after{
  content:"";
  position:absolute;
  inset:0;
  z-index: 5;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.1s infinite;
}
@keyframes shimmer{ to{ transform: translateX(100%); } }

.meta{
  margin-top: 10px;
  display:flex;
  justify-content:space-between;
  gap: 10px;
  color: var(--muted);
  font-weight: 850;
  font-size: .92rem;
}
.meta i{ color: var(--co-b); }
.meta-right{ text-align:right; }

.result{
  margin-top: 12px;
  border-radius: 18px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.90);
  padding: 14px;
  display:none;
  animation: up .25s ease-out;
}
@keyframes up{
  from{ opacity:0; transform: translateY(10px); }
  to{ opacity:1; transform: translateY(0); }
}
.result-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  font-weight: 950;
}
.badge{
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(247,198,0,.14);
  border: 1px solid rgba(247,198,0,.28);
  font-weight: 950;
}
.result-amount{
  text-align:center;
  font-size: 2.2rem;
  letter-spacing: -0.03em;
  font-weight: 950;
  margin: 8px 0 4px;
  color: var(--co-r);
}
.result-amount small{ color: rgba(11,18,32,.70); font-weight: 900; }
.result-bottom{
  display:flex;
  justify-content:space-between;
  gap: 10px;
  color: rgba(11,18,32,.72);
  font-weight: 850;
  font-size: .95rem;
}
.result-bottom .fa-check-circle{ color:#22c55e; }

/* Texto compact */
.hero-text{
  padding: 10px 2px;
}
.kicker{
  display:inline-flex;
  align-items:center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.72);
  box-shadow: var(--shadow2);
  font-weight: 900;
}
.kdot{
  width:10px; height:10px; border-radius:999px;
  background: var(--co-y);
  box-shadow: 0 0 0 4px rgba(247,198,0,.20);
}
.kicker .sep{ opacity:.35; }
.kicker .zero{ color: var(--co-b); }

.hero-text h1{
  margin: 12px 0 10px;
  font-size: 2.05rem;
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 950;
}
.hl{ color: var(--co-b); }
.hl2{ color: var(--co-r); }
.break{ display:block; }

.trust-row{
  display:flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.trust{
  display:inline-flex;
  align-items:center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,.75);
  border: 1px solid var(--stroke);
  box-shadow: 0 10px 28px rgba(2,8,23,.06);
  font-weight: 950;
}
.trust:nth-child(1) i{ color: var(--co-b); }
.trust:nth-child(2) i{ color: var(--co-y); }
.trust:nth-child(3) i{ color: var(--co-r); }

.rate-pill{
  margin-top: 12px;
  display:inline-flex;
  align-items:center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255,255,255,.78);
  border: 1px solid var(--stroke);
  box-shadow: var(--shadow2);
  font-weight: 950;
}
.rate-pill i{ color: var(--co-y); }

/* Logos carousel */
.logos{ margin: 16px 0 6px; }
.logos-head h2{
  margin: 0;
  font-weight: 950;
  letter-spacing: -0.02em;
}
.logos-head p{
  margin: 6px 0 10px;
  color: var(--muted);
  font-weight: 750;
}

.logo-track{
  display:flex;
  gap: 12px;
  overflow-x:auto;
  padding: 8px 4px 14px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.logo-track::-webkit-scrollbar{ height: 8px; }
.logo-track::-webkit-scrollbar-thumb{
  background: rgba(15,23,42,.14);
  border-radius: 999px;
}
.logo-item{
  min-width: 160px;
  height: 72px;
  border-radius: 16px;
  background: rgba(255,255,255,.86);
  border: 1px solid var(--stroke);
  box-shadow: 0 12px 35px rgba(2,8,23,.06);
  display:flex;
  align-items:center;
  justify-content:center;
  scroll-snap-align: start;
}
.logo-item img{
  max-height: 42px;
  max-width: 130px;
  object-fit: contain;
  filter: saturate(1.02);
}

/* Steps */
.steps{ padding: 14px 0 26px; }
.section-title{ text-align:center; margin: 8px 0 12px; }
.section-title h2{ margin:0; font-size: 1.85rem; font-weight: 950; }
.section-title p{ margin: 6px auto 0; max-width: 720px; color: var(--muted); font-weight: 750; }

.step-grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.step{
  background: rgba(255,255,255,.86);
  border: 1px solid var(--stroke);
  border-radius: 18px;
  box-shadow: 0 12px 35px rgba(2,8,23,.06);
  padding: 16px;
}
.num{
  width: 38px;
  height: 38px;
  border-radius: 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight: 950;
  background: rgba(0,56,147,.10);
  color: var(--co-b);
  margin-bottom: 10px;
}
.step h3{ margin: 0 0 6px; font-weight: 950; }
.step p{ margin:0; color: rgba(11,18,32,.72); font-weight: 650; }

/* Footer + GPS */
.foot{
  border-top: 1px solid var(--stroke);
  background: rgba(255,255,255,.68);
  backdrop-filter: blur(12px);
}
.foot-inner{
  padding: 16px 18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 14px;
}
.foot-left{ display:flex; flex-direction:column; gap: 2px; }
.foot-left strong{ font-weight: 950; }
.foot-left span{ color: var(--muted); font-weight: 750; }

.foot-mid{
  display:flex;
  align-items:center;
  gap: 8px;
  color: rgba(11,18,32,.80);
  font-weight: 850;
}
.foot-mid i{ color: var(--co-r); }
.gps{
  color: var(--co-b);
  text-decoration:none;
  font-weight: 950;
}
.gps:hover{ text-decoration: underline; }

.foot-right{ display:flex; gap: 10px; }
.foot-right a{
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  border: 1px solid var(--stroke);
  background: rgba(255,255,255,.86);
  color: var(--text);
  text-decoration:none;
  box-shadow: 0 12px 35px rgba(2,8,23,.06);
}
.foot-copy{
  text-align:center;
  padding: 8px 18px 16px;
  color: rgba(102,112,133,.95);
  font-weight: 750;
}

/* Responsive: menos scroll, card primero en móvil */
@media (max-width: 980px){
  .hero{
    grid-template-columns: 1fr;
  }
  .hero-text{
    order: 2;
  }
  .calc-card{
    order: 1;
  }
  .hero-text h1{
    font-size: 1.95rem;
  }
  /* Steps: 2 por fila en móvil */
  .step-grid{
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 420px){
  .country-switch .pill span{ display:none; }
  .step-grid{ grid-template-columns: 1fr; }
}
