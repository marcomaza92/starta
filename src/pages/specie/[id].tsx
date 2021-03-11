import { getItem, getItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect } from 'react';
import { SpeciesContext } from '../../context/Species';
import styles from './specie.module.scss';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialSpecies = await getItems('species');
  const paths = initialSpecies.results.map((index) => ({
    params: { id: (index + 1).toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialSpecie = await getItem('species', context.params.id);
  return {
    props: {
      initialSpecie,
    },
    revalidate: 1,
  };
};

const Planets = ({ initialSpecie }) => {
  const { specie, setSpecie } = useContext(SpeciesContext);
  const router = useRouter();
  useEffect(() => {
    setSpecie(initialSpecie);
  }, [router]);
  return (
    <section className={styles.main}>
      <div className={styles.list}>
        <h3 className={styles.listTitle}>Specie Detail</h3>
        <div className={styles.listInfo}>
          {specie ? <p>{specie?.name}</p> : <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Planets;
