import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { asset, portfolio } from './content.js';
import { HeroLettering, HeroLetteringDefinitions } from './hero-lettering.jsx';
import { finishLoading, pageShownEvent } from './loading-screen.js';
import { useScrollMotion } from './scroll-motion.js';
import './styles.css';

const {
  profile, projects, skills, education, experience,
  certificates, recognition, services, contact,
} = portfolio;
const recognitionGroups = recognition.filter((group) => group.enabled && group.items.length);
const charcoalUrl = asset('charcoal.html');

const sections = [
  ['home', 'Home', true],
  ['about', 'About me', true],
  ['resume', 'Resume', true],
  ['work', 'Work', true],
  ['skills', 'Skills', true],
  ['education', 'Education', true],
  ['certificates', 'Certificates', true],
  ['services', 'Services', services.enabled],
  ['contact', 'Contact', true],
].filter(([, , show]) => show);
const mainLinks = [
  ['about', 'About me'], ['resume', 'Resume'], ['work', 'Work'],
  ['certificates', 'Certificates'], ['charcoal', 'Other', charcoalUrl],
  ['contact', 'Get in touch!'],
];

document.title = `${profile.name} | Portfolio`;

function Icon({ name, size = 20 }) {
  const paths = {
    diagonal: 'M6 18 18 6M7 6h11v11',
    down: 'M12 4v15m-6-6 6 6 6-6',
    download: 'M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4',
    close: 'm6 6 12 12M18 6 6 18',
    up: 'M12 20V5m-6 6 6-6 6 6',
    search: 'M21 21l-5-5M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
    pin: 'M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13Zm0-10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  };

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <path d={paths[name]} />
  </svg>;
}

function Star({ className = '' }) {
  return <svg aria-hidden="true" className={className} viewBox="-10 -10 20 20" fill="currentColor">
    <path d="M0-10C1.2-4 4-1.2 10 0 4 1.2 1.2 4 0 10-1.2 4-4 1.2-10 0-4-1.2-1.2-4 0-10Z" />
  </svg>;
}

function Wordmark({ onClick }) {
  return <a className="wordmark" href="#home" onClick={onClick}><Star />{profile.name}</a>;
}

function Masthead() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const header = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    const node = header.current;
    const hero = document.getElementById('home');
    let frame;

    function update() {
      frame = null;
      document.documentElement.style.setProperty('--nav-height', `${node.offsetHeight}px`);
      setPastHero(hero.getBoundingClientRect().bottom <= node.offsetHeight + 1);
    }
    function scheduleUpdate() {
      if (frame == null) frame = requestAnimationFrame(update);
    }
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(node);
    observer.observe(document.querySelector('main'));
    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    document.addEventListener(pageShownEvent, scheduleUpdate);
    return () => {
      if (frame != null) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      document.removeEventListener(pageShownEvent, scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeMenu = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', closeMenu);
    return () => desktop.removeEventListener('change', closeMenu);
  }, []);

  const headerClass = `masthead${pastHero ? ' is-past-hero' : ''}${menuOpen ? ' is-menu-open' : ''}`;

  return <header ref={header} className={headerClass}>
    <div className="masthead-inner" onKeyDown={(event) => {
      if (!menuOpen) return;
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current.focus();
      }
      if (event.key === 'Tab') {
        const focusable = event.currentTarget.querySelectorAll('a, button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey ? event.target === first : event.target === last) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    }}>
      <Wordmark onClick={() => setMenuOpen(false)} />
      <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      <nav id="main-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {mainLinks.map(([id, label, page]) => <a href={page ?? `#${id}`} key={id} onClick={(event) => {
          if (menuOpen && !page) {
            event.preventDefault();
            flushSync(() => setMenuOpen(false));
            const destination = document.getElementById(id);
            if (window.location.hash === `#${id}`) destination?.scrollIntoView();
            else window.location.hash = id;
            destination?.focus({ preventScroll: true });
          }
        }}>{label}</a>)}
      </nav>
    </div>
  </header>;
}

