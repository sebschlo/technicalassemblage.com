import { scrollToTarget } from '../hooks/useSmoothScroll';
import styles from './Nav.module.css';

const links = [
  { label: 'About', target: '#about' },
  { label: 'Services', target: '#services' },
  { label: 'Portfolio', target: '#portfolio' },
  { label: 'Contact', target: '#contact' },
];

export function Nav() {
  return (
    <nav className={styles.nav}>
      <button
        className={styles.brand}
        onClick={() => scrollToTarget(0)}
        aria-label="Back to top"
      >
        Technical Assemblage
      </button>

      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.target}>
            <button className={styles.link} onClick={() => scrollToTarget(l.target)}>
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
