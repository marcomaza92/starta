import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <h4 className={styles.info}>
        Starta - <span className={styles.acronym}>Star</span> Wars Encar
        <span className={styles.acronym}>ta</span> Encyclopedia
      </h4>
    </footer>
  );
};

export default Footer;
