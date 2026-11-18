import { useEffect } from 'react';
import { pageShownEvent } from './loading-screen.js';
import { attachPointerTrail } from './pointer-trail.js';

const gsapCdn = 'https://cdn.jsdelivr.net/npm/gsap@3.15.0';

function animateHero(gsap, hero) {
  const select = gsap.utils.selector(hero);
  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.45 },
  });

  timeline
    .to(select('.hero-lettering.hero-ghost'), { yPercent: 12, scale: 1.07, opacity: 0.38 }, 0)
    .to(select('.mobile-hero-ghost'), { yPercent: 12, opacity: 0.38 }, 0)
    .to(select('.hero-portrait'), { yPercent: -14, scale: 1.045 }, 0)
    .to(select('.hero-title-art'), { yPercent: -6, opacity: 0.64 }, 0)
    .to(select('.hero-star'), {
      y: (index) => [42, -20, 65][index],
      rotation: (index) => [105, -65, 145][index],
      scale: (index) => [1.2, 0.8, 1.1][index],
      transformOrigin: '50% 50%',
    }, 0);
}

function animateHeroEntrance(gsap, hero) {
  const loader = document.getElementById('site-loader');
  if (!loader || window.scrollY > 20 || (location.hash && location.hash !== '#home')) return;

  const select = gsap.utils.selector(hero);
  const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

  timeline
    .fromTo(select('.hero-portrait'), { clipPath: 'inset(0 0 95% 0)' }, {
      clipPath: 'inset(0 0 0% 0)', duration: 0.95, clearProps: 'clipPath',
    }, 0)
    .fromTo(select('.hero-title-art'), { clipPath: 'inset(100% 0 0 0)' }, {
      clipPath: 'inset(0% 0 0 0)', duration: 0.8, clearProps: 'clipPath',
    }, 0.14)
    .fromTo(select('.hero-intro > *'), { y: 16, opacity: 0.6 }, {
      y: 0, opacity: 1, stagger: 0.09, duration: 0.65, clearProps: 'transform,opacity',
    }, 0.25);

  const play = () => timeline.play();
  if (loader.hasAttribute('data-ready')) play();
  else document.addEventListener(pageShownEvent, play, { once: true });
  return () => document.removeEventListener(pageShownEvent, play);
}

function reveal(gsap, element, from, to, trigger = element.parentElement) {
  if (element.length === 0) return;
  if (trigger.getBoundingClientRect().top <= window.innerHeight) return;
  gsap.fromTo(element, from, {
    opacity: 1,
    duration: 0.75,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
    ...to,
    scrollTrigger: { trigger, start: 'top 88%', once: true },
  });
}

function animateCertificates(gsap, root) {
  const section = root.querySelector('.certificates');
  if (!section) return;

  section.querySelectorAll('.certificate-card').forEach((card, index) => {
    reveal(gsap, card, { y: 38, rotation: index % 2 ? 1.2 : -1.2, opacity: .3 }, {
      y: 0, rotation: 0, duration: .9, delay: (index % 3) * .07,
    }, card);

    const image = card.querySelector('.certificate-mat img');
    if (image) {
      reveal(gsap, image, { y: 16, scale: 1.06, opacity: .6 }, {
        y: 0, scale: 1, duration: 1.15, delay: .1,
      }, card);
    }
  });
}

export function useScrollMotion(main) {
  useEffect(() => {
    const root = main.current;
    let disposed = false;
    let media;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import(/* @vite-ignore */ `${gsapCdn}/index.js`),
        import(/* @vite-ignore */ `${gsapCdn}/ScrollTrigger.js`),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const hero = root.querySelector('.hero');
        animateHero(gsap, hero);
        const cleanupEntrance = animateHeroEntrance(gsap, hero);

        root.querySelectorAll('.bio h2, .resume h2, .section-title').forEach((heading) => {
          reveal(gsap, heading, { y: 30, rotation: -1.5, opacity: 0.35 }, {
            y: 0, rotation: 0, transformOrigin: 'left center',
          }, heading);
        });

        root.querySelectorAll('.about-image .portrait-label').forEach((label, index) => {
          reveal(gsap, label, { x: index === 0 ? -24 : 24, opacity: 0.4 }, {
            x: 0, delay: index * 0.12, ease: 'back.out(1.25)',
          }, label);
        });

        const mosaic = root.querySelector('.project-mosaic');
        if (mosaic) reveal(gsap, mosaic, { opacity: 0.5 }, { duration: 0.85 }, mosaic);

        const revealGroups = (selector, children, distance, stagger) => {
          root.querySelectorAll(selector).forEach((group) => {
            const items = group.querySelectorAll(children);
            reveal(gsap, items, { y: distance, opacity: 0.55 }, {
              y: 0, duration: 0.65, stagger,
            }, items[0] ?? group);
          });
        };

        revealGroups('.bio', ':scope > p, :scope > .bio-actions', 18, 0.12);
        revealGroups('.timeline, .web-skills ul, .design-skills, .pills', ':scope > li', 16, 0.065);
        animateCertificates(gsap, root);
        revealGroups('.contact-details, .contact-form', '.contact-heading, :scope > p, .contact-links, .contact-form-intro, .form-field', 16, 0.08);

        return cleanupEntrance;
      }, root);
      media.add('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => attachPointerTrail(gsap));
    }

    // The page stays fully visible when the animation files are unavailable.
    setup().catch(() => {});
    return () => {
      disposed = true;
      media?.revert();
    };
  }, [main]);
}
