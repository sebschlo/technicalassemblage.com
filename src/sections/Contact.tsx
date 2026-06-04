import styles from './Section.module.css';

export function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Contact</div>
        <h2 className={styles.heading}>Let's build something deliberate.</h2>
        <a className={styles.contactLink} href="mailto:hello@technicalassemblage.com">
          hello@technicalassemblage.com
        </a>
      </div>
    </section>
  );
}
