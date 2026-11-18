const trailSize = 22;
const sparkleColors = ['var(--amber)', 'var(--paper)', 'var(--coral)'];

export function attachPointerTrail(gsap) {
  const layer = document.createElement('div');
  layer.className = 'pointer-trail';
  layer.setAttribute('aria-hidden', 'true');

  const particles = Array.from({ length: trailSize }, (_, index) => {
    const sparkle = document.createElement('span');
    sparkle.style.backgroundColor = sparkleColors[index % sparkleColors.length];
    layer.append(sparkle);
    return sparkle;
  });
  document.body.append(layer);

  let next = 0;
  let lastX = -Infinity;
  let lastY = -Infinity;
  let lastTime = -Infinity;

  function sparkleAt(event) {
    if (event.pointerType !== 'mouse' || event.timeStamp - lastTime < 26) return;
    if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < 10) return;

    lastX = event.clientX;
    lastY = event.clientY;
    lastTime = event.timeStamp;

    const sparkle = particles[next];
    next = (next + 1) % particles.length;
    const drift = gsap.utils.random(-14, 14);
    const rise = gsap.utils.random(14, 34);

    gsap.killTweensOf(sparkle);
    gsap.fromTo(sparkle, {
      x: lastX + 5,
      y: lastY + 7,
      scale: gsap.utils.random(0.5, 1.15),
      rotation: gsap.utils.random(-25, 25),
      opacity: 1,
    }, {
      x: lastX + 5 + drift,
      y: lastY + 7 + rise,
      scale: 0,
      rotation: drift * 4,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
    });
  }

  window.addEventListener('pointermove', sparkleAt, { passive: true });
  return () => {
    window.removeEventListener('pointermove', sparkleAt);
    gsap.killTweensOf(particles);
    layer.remove();
  };
}
