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
      <Link href="/planets">
        <a>Planets</a>
      </Link>
      <Link href="/people">
        <a>People</a>
      </Link>
      <Link href="/species">
        <a>Species</a>
      </Link>
      <div>
        <h3>Planets</h3>
        {planets !== null ? (
          planets?.results.map((item, index) => <p key={index}>{item.name}</p>)
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        <h3>People</h3>
        {people !== null ? (
          people?.results.map((item, index) => <p key={index}>{item.name}</p>)
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        <h3>Species</h3>
        {species !== null ? (
          species?.results.map((item, index) => <p key={index}>{item.name}</p>)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  );
};

export default Home;
