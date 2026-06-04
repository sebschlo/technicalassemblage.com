import styles from './Section.module.css';

type Story = {
  client: string;
  blurb: string;
  logo?: string;
  invertLogo?: boolean;
};

type Offering = {
  title: string;
  description: string;
  skills: string[];
  stories: Story[];
};

const offerings: Offering[] = [
  {
    title: 'Technology Consulting & Software Development',
    description:
      'Drawing from years of experience at companies from all sizes, we design and build the systems a business runs on — and advise on the processes around them — offering holistic solutions that actually yield results.',
    skills: [
      'General process and technology consulting',
      'Mobile development',
      'Web development',
      'AI and automation',
      'Custom ERP and CRM solutions',
    ],
    stories: [
      {
        client: 'maprimaq',
        blurb: "Built custom CRM and ERP with AI integrations and workflows, elevating Maprimaq's unparalleled 65 of experience with cutting edge technology.",
      },
      {
        client: 'Grupo REMM',
        blurb:
          'Automated purchase-order processing and matching against live inventory, vastly accelerating data entry processes.',
        logo: '/logos/remm.png',
      },
      {
        client: 'Mitchell Denburg',
        blurb:
          'Advised through major revamp and migration of software platforms and providers.',
        logo: '/logos/mitchell.webp',
        invertLogo: true,
      },
    ],
  },
  {
    title: 'Creative Technology & Design',
    description:
      'Interactive, experiential, and design-led work — where engineering and craft meet to make something people remember.',
    skills: [
      '3D modeling',
      'Rendering and animation',
      'Spatial audio and acoustic modeling',
      'Parametric and procedural geometry',
      'Interactive web experiences',
    ],
    stories: [],
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

              <div className={styles.storiesLabel}>Capabilities</div>
              <ul className={styles.skills}>
                {o.skills.map((s) => (
                  <li className={styles.skill} key={s}>
                    {s}
                  </li>
                ))}
              </ul>

              {o.stories.length > 0 && (
                <>
                  <div className={styles.storiesLabel}>
                    Customer success stories
                  </div>
                  <ul className={styles.stories}>
                    {o.stories.map((s) => (
                      <li className={styles.story} key={s.client}>
                        <div className={styles.storyImage}>
                          {s.logo ? (
                            <img
                              src={s.logo}
                              alt={`${s.client} logo`}
                              className={`${styles.storyLogo} ${
                                s.invertLogo ? styles.storyLogoInvert : ''
                              }`}
                              loading="lazy"
                            />
                          ) : (
                            <span
                              className={styles.storyImageLabel}
                              aria-hidden="true"
                            >
                              Image
                            </span>
                          )}
                        </div>
                        <div className={styles.storyClient}>{s.client}</div>
                        <p className={styles.storyBlurb}>{s.blurb}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
