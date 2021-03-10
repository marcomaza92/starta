import { getItems } from '../../api/endpoints';
import { GetStaticProps } from 'next';
import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../../context/Planets';
import styles from './planets.module.scss';
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPlanets = await getItems('planets');
  return {
    props: {
      initialPlanets,
    },
    revalidate: 1,
  };
};

const Planets = ({ initialPlanets }) => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  useEffect(() => {
    if (planets === null) {
      setPlanets(initialPlanets);
    }
  }, []);
  return (
    <section className={styles.main}>
      <div className={styles.list}>
        <h3 className={styles.listTitle}>All Planets</h3>
        <div className={styles.listInfo}>
          {planets !== null ? (
            planets?.results.map((item, index) => (
              <div className={styles.item} key={index}>
                <Link
                  href={{
                    pathname: '/planet/[id]',
                    query: {
                      id: index + 1,
                    },
                  }}
                >
                  <a>{item.name}</a>
                </Link>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Planets;