function Hero() {
  return <section id="home" tabIndex={-1} className="hero" aria-labelledby="hero-title">
    <h1 id="hero-title" className="sr-only">Portfolio of {profile.name}</h1>
    <div className="hero-stage">
      <HeroLetteringDefinitions />
      <HeroLettering outline />
      <img className="hero-portrait" src={asset(profile.heroPortrait)} alt={profile.heroPortraitAlt} width="1421" height="1776" fetchPriority="high" />
      <HeroLettering />
      <Star className="hero-star hero-star-top" />
      <Star className="hero-star hero-star-small" />
      <Star className="hero-star hero-star-bottom" />
      <div className="hero-intro">
        <p className="hero-profession">{profile.title}</p>
        <p>{profile.tagline}</p>
        <a href="#work">View My Work <Icon name="diagonal" size={14} /></a>
      </div>
    </div>
    <a className="scroll-circle" href="#about">
      <span>Scroll<br />down</span>
      <Icon name="down" />
    </a>
  </section>;
}

function Section({ id, title, children, className = '' }) {
  return <section id={id} tabIndex={-1} className={`section ${className}`} aria-labelledby={`${id}-title`}>
    <div className="site-width">
      <h2 id={`${id}-title`} className="section-title">{title}</h2>
      {children}
    </div>
  </section>;
}

function Work() {
  const dialog = useRef(null);
  const opener = useRef(null);
  const [project, setProject] = useState(null);

  function openProject(nextProject, button) {
    opener.current = button;
    flushSync(() => setProject(nextProject));
    dialog.current.showModal();
    dialog.current.scrollTop = 0;
  }

  if (!projects.length) return null;

  return <Section id="work" title="Selected work" className="work">
    <ul className="project-mosaic">
      {projects.map((entry) => <li key={entry.id} className="project-tile" data-project={entry.id}>
        <button type="button" className="project-cover"
          aria-label={`View ${entry.sample ? 'sample' : 'case study'} for ${entry.title}`}
          onClick={(event) => openProject(entry, event.currentTarget)}>
          <span className="project-art" aria-hidden="true">
            {entry.coverPosters ? <span className="project-poster-spread">
              {entry.coverPosters.map(image => <img key={image} className="project-poster" src={asset(image)} alt="" loading="lazy" />)}
            </span> : entry.deviceCover ? <>
              {entry.screens?.[0] && <span className="project-device project-device-back">
                <img src={asset(entry.screens[0].image)} alt="" loading="lazy" />
              </span>}
              <span className="project-device project-device-front">
                <img src={asset(entry.deviceCover)} alt="" loading="lazy" />
              </span>
            </> : <img className="project-photo" src={asset(entry.cover)} alt="" loading="lazy" width="840" height="560" />}
          </span>
          <span className="project-caption">
            <span className="project-meta">{entry.category}{entry.sample && ' · Sample project'}{entry.illustrativeImages && ' · Illustrative preview'}</span>
            <span className="project-title">{entry.title}</span>
          </span>
          <span className="project-arrow"><Icon name="diagonal" size={18} /></span>
        </button>
      </li>)}
    </ul>
    <dialog ref={dialog} className="case-study" aria-labelledby="case-title" aria-describedby="case-intro" onClose={(event) => {
      event.currentTarget.querySelector('video')?.pause();
      opener.current?.focus();
    }}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="case-inner">
        <div className="case-top">
          <span className="case-context">
            {project?.logo && <img className="case-logo" src={asset(project.logo)} alt="" width="40" height="40" />}
            {project?.context ?? 'Case study'}
          </span>
          <form method="dialog"><button className="button outline close-case" autoFocus aria-label="Close case study">
            <Icon name="close" />
          </button></form>
        </div>
        {project && <>
          <header className="case-header">
            <h2 id="case-title">{project.title}</h2>
            <p id="case-intro" className="case-intro">{project.description}</p>
          </header>
          <div className="case-byline">
            {!project.sample && <span>By {profile.name}</span>}
            <span>{project.category}</span>
          </div>
          <div className="case-body">
            {!project.sample && <dl className="case-facts">
              {project.problem && <div><dt>Problem</dt><dd>{project.problem}</dd></div>}
              <div><dt>My role</dt><dd>{project.role}</dd></div>
              <div><dt>Process</dt><dd>{project.process}</dd></div>
              {project.tools?.length > 0 && <div><dt>Tools</dt><dd>{project.tools.join(', ')}</dd></div>}
              <div><dt>Final result</dt><dd>{project.result}</dd></div>
            </dl>}
            <div className="case-visuals">
              {project.demoVideo && <figure className="case-demo">
                <video controls playsInline preload="none" poster={project.demoPoster ? asset(project.demoPoster) : undefined}
                  aria-label={`${project.title} ${project.demoCaption ?? 'project walkthrough'}`}>
                  <source src={asset(project.demoVideo)} type="video/mp4" />
                </video>
                <figcaption className="case-caption">{project.demoCaption ?? 'Project walkthrough'}</figcaption>
              </figure>}
              {project.gallery ? <ul className="case-gallery" aria-label="Project artwork">
                {project.gallery.map(({ image, label, alt, wide, identity }) => <li key={image}
                  className={wide ? 'case-gallery-wide' : undefined} data-identity={identity || undefined}>
                  <figure>
                    <a href={asset(image)} target="_blank" rel="noreferrer" aria-label={`Open ${label} at full size`}>
                      <img src={asset(image)} alt={alt} loading="lazy" />
                    </a>
                    <figcaption className="case-caption">{label}</figcaption>
                  </figure>
                </li>)}
              </ul> : project.screens ? <ul className="case-screens">
                {project.screens.map(({ image, label }) => <li key={image}>
                  <figure><img src={asset(image)} alt={`${project.title} ${label.toLowerCase()} screen`} />
                    <figcaption>{label}</figcaption></figure>
                </li>)}
              </ul> : <figure>
                <img src={asset(project.detailImage)} alt={project.detailAlt}
                  width={project.detailWidth ?? 1000} height={project.detailHeight ?? 620} />
                {project.detailCaption && <figcaption className="case-caption">{project.detailCaption}</figcaption>}
              </figure>}
              {project.illustrativeImages && <p className="case-caption">Illustrative preview</p>}
            </div>
          </div>
          {project.designUrl && <a className="email-link case-design-link" href={project.designUrl} target="_blank" rel="noreferrer">
            View design in Figma <Icon name="diagonal" size={16} />
          </a>}
        </>}
      </div>
    </dialog>
  </Section>;
}

