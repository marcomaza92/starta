import styles from './index.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getItems } from '../api/endpoints';
import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/Planets';
import { PeopleContext } from '../context/People';
import { SpeciesContext } from '../context/Species';
import CustomCarousel from '../components/molecules/Carousel';

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
      all: 'planets',
      single: 'planet',
      data: planets,
    },
    {
      all: 'people',
      single: 'person',
      data: people,
    },
    {
      all: 'species',
      single: 'specie',
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
        <div key={index} className={styles.list}>
          <h3 className={styles.listTitle}>{type.all}</h3>
          <div className={styles.listInfo}>
            {type.data !== null ? (
              <CustomCarousel
                centerMode={true}
                centerSlidePercentage={30}
                showIndicators={false}
                showStatus={false}
                showThumbs={false}
              >
                {type.data?.results.map((item, index) => (
                  <div className={styles.item} key={index}>
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
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
