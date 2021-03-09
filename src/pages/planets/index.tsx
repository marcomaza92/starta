import { useContext } from 'react';
import { PlanetsContext } from '../../context/Planets';
import styles from './planets.module.scss';

const Planets = () => {
  const { planets } = useContext(PlanetsContext);
  console.log('planets page', planets);
  return (
    <section className={styles.main}>
      <h2>All Planets</h2>
      {planets?.results.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.climate}</p>
          <p>{item.population}</p>
          <p>{item.url}</p>
        </div>
      ))}
    </section>
  );
};

export default Planets;
