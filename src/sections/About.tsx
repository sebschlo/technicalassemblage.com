import styles from './Section.module.css';

export function About() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>About</div>
        <h2 className={styles.heading}>Placeholder — about copy goes here.</h2>
        <p className={styles.body}>Tell the story of the practice.</p>
      </div>
    </section>
  );
}
