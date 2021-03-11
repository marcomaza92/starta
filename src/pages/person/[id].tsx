import { getItem, getItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect } from 'react';
import { PeopleContext } from '../../context/People';
import styles from './person.module.scss';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialPeople = await getItems('people');
  const paths = initialPeople.results.map((index) => ({
    params: { id: (index + 1).toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPerson = await getItem('people', context.params.id);
  return {
    props: {
      initialPerson,
    },
    revalidate: 1,
  };
};

const Planets = ({ initialPerson }) => {
  const { person, setPerson } = useContext(PeopleContext);
  const router = useRouter();
  useEffect(() => {
    setPerson(initialPerson);
  }, [router]);
  return (
    <section className={styles.main}>
      <div className={styles.list}>
        <h3 className={styles.listTitle}>Person Detail</h3>
        <div className={styles.listInfo}>
          {person ? <p>{person.name}</p> : <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Planets;
