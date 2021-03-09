import styles from './index.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getItems } from '../api/endpoints';
import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/Planets';

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPlanets = await getItems('planets');
  return {
    props: {
      initialPlanets,
    },
    revalidate: 1,
  };
};

const Home = ({ initialPlanets }) => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  useEffect(() => {
    setPlanets(initialPlanets);
  }, []);
  console.log('index page', planets);
  return (
    <section className={`${styles.main}`}>
      <h2 className={styles.title} data-testid="title">
        Starta
      </h2>
      <Link href="/planets">
        <a>Planets</a>
      </Link>
      <div>
        {planets !== null ? (
          planets?.results.map((item, index) => <p key={index}>{item.name}</p>)
        ) : (
          <div>Carganding...</div>
        )}
      </div>
    </section>
  );
};

export default Home;
