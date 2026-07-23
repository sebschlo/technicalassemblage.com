import { useState } from 'react';
import styles from './Section.module.css';

type Story = {
  client: string;
  blurb: string;
  url: string;
  skills: string[];
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
        client: 'Maprimaq',
        url: 'https://www.maprimaq.com/',
        skills: [
          'General process and technology consulting',
          'Web development',
          'AI and automation',
          'Custom ERP and CRM solutions',
        ],
        blurb: "Built custom CRM and ERP with AI integrations and workflows, elevating Maprimaq's unparalleled 65 years of experience providing cutting edge industrial technology.",
        logo: '/logos/maprimaq.png',
      },
      {
        client: 'Grupo REMM',
        url: 'https://www.gruporemm.com/',
        skills: ['AI and automation', 'Custom ERP and CRM solutions'],
        blurb:
          'Developed custom purchase-order processing pipeline, matching against live inventory and integrating with ERP, vastly accelerating data entry processes.',
        logo: '/logos/remm.png',
      },
      {
        client: 'Mitchell Denburg Collection',
        url: 'https://www.mitchelldenburg.com/',
        skills: ['General process and technology consulting'],
        blurb:
          'Advised through major revamp and migration of software platforms and providers.',
        logo: '/logos/mitchell.png',
        invertLogo: true,
      },
    ],
  },
  {
    title: 'Creative Technology & Design',
    description:
      'Interactive, experiential, and design-led work — where engineering and design meet to make something memorable.',
    skills: [
      '3D modeling',
      'Rendering and animation',
      'Spatial audio and acoustic modeling',
      'Parametric and procedural geometry',
      'Interactive web experiences',
    ],
    stories: [
      {
        client: 'Wheelhouse',
        blurb:
          'Produced 3D animations of industrial machinery, bringing complex equipment to life for marketing and product storytelling.',
        url: 'https://wheelhouse.io/',
        skills: ['3D modeling', 'Rendering and animation'],
        logo: '/logos/wheelhouse.svg',
      },
    ],
  },
];

function OfferingBlock({ offering }: { offering: Offering }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = offering.stories.find((s) => s.client === hovered)?.skills;

  return (
    <div className={styles.offering}>
      <h3 className={styles.offeringTitle}>{offering.title}</h3>
      <p className={styles.offeringBody}>{offering.description}</p>

      <div className={styles.storiesLabel}>Capabilities</div>
      <ul className={styles.skills}>
        {offering.skills.map((s) => (
          <li
            className={`${styles.skill} ${
              highlighted
                ? highlighted.includes(s)
                  ? styles.skillActive
                  : styles.skillDimmed
                : ''
            }`}
            key={s}
          >
            {s}
          </li>
        ))}
      </ul>

      {offering.stories.length > 0 && (
        <>
          <div className={styles.storiesLabel}>Customer success stories</div>
          <ul className={styles.stories}>
            {offering.stories.map((s) => (
              <li className={styles.story} key={s.client}>
                <a
                  className={styles.storyLink}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(s.client)}
                  onMouseLeave={() => setHovered(null)}
                >
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
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Services</div>
        <h2 className={styles.heading}>What we do.</h2>

        <div className={styles.offerings}>
          {offerings.map((o) => (
            <OfferingBlock offering={o} key={o.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
