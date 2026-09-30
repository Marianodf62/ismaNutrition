// ====== Config ======
const WHATSAPP_NUMBER = "5493816145118"; // 381 614-5118 (Argentina, formato internacional)

const img = (id) => `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

// Menú semanal (provisorio: editar libremente)
const WEEK = [
  {
    day: "Lunes",
    title: "Bowl verde de energía",
    kcal: "≈ 1.800 kcal",
    photo: img("photo-1546069901-ba9599a7e63c"),
    meals: [
      ["🥣", "Desayuno", "Yogur natural con avena, banana y nueces"],
      ["🥗", "Almuerzo", "Bowl de quinoa, palta, garbanzos y vegetales"],
      ["🍎", "Merienda", "Manzana + puñado de almendras"],
      ["🍗", "Cena", "Pollo a la plancha con calabaza asada"],
    ],
  },
  {
    day: "Martes",
    title: "Salmón & vegetales asados",
    kcal: "≈ 1.850 kcal",
    photo: img("photo-1467003909585-2f8a72700288"),
    meals: [
      ["🍳", "Desayuno", "Tostadas integrales con huevo revuelto"],
      ["🐟", "Almuerzo", "Salmón al horno con espárragos y papa"],
      ["🍓", "Merienda", "Licuado de frutos rojos con leche"],
      ["🥦", "Cena", "Tortilla de espinaca y ensalada fresca"],
    ],
  },
  {
    day: "Miércoles",
    title: "Ensalada mediterránea",
    kcal: "≈ 1.750 kcal",
    photo: img("photo-1540189549336-e6e99c3679fe"),
    meals: [
      ["🥑", "Desayuno", "Tostada con palta, tomate y semillas"],
      ["🥗", "Almuerzo", "Ensalada de lentejas, feta, pepino y aceitunas"],
      ["🍌", "Merienda", "Yogur con banana y canela"],
      ["🍲", "Cena", "Sopa de verduras con pollo desmenuzado"],
    ],
  },
  {
    day: "Jueves",
    title: "Buddha bowl colorido",
    kcal: "≈ 1.800 kcal",
    photo: img("photo-1512621776951-a57141f2eefd"),
    meals: [
      ["🥞", "Desayuno", "Panqueques de avena y banana"],
      ["🥙", "Almuerzo", "Bowl de arroz integral, tofu y vegetales"],
      ["🥜", "Merienda", "Tostada con mantequilla de maní"],
      ["🐟", "Cena", "Merluza al limón con puré de calabaza"],
    ],
  },
  {
    day: "Viernes",
    title: "Desayuno power",
    kcal: "≈ 1.900 kcal",
    photo: img("photo-1484723091739-30a097e8f929"),
    meals: [
      ["🫐", "Desayuno", "Tostadas francesas integrales con frutas"],
      ["🌯", "Almuerzo", "Wrap integral de pollo, hojas verdes y hummus"],
      ["🥝", "Merienda", "Ensalada de frutas de estación"],
      ["🍝", "Cena", "Fideos integrales con salsa de tomate y albahaca"],
    ],
  },
  {
    day: "Sábado",
    title: "Brunch saludable",
    kcal: "≈ 2.000 kcal",
    photo: img("photo-1482049016688-2d3e1b311543"),
    meals: [
      ["🍳", "Brunch", "Huevos pochados, palta y pan de masa madre"],
      ["🥗", "Almuerzo", "Ensalada tibia de pollo y vegetales grillados"],
      ["🍵", "Merienda", "Té verde + muffin de avena casero"],
      ["🍕", "Cena", "Pizza casera integral con vegetales"],
    ],
  },
  {
    day: "Domingo",
    title: "Comida en familia",
    kcal: "≈ 2.000 kcal",
    photo: img("photo-1504674900247-0877df9cc836"),
    meals: [
      ["🥐", "Desayuno", "Smoothie bowl con granola y frutas"],
      ["🥩", "Almuerzo", "Carne magra a la parrilla con ensalada mixta"],
      ["🍉", "Merienda", "Fruta fresca + yogur"],
      ["🥣", "Cena", "Crema de zapallo con semillas tostadas"],
    ],
  },
];

// ====== WhatsApp links ======
document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = encodeURIComponent(el.dataset.wa || "Hola Ismael!");
  el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
});

// ====== Week cards ======
const weekEl = document.getElementById("week");
const todayIdx = (new Date().getDay() + 6) % 7; // lunes = 0

WEEK.forEach((d, i) => {
  const card = document.createElement("article");
  card.className = "day-card" + (i === todayIdx ? " is-today" : "");
  card.style.transitionDelay = `${i * 70}ms`;
  card.innerHTML = `
    <img src="${d.photo}" alt="${d.title}" loading="lazy" draggable="false" />
    <div class="day-top">
      <span class="day-name">${d.day}</span>
      ${i === todayIdx ? '<span class="day-today">Hoy</span>' : `<span class="day-num">0${i + 1}</span>`}
    </div>
    <div class="day-body">
      <h3>${d.title}</h3>
      <span class="day-kcal">${d.kcal}</span>
      <ul class="meals">
        ${d.meals.map(([ico, label, text]) => `<li><span>${ico}</span><div><b>${label}</b>${text}</div></li>`).join("")}
      </ul>
    </div>`;
  card.addEventListener("click", () => {
    if (weekEl.dataset.moved === "1") return;
    const wasActive = card.classList.contains("active");
    weekEl.querySelectorAll(".day-card.active").forEach((c) => c.classList.remove("active"));
    if (!wasActive) card.classList.add("active");
  });
  weekEl.appendChild(card);
});

// Selector de días (mobile): muestra una sola tarjeta a la vez
const pillsEl = document.getElementById("dayPills");
function selectDay(idx) {
  [...weekEl.children].forEach((c, i) => c.classList.toggle("selected", i === idx));
  [...pillsEl.children].forEach((p, i) => {
    p.classList.toggle("active", i === idx);
    p.setAttribute("aria-selected", i === idx);
  });
}
WEEK.forEach((d, i) => {
  const pill = document.createElement("button");
  pill.className = "day-pill" + (i === todayIdx ? " today" : "");
  pill.setAttribute("role", "tab");
  pill.textContent = d.day.slice(0, 3);
  pill.addEventListener("click", () => selectDay(i));
  pillsEl.appendChild(pill);
});
selectDay(todayIdx);

// Scroll hasta el día de hoy
requestAnimationFrame(() => {
  const today = weekEl.children[todayIdx];
  if (today && todayIdx > 0) weekEl.scrollLeft = today.offsetLeft - 20;
  updateBar();
});

// Controles + barra de progreso
const bar = document.getElementById("wkBar");
function updateBar() {
  const max = weekEl.scrollWidth - weekEl.clientWidth;
  const ratio = weekEl.clientWidth / weekEl.scrollWidth;
  const pct = max > 0 ? weekEl.scrollLeft / max : 1;
  bar.style.width = `${Math.max(ratio, 0.12) * 100 + pct * (100 - Math.max(ratio, 0.12) * 100)}%`;
}
weekEl.addEventListener("scroll", updateBar, { passive: true });
window.addEventListener("resize", updateBar);
document.querySelectorAll(".wk-btn").forEach((b) =>
  b.addEventListener("click", () => {
    const step = weekEl.firstElementChild.getBoundingClientRect().width + 20;
    weekEl.scrollBy({ left: step * Number(b.dataset.dir), behavior: "smooth" });
  })
);

// Drag para desplazar con mouse
let isDown = false, startX = 0, startLeft = 0;
weekEl.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse") return;
  isDown = true; startX = e.clientX; startLeft = weekEl.scrollLeft; weekEl.dataset.moved = "0";
});
window.addEventListener("pointermove", (e) => {
  if (!isDown) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 5) { weekEl.dataset.moved = "1"; weekEl.classList.add("dragging"); }
  weekEl.scrollLeft = startLeft - dx;
});
window.addEventListener("pointerup", () => {
  if (!isDown) return;
  isDown = false; weekEl.classList.remove("dragging");
  setTimeout(() => (weekEl.dataset.moved = "0"), 0);
});

// ====== Reveal on scroll ======
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
  }),
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal, .day-card").forEach((el) => io.observe(el));

// Stagger en grillas
document.querySelectorAll(".services-grid, .steps, .t-grid, .faq-list, .stats, .creds").forEach((g) =>
  [...g.children].forEach((c, i) => (c.style.transitionDelay = `${i * 90}ms`))
);

// ====== Counters ======
const counterIO = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || "";
  const t0 = performance.now(), dur = 1800;
  const tick = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  counterIO.unobserve(el);
}), { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

// ====== Nav ======
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 30), { passive: true });
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  burger.classList.remove("open");
  navLinks.classList.remove("open");
}));

// ====== Pointer effects (solo desktop) ======
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (fine && !reduced) {
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });

  document.querySelectorAll(".tilt").forEach((el) => {
    el.style.transition = "transform .6s cubic-bezier(.22,1,.36,1)";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });

  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}

// ====== WhatsApp tooltip hint ======
const waFloat = document.querySelector(".wa-float");
setTimeout(() => waFloat.classList.add("hint"), 3500);
setTimeout(() => waFloat.classList.remove("hint"), 8500);

// ====== Misc ======
document.getElementById("year").textContent = new Date().getFullYear();
window.addEventListener("load", () => document.body.classList.add("loaded"));
setTimeout(() => document.body.classList.add("loaded"), 1500);
