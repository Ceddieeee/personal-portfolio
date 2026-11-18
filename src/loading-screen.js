const readyEvent = 'portfolio:ready';
export const pageShownEvent = 'portfolio:shown';

const styles = `
  #site-loader {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: .85rem;
    padding: 1.5rem;
    background: #334a38;
    color: #f6eee1;
    text-align: center;
    transition: opacity .24s ease;
  }
  body:has(#site-loader:not([data-ready])) > #root { visibility: hidden; }
  #site-loader[data-ready] { opacity: 0; pointer-events: none; }
  #site-loader svg {
    width: clamp(2.5rem, 9vw, 3.75rem);
    color: #fdad16;
    animation: site-loader-pulse .9s ease-in-out infinite alternate;
  }
  #site-loader .loader-name { font: 400 clamp(1.7rem, 5vw, 2.45rem)/1.15 var(--display, Gloock, Georgia, serif); text-transform: none; }
  #site-loader .loader-status { font: 500 .85rem/1.2 Montserrat, system-ui, sans-serif; }
  @keyframes site-loader-pulse {
    from { opacity: .65; transform: scale(.9); }
    to { opacity: 1; transform: scale(1.08); }
  }
  @media (prefers-reduced-motion: reduce) {
    #site-loader { transition: none; }
    #site-loader svg { animation: none; }
  }
`;

const script = `
  (() => {
    const loader = document.getElementById('site-loader');
    const start = performance.now();
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fallback = setTimeout(dismiss, 3000);
    document.addEventListener('${readyEvent}', dismiss, { once: true });

    function dismiss() {
      clearTimeout(fallback);
      document.removeEventListener('${readyEvent}', dismiss);
      setTimeout(() => {
        loader.setAttribute('data-ready', '');
        document.dispatchEvent(new Event('${pageShownEvent}'));
        setTimeout(() => loader.remove(), reducedMotion ? 0 : 240);
      }, reducedMotion ? 0 : Math.max(0, 350 - (performance.now() - start)));
    }
  })();
`;

export function loadingScreenPlugin(name) {
  const safeName = name.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return {
    name: 'portfolio-loading-screen',
    transformIndexHtml() {
      return [
        { tag: 'style', injectTo: 'head-prepend', children: styles },
        {
          tag: 'div', injectTo: 'body-prepend',
          attrs: { id: 'site-loader', role: 'status' },
          children: `
            <svg aria-hidden="true" viewBox="-10 -10 20 20" fill="currentColor">
              <path d="M0-10C1.2-4 4-1.2 10 0 4 1.2 1.2 4 0 10-1.2 4-4 1.2-10 0-4-1.2-1.2-4 0-10Z" />
            </svg>
            <span class="loader-name" aria-hidden="true">${safeName}</span>
            <span class="loader-status">Loading portfolio</span>
          `,
        },
        { tag: 'script', injectTo: 'body-prepend', children: script },
        {
          tag: 'noscript', injectTo: 'body-prepend',
          children: '<style>#site-loader { display: none; }</style><p>Enable JavaScript to view the portfolio.</p>',
        },
      ];
    },
  };
}

export function finishLoading(image) {
  const announce = () => document.dispatchEvent(new Event(readyEvent));
  if (image && !image.complete) {
    image.decode().then(announce, announce);
  } else {
    announce();
  }
}
