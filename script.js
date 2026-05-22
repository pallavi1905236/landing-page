// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('.num[data-target]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const dur = 1400;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cio.observe(c));

// Dotted world map (procedural)
const dotsGroup = document.getElementById('dots');
if (dotsGroup) {
  const continents = [
    // rough rectangles approximating continents
    {x: 60, y: 80, w: 110, h: 70},   // N America
    {x: 140, y: 160, w: 60, h: 80},  // S America
    {x: 240, y: 70, w: 60, h: 50},   // Europe
    {x: 250, y: 120, w: 90, h: 90},  // Africa
    {x: 320, y: 70, w: 130, h: 80},  // Asia
    {x: 430, y: 180, w: 60, h: 40},  // Oceania
  ];
  const svgns = 'http://www.w3.org/2000/svg';
  const frag = document.createDocumentFragment();
  continents.forEach(c => {
    const density = 0.55;
    for (let y = 0; y < c.h; y += 6) {
      for (let x = 0; x < c.w; x += 6) {
        // organic edge: skip some
        const dx = (x - c.w/2) / (c.w/2);
        const dy = (y - c.h/2) / (c.h/2);
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d > 1) continue;
        if (Math.random() > density) continue;
        const dot = document.createElementNS(svgns, 'circle');
        dot.setAttribute('cx', c.x + x + (Math.random()*2-1));
        dot.setAttribute('cy', c.y + y + (Math.random()*2-1));
        dot.setAttribute('r', 1.3);
        frag.appendChild(dot);
      }
    }
  });
  dotsGroup.appendChild(frag);
}
