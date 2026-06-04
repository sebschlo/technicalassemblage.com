import styles from './Section.module.css';

export function Work() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Selected Work</div>
        <h2 className={styles.heading}>Placeholder — case studies.</h2>
        <p className={styles.body}>Project highlights and results.</p>
      </div>
    </section>
  );
}
