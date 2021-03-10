import { useContext } from 'react';
import { PeopleContext } from '../../context/People';
import styles from './people.module.scss';

const People = () => {
  const { people } = useContext(PeopleContext);
  return (
    <section className={styles.main}>
      <h2>All People</h2>
      {people?.results.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.height}</p>
          <p>{item.homeworld}</p>
          <p>{item.url}</p>
        </div>
      ))}
    </section>
  );
};

export default People;
