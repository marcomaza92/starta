import styles from './about.module.scss';

const About = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title} data-testid="title">
        About
      </h1>
    </main>
  );
};

export default About;
