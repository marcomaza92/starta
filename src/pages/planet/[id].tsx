import { getItem, getItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../../context/Planets';
import styles from './planet.module.scss';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialPlanets = await getItems('planets');
  const paths = initialPlanets.results.map((index) => ({
    params: { id: (index + 1).toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPlanet = await getItem('planets', context.params.id);
  return {
    props: {
      initialPlanet,
    },
    revalidate: 1,
  };
};

const Planets = ({ initialPlanet }) => {
  const { planet, setPlanet } = useContext(PlanetsContext);
  const router = useRouter();
  useEffect(() => {
    setPlanet(initialPlanet);
  }, [router]);
  return (
    <section className={styles.main}>
      <div className={styles.list}>
        <h3 className={styles.listTitle}>Planet Detail</h3>
        <div className={styles.listInfo}>
          {planet ? <p>{planet?.name}</p> : <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Planets;
