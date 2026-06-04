import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copyright}>
          © {year} Technical Assemblage LLC. All rights reserved.
        </div>
        <div className={styles.trademarks}>
          Citylap™ and Odoo Spoken CRM™ are trademarks of Technical Assemblage LLC.
        </div>
      </div>
    </footer>
  );
}
