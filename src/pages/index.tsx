import styles from './index.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getItems } from '../api/endpoints';
import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/Planets';
import { PeopleContext } from '../context/People';
import { SpeciesContext } from '../context/Species';

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPlanets = await getItems('planets');
  const initialPeople = await getItems('people');
  const initialSpecies = await getItems('species');
  return {
    props: {
      initialPlanets,
      initialPeople,
      initialSpecies,
    },
    revalidate: 1,
  };
};

const Home = ({ initialPlanets, initialPeople, initialSpecies }) => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const { people, setPeople } = useContext(PeopleContext);
  const { species, setSpecies } = useContext(SpeciesContext);
  const types = [
    {
      name: 'planets',
      data: planets,
    },
    {
      name: 'people',
      data: people,
    },
    {
      name: 'species',
      data: species,
    },
  ];
  useEffect(() => {
    setPlanets(initialPlanets);
    setPeople(initialPeople);
    setSpecies(initialSpecies);
  }, []);
  return (
    <section className={`${styles.main}`}>
      <h2 className={styles.title} data-testid="title">
        Starta
      </h2>
      {types.map((type, index) => (
        <>
          <div>
            <Link href={`/${type.name}`}>
              <a>{type.name}</a>
            </Link>
          </div>
          <div className={styles.list}>
            <h3 className={styles.listTitle}>{type.name}</h3>
            <div className={styles.listInfo}>
              {type.data !== null ? (
                <>
                  {type.data?.results.map((item, index) => (
                    <div className={styles.item} key={index}>
                      <p>{item.name}</p>
                    </div>
                  ))}
                  <div className={styles.item}>
                    <Link href={`/${type.name}`}>
                      <a>See More {type.name}</a>
                    </Link>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </>
      ))}
    </section>
  );
};

export default Home;
