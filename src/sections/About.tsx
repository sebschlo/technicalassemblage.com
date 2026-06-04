import styles from './Section.module.css';

export function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>About</div>
        <h2 className={styles.heading}>Placeholder — about copy.</h2>
        <p className={styles.body}>
          Description of Technical Assemblage: the story of the practice,
          who it serves, and the point of view that shapes the work.
        </p>
      </div>
    </section>
  );
}
