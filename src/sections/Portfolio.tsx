import styles from './Section.module.css';

type Project = {
  name: string;
  kicker: string;
  description: string;
};

const projects: Project[] = [
  {
    name: 'Citylap',
    kicker: 'Product',
    description: 'Placeholder — short description of Citylap.',
  },
  {
    name: 'Odoo Spoken CRM',
    kicker: 'Product',
    description: 'Placeholder — short description of the Odoo Spoken CRM.',
  },
];

export function Portfolio() {
  return (
    <section className={styles.section} id="portfolio">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Product Portfolio</div>
        <h2 className={styles.heading}>Things we've built.</h2>

        <div className={styles.portfolio}>
          {projects.map((p) => (
            <article className={styles.project} key={p.name}>
              <div className={styles.projectKicker}>{p.kicker}</div>
              <h3 className={styles.projectName}>{p.name}</h3>
              <p className={styles.projectBody}>{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
