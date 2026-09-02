import { useState } from 'react';
import { NotifyModal } from '../components/NotifyModal';
import styles from './Section.module.css';

type Project = {
  name: string;
  category: string;
  description: string;
  status: string;
  url?: string;
  cta?: string;
};

const projects: Project[] = [
  {
    name: 'Citylap',
    category: 'Consumer · Mobile',
    description:
      'A privacy-first location app for the people you care about. Citylap keeps friends and family in sync — who is in town, who is heading where — with end-to-end encryption on every coordinate, no reliance on 3rd party geolocation APIs, and granular control over who sees what. A time machine view on the map lets you revisit past locations and share future plans.',
    status: 'Available now',
    url: 'https://getcitylap.com',
    cta: 'Visit getcitylap.com →',
  },
  {
    name: 'Odoo Spoken CRM',
    category: 'B2B · Sales tooling',
    description:
      "A voice-driven CRM interface for Odoo CRM, built for sales teams who work on the move and don't have time to sit down and write endless notes. Speak naturally and a language model routes the request through the right CRM actions — logging meetings, capturing contacts and their roles, and tracking travel and on-site time for every visit. Includes an MCP server to connect via your favorite AI chatbot.",
    status: 'Available now',
    url: 'https://apps.odoo.com/apps/modules/18.0/spoken_crm',
    cta: 'Get it on the Odoo App Store →',
  },
  {
    name: 'NeverMiss',
    category: 'Consumer · iOS',
    description:
      'A real alarm for every meeting. NeverMiss reads every calendar synced to your iPhone and rings a full-screen alarm before each one — through silent mode and Focus, until you dismiss it. Two lead times per meeting by default, one tap into the Zoom, Meet or Teams call, and nothing ever leaves the device.',
    status: 'Coming to the App Store',
    url: '/nevermiss/',
    cta: 'Learn more →',
  },
];

export function Portfolio() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className={styles.section} id="portfolio">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Product Portfolio</div>
        <h2 className={styles.heading}>Things we've built.</h2>
        <p className={styles.body}>
          Beyond client work, we design and ship our own digital products —
          independent bets we build and run end to end.
        </p>

        <div className={styles.portfolio}>
          {projects.map((p) => (
            <article
              className={styles.project}
              key={p.name}
              onClick={() =>
                p.url
                  ? window.open(p.url, '_blank', 'noopener,noreferrer')
                  : setActive(p.name)
              }
            >
              <div className={styles.projectKicker}>{p.category}</div>
              <h3 className={styles.projectName}>
                {p.name}
                <sup className={styles.tm}>™</sup>
              </h3>
              <p className={styles.projectBody}>{p.description}</p>

              <div className={styles.projectFoot}>
                <div className={styles.projectStatus}>{p.status}</div>
                {p.url ? (
                  <a
                    className={styles.projectCta}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.cta}
                  </a>
                ) : (
                  <button
                    className={styles.projectCta}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActive(p.name);
                    }}
                  >
                    Stay in the loop →
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <NotifyModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
