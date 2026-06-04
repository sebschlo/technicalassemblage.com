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
          Technical Assemblage designs and builds digital solutions for teams who care
          about process and usability. We take on the ambiguous, high-stakes
          work and carry it through to something durable, considered, and intuitive.
        </p>
        <p className={styles.body}>
          We specialize in medium-sized businesses ready to modernize — streamlining
          the systems they run on and putting AI to work where it actually moves the
          needle.
        </p>
        <p className={styles.body}>
          The practice draws on years spent building across consumer technology,
          fintech, research, and creative studios.
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
