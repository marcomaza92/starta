import styles from './index.module.scss';

const Home = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title} data-testid="title">
        Starta
      </h1>
    </main>
  );
}

export default Home;
