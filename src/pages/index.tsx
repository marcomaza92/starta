import styles from './index.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getItems } from '../api/endpoints';
import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/Planets';
import { PeopleContext } from '../context/People';
import { SpeciesContext } from '../context/Species';
import CustomCarousel from '../components/molecules/Carousel';
import { types } from '../api/static';

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
  const dataItems = [planets, people, species];
  types.map((type, index) => {
    type.data = dataItems[index];
  });
  useEffect(() => {
    setPlanets(initialPlanets);
    setPeople(initialPeople);
    setSpecies(initialSpecies);
  }, []);
  return (
    <section className={`${styles.main}`}>
      {types.map((type, index) => (
        <div key={index} className={styles.list}>
          <h3 className={styles.listTitle}>{type.title}</h3>
          {type.data !== null ? (
            <div className={styles.listInfo}>
              <CustomCarousel
                centerMode={true}
                centerSlidePercentage={30}
                showIndicators={false}
                showStatus={false}
                showThumbs={false}
              >
                {type.data?.results.map((item, index) => (
                  <div
                    className={`${styles.item} ${
                      styles[`item-${Math.floor(Math.random() * 30) + 1}`]
                    }`}
                    key={index}
                  >
                    <Link
                      href={{
                        pathname: `/${type.single}/[id]`,
                        query: {
                          id: index + 1,
                        },
                      }}
                    >
                      <a>{item.name}</a>
                    </Link>
                  </div>
                ))}
                <div className={styles.item}>
                  <Link href={`/${type.all}/`}>
                    <a>See more {type.all}</a>
                  </Link>
                </div>
              </CustomCarousel>
              <p className={styles.listSeeMore}>
                <Link href={`/${type.all}/`}>
                  <a>See more {type.all}</a>
                </Link>
              </p>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Home;
