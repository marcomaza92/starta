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
  const specieColor = () => {
    const value = specie.skin_colors.split(',')[0];
    switch (value) {
      case 'caucasian':
        return 'pink';
        break;
      case 'n/a':
        return 'gray';
        break;
      default:
        return value;
        break;
    }
  };
  useEffect(() => {
    setSpecie(initialSpecie);
  }, [router]);
  return (
    <section className={styles.main}>
      <div className={styles.list}>
        <h3 className={styles.detailTitle}>{specie?.name}</h3>
        {specie ? (
          <div className={styles.detailInfo}>
            <div className={styles.detailListContainer}>
              <ul className={styles.detailList}>
                <li className={styles.detailListItem}>
                  <img src="/height.png" alt="" />
                  <span>{specie.average_height}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/color.png" alt="" />
                  <span>{specie.skin_colors}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/hair-color.png" alt="" />
                  <span>{specie.hair_colors}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/eye-color.png" alt="" />
                  <span>{specie.eye_colors}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/life.png" alt="" />
                  <span>{specie.average_lifespan}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/language.png" alt="" />
                  <span>{specie.language}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.detailLoader}>
            <h3>Loading...</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Planets;
