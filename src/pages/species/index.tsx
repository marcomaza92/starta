import { useContext } from 'react';
import { SpeciesContext } from '../../context/Species';
import styles from './species.module.scss';

const Species = () => {
  const { species } = useContext(SpeciesContext);
  return (
    <section className={styles.main}>
      <h2>All Species</h2>
      {species?.results.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.homeworld}</p>
          <p>{item.language}</p>
          <p>{item.url}</p>
        </div>
      ))}
    </section>
  );
};

export default Species;