function About() {
  const linkedin = contact.socials.find(({ title }) => title === 'LinkedIn');

  return <section id="about" tabIndex={-1} className="about" aria-labelledby="about-title">
    <div className="bio">
      <h2 id="about-title">Hello,<br />{profile.headline}</h2>
      {profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <div className="bio-actions">
        {linkedin && <a href={linkedin.url} className="profile-link">
          <Icon name="search" /> Connect on LinkedIn
        </a>}
        {profile.cv && <a href={asset(profile.cv)} download className="cv-link">
          <Icon name="download" size={16} /> Download CV{profile.cvLabel && <small> ({profile.cvLabel})</small>}
        </a>}
      </div>
    </div>
    <div className="portrait-card">
      <div className="about-image">
        <img src={asset(profile.portrait)} alt={profile.portraitAlt} loading="lazy" width="1086" height="1448" />
        {profile.portraitLabels.map((label, index) => <span className={`portrait-label label-${index + 1}`} key={label}>{label}</span>)}
      </div>
      <div className="portrait-contact">
        <h3>Contact</h3>
        <p><Icon name="pin" size={16} /> {contact.location}</p>
        <a href={`mailto:${contact.email}`}><Icon name="mail" size={16} /> {contact.email}</a>
        <a href="#contact"><Icon name="diagonal" size={16} /> Get in touch</a>
      </div>
    </div>
  </section>;
}

function Timeline({ entries }) {
  return <ul className="timeline">
    {entries.map(({ title, date, detail }) => <li key={`${date}-${title}`}>
      <Star />
      <span className="timeline-date">{date}</span>
      <div><h3>{title}</h3>{detail && <p>{detail}</p>}</div>
    </li>)}
  </ul>;
}

function Pills({ items, hashtag = false }) {
  return <ul className="pills">{items.map((item) => <li key={item}>{hashtag && '#'}{item}</li>)}</ul>;
}

function Resume() {
  return <section id="resume" className="resume" tabIndex={-1} aria-label="Résumé">
    <svg className="resume-lettering" viewBox="0 0 418 314" aria-hidden="true">
      {[96, 196, 296].map((position) => <text key={position} x="1" y={position} textLength="416" lengthAdjust="spacingAndGlyphs">RESUME</text>)}
    </svg>
    <div className="resume-education" id="education" tabIndex={-1}>
      <h2>Education</h2>
      <Timeline entries={education} />
    </div>
    <div className="resume-experience">
      <h2>Experience</h2>
      <Timeline entries={experience} />
      <Pills items={skills.soft} hashtag />
    </div>
    <div className="resume-skills" id="skills" tabIndex={-1}>
      <span className="mobile-resume-lettering" aria-hidden="true">RESUME<br />RESUME</span>
      <h2>Technical skills</h2>
      <div className="technical-groups">
        <div>
          <h3>Software skills</h3>
          <ul className="software-list">
            {skills.software.map(({ name, label }) => <li key={name}><abbr title={name}>{label}</abbr></li>)}
          </ul>
        </div>
        <div>
          <h3>Design focus</h3>
          <ul className="design-skills">{skills.design.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="web-skills">
          <h3>Web development</h3>
          <ul aria-label="Web development skills">{skills.web.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <Pills items={skills.technical} />
    </div>
    {recognitionGroups.length > 0 && <Recognition />}
  </section>;
}

function Certificates() {
  const dialog = useRef(null);
  const opener = useRef(null);
  const [selected, setSelected] = useState(null);

  function previewCertificate(certificate, button) {
    opener.current = button;
    flushSync(() => setSelected(certificate));
    dialog.current.showModal();
    dialog.current.scrollTop = 0;
  }

  return <Section id="certificates" title="Certificates" className="certificates">
    {certificates.length ? <ul className="certificate-grid">
      {certificates.map((certificate) => {
        const { title, issuer, date, type, file, thumbnail } = certificate;
        return <li key={file} className="certificate-card">
          {thumbnail && <div className="certificate-mat">
            <img src={asset(thumbnail)} alt="" loading="lazy" />
          </div>}
          <div className="certificate-info">
            {type && <p className="certificate-type">{type}</p>}
            <h3>{title}</h3>
            {issuer && <p className="certificate-issuer">{issuer}</p>}
          </div>
          <div className="certificate-card-footer">
            {date && <p>{date}</p>}
            {thumbnail ?
              <button type="button" className="certificate-open" aria-haspopup="dialog"
                aria-label={`Preview certificate for ${title}`}
                onClick={(event) => previewCertificate(certificate, event.currentTarget)}>
                Preview <Icon name="diagonal" size={16} />
              </button> :
              <a className="certificate-open" href={asset(file)} target="_blank" rel="noreferrer"
                aria-label={`Open original certificate for ${title} (opens in a new tab)`}>
                View <Icon name="diagonal" size={16} />
              </a>}
          </div>
        </li>;
      })}
    </ul> : <p>Certificates will be added here.</p>}
    <dialog ref={dialog} className="case-study certificate-viewer" aria-labelledby="certificate-viewer-title"
      onClose={() => opener.current?.focus()}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      {selected && <div className="certificate-viewer-inner">
        <div className="certificate-viewer-heading">
          <div>
            {selected.type && <p className="certificate-type">{selected.type}</p>}
            <h2 id="certificate-viewer-title">{selected.title}</h2>
            {(selected.issuer || selected.date) && <p className="certificate-issuer">
              {[selected.issuer, selected.date].filter(Boolean).join(' · ')}
            </p>}
          </div>
          <form method="dialog"><button className="close-case" autoFocus aria-label="Close certificate preview">
            <Icon name="close" />
          </button></form>
        </div>
        <div className="certificate-viewer-media">
          <img src={asset(selected.thumbnail)} alt={`Certificate for ${selected.title}`} />
        </div>
        <a className="certificate-open" href={asset(selected.file)} target="_blank" rel="noreferrer">
          Open original <Icon name="diagonal" size={16} />
        </a>
      </div>}
    </dialog>
  </Section>;
}

function Recognition() {
  return <div id="recognition" className="resume-recognition" tabIndex={-1} aria-labelledby="recognition-title">
    <h2 id="recognition-title">Achievements</h2>
    <div className="info-grid grid gap-5">
      {recognitionGroups.map((group) => <article key={group.title}>
        <h3>{group.title}</h3>
        <ul className="detail-list">
          {group.items.map((entry) => <li key={entry.title}><h4>{entry.title}</h4>{entry.detail && <p>{entry.detail}</p>}</li>)}
        </ul>
      </article>)}
    </div>
  </div>;
}

function Services() {
  return <Section id="services" title="Services" className="services">
    {services.availability && <p className="availability">{services.availability}</p>}
    <div className="info-grid grid gap-5 md:grid-cols-3">
      {services.items.map((entry) => <article key={entry.title}><h3>{entry.title}</h3><p>{entry.detail}</p></article>)}
    </div>
  </Section>;
}

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Message', placeholder: 'Tell me a little about your project', multiline: true },
];

function ContactForm() {
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const nextErrors = {};
    for (const { name, label } of fields) {
      values[name] = values[name].trim();
      if (!values[name]) nextErrors[name] = `Enter your ${label.toLowerCase()}.`;
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    setErrors(nextErrors);
    setFeedback(null);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid).focus();
      return;
    }
    if (!contact.endpoint) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
      const body = encodeURIComponent(
        `${values.message.replace(/\r?\n/g, '\r\n')}\r\n\r\n${values.name}\r\n${values.email}`,
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setFeedback({ message: 'Message sent. Thank you for reaching out.' });
    } catch {
      setFeedback({ error: true, message: 'The message could not be sent. Please retry or use the email link.' });
    } finally {
      setBusy(false);
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate aria-labelledby="contact-form-title"
    aria-describedby={contact.endpoint ? undefined : 'contact-form-note'}>
    <div className="contact-form-intro">
      <h3 id="contact-form-title">Tell me about your project</h3>
      {!contact.endpoint && <p id="contact-form-note">The form opens a draft in your email app for you to review and send.</p>}
    </div>
    {fields.map(({ name, label, multiline, ...attributes }) => {
      const input = {
        ...attributes, id: `contact-${name}`, name, required: true,
        'aria-invalid': errors[name] ? true : undefined,
        'aria-describedby': errors[name] ? `error-${name}` : undefined,
        onChange: () => {
          if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
          if (feedback) setFeedback(null);
        },
      };
      return <div className={multiline ? 'form-field form-field-wide' : 'form-field'} key={name}>
        <label htmlFor={input.id}>{label}</label>
        {multiline ? <textarea {...input} rows={4} /> : <input {...input} />}
        {errors[name] && <p id={`error-${name}`} className="form-error">{errors[name]}</p>}
      </div>;
    })}
    <button className="button primary" disabled={busy} type="submit">
      {busy ? 'Sending…' : contact.endpoint ? 'Send message' : 'Open email draft'} <Icon name="diagonal" size={17} />
    </button>
    <p className={feedback?.error ? 'form-status form-error' : 'form-status'} role="status">{feedback?.message}</p>
  </form>;
}

function Contact() {
  return <Section id="contact" title="Contact" className="contact">
    <div className="contact-layout">
      <div className="contact-details">
        <div className="contact-heading">
          <h3>Let’s work together.</h3>
          <Star className="contact-star" />
        </div>
        <p>Have a branding, UI/UX, or web design project in mind? Tell me what you’re working on.</p>
        <ul className="contact-links">
          <li><a href={`mailto:${contact.email}`}>
            <span><small>Email me</small>{contact.email}</span><Icon name="diagonal" size={19} />
          </a></li>
          {contact.socials.map((social) => <li key={social.title}>
            <a href={social.url} target="_blank" rel="noreferrer">
              <span>{social.title}{social.sample && ' (sample)'}</span><Icon name="diagonal" size={19} />
            </a>
          </li>)}
        </ul>
      </div>
      <ContactForm />
    </div>
  </Section>;
}

function App() {
  const main = useRef(null);
  useScrollMotion(main);
  useEffect(() => finishLoading(main.current.querySelector('.hero-portrait')), []);

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Masthead />
    <main id="main" ref={main} tabIndex={-1}>
      <div className="composition">
        <Hero />
        <About />
        <Resume />
      </div>
      <Work />
      <Certificates />
      {services.enabled && <Services />}
      <Contact />
    </main>
    <footer className="site-width footer flex flex-wrap items-center justify-between gap-3">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <nav className="footer-nav" aria-label="All sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        <a href={charcoalUrl}>Charcoal portraits</a>
      </nav>
    </footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
