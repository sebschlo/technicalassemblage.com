import styles from './Section.module.css';

export function Services() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Services</div>
        <h2 className={styles.heading}>Placeholder — what we offer.</h2>
        <p className={styles.body}>List of services / engagement models.</p>
      </div>
    </section>
  );
}
