import styles from './Section.module.css';

export function Contact() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Contact</div>
        <h2 className={styles.heading}>Let's build something deliberate.</h2>
        <p className={styles.body}>Placeholder — email / form goes here.</p>
      </div>
    </section>
  );
}
