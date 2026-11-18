import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { asset, portfolio } from './content.js';
import { finishLoading } from './loading-screen.js';
import './styles.css';
import './charcoal.css';

const { charcoal, contact, profile } = portfolio;
const portfolioUrl = asset('index.html');
const inquiryUrl = `mailto:${contact.email}?subject=${encodeURIComponent('Charcoal portrait inquiry')}`;

function CharcoalPage() {
  useEffect(() => finishLoading(), []);

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="charcoal-header">
      <div className="site-width">
        <a className="wordmark" href={portfolioUrl}><span aria-hidden="true">✦</span>{profile.name}</a>
        <a className="charcoal-back" href={portfolioUrl}>Back to portfolio</a>
      </div>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="charcoal-intro" aria-labelledby="charcoal-title">
        <div className="site-width charcoal-layout">
          <div>
            <h1 id="charcoal-title">{charcoal.title}</h1>
            <p>{charcoal.description}</p>
            <a className="charcoal-cta" href={inquiryUrl}>Request a quote <span aria-hidden="true">↗</span></a>
          </div>
          <aside className="charcoal-inquiry" aria-labelledby="inquiry-title">
            <h2 id="inquiry-title">What to include</h2>
            <ul>{charcoal.inquiryDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          </aside>
        </div>
      </section>
      {charcoal.gallery.length > 0 && <section className="section site-width" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="section-title">Selected portraits</h2>
        <div className="charcoal-gallery">
          {charcoal.gallery.map(({ image, alt, caption }) => <figure key={image}>
            <img src={asset(image)} alt={alt} loading="lazy" />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>)}
        </div>
      </section>}
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<CharcoalPage />);
