import { useState } from 'react';
import { NotifyModal } from '../components/NotifyModal';
import styles from './Section.module.css';

type Project = {
  name: string;
  category: string;
  description: string;
  status: string;
};

const projects: Project[] = [
  {
    name: 'Citylap',
    category: 'Consumer · Mobile',
    description:
      'A privacy-first location app for the people you actually care about. Citylap keeps friends and family loosely in sync — who is in town, who is heading where — with end-to-end encryption on every coordinate and granular control over who sees what. A built-in time machine lets you revisit past locations and share future plans.',
    status: 'Ships Q3 2026',
  },
  {
    name: 'Odoo Spoken CRM',
    category: 'B2B · Sales tooling',
    description:
      'A voice-driven CRM layer for Odoo, built for sales teams who work on the move. Speak naturally and a language model routes the request through the right CRM actions — logging meetings, capturing contacts and their roles, and tracking travel and on-site time for every visit. No forms, no clicks.',
    status: 'Ships Q3 2026',
  },
];

export function Portfolio() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className={styles.section} id="portfolio">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Product Portfolio</div>
        <h2 className={styles.heading}>Things we've built.</h2>

        <div className={styles.portfolio}>
          {projects.map((p) => (
            <article
              className={styles.project}
              key={p.name}
              onClick={() => setActive(p.name)}
            >
              <div className={styles.projectKicker}>{p.category}</div>
              <h3 className={styles.projectName}>{p.name}</h3>
              <p className={styles.projectBody}>{p.description}</p>

              <div className={styles.projectFoot}>
                <div className={styles.projectStatus}>{p.status}</div>
                <button
                  className={styles.projectCta}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(p.name);
                  }}
                >
                  Stay in the loop →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <NotifyModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
