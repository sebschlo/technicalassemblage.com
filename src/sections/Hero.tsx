import styles from './Section.module.css';

export function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <img
          className={styles.heroMark}
          src="/brand/mark-white.svg"
          alt="Technical Assemblage mark"
          width={100}
          height={100}
        />
        <div className={styles.eyebrow}>Technical Assemblage LLC</div>
        <h1 className={styles.heading}>
          Technology, assembled with intention.
        </h1>
        <p className={styles.body}>
          A consulting and development practice for teams who care how
          the thing is built, not just whether it ships.
        </p>
      </div>
    </section>
  );
}
