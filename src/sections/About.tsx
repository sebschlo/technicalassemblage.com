import styles from './Section.module.css';

type Experience = { name: string; href: string; logo?: string };

const experience: Experience[] = [
  { name: 'Apple', href: 'https://www.apple.com', logo: '/logos/apple.svg' },
  { name: 'Meta', href: 'https://about.meta.com', logo: '/logos/meta.svg' },
  { name: 'Venmo', href: 'https://venmo.com', logo: '/logos/venmo.svg' },
  { name: 'Academia.edu', href: 'https://www.academia.edu', logo: '/logos/academia.svg' },
  { name: 'Breakfast', href: 'https://breakfaststudio.com' }, // Brooklyn studio — Inter caps wordmark
];

export function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>About</div>
        <h2 className={styles.heading}>
          A consulting practice with a builder's bias.
        </h2>

        <p className={styles.body}>
          Technical Assemblage designs and builds software for teams who care
          how the thing is made. We take on the ambiguous, high-stakes
          work&nbsp;— architecture, prototypes, and products&nbsp;— and carry it
          through to something durable, considered, and quietly ambitious.
        </p>
        <p className={styles.body}>
          Founded by Sebastian Schloesser, the practice draws on years spent
          building across consumer technology, fintech, research, and creative
          studios&nbsp;— at scale and at the edges.
        </p>

        <div className={styles.experienceLabel}>Experience from</div>
        <ul className={styles.experience}>
          {experience.map((item) => (
            <li key={item.name}>
              <a
                className={styles.experienceLink}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                {item.logo ? (
                  <span
                    className={styles.logo}
                    role="img"
                    aria-hidden="true"
                    style={{ ['--logo' as string]: `url(${item.logo})` }}
                  />
                ) : (
                  <span className={styles.logoWord}>{item.name}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
