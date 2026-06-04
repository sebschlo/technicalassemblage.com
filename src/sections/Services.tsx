import styles from './Section.module.css';

type Offering = {
  title: string;
  description: string;
  stories: string[];
};

const offerings: Offering[] = [
  {
    title: 'Technology Consulting & Software Development',
    description:
      'Placeholder — description of the consulting and software development practice: the kinds of systems we build and how we engage.',
    stories: [
      'Customer success story — placeholder',
      'Customer success story — placeholder',
    ],
  },
  {
    title: 'Creative Technology & Design',
    description:
      'Placeholder — description of the creative technology and design practice: interactive, experiential, and design-led work.',
    stories: [
      'Customer success story — placeholder',
      'Customer success story — placeholder',
    ],
  },
];

export function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Services</div>
        <h2 className={styles.heading}>What we do.</h2>

        <div className={styles.offerings}>
          {offerings.map((o) => (
            <div className={styles.offering} key={o.title}>
              <h3 className={styles.offeringTitle}>{o.title}</h3>
              <p className={styles.offeringBody}>{o.description}</p>

              <div className={styles.storiesLabel}>Customer success stories</div>
              <ul className={styles.stories}>
                {o.stories.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
