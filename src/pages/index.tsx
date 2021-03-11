import styles from './index.module.scss';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getItems } from '../api/endpoints';
import { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/Planets';
import { PeopleContext } from '../context/People';
import { SpeciesContext } from '../context/Species';
import { types } from '../api/static';

export const getStaticProps: GetStaticProps = async () => {
  const initialData = [];
  for (let index = 0; index < types.length; index++) {
    initialData.push(
      Object.assign(types[index], {
        data: await getItems(types[index].all),
      })
    );
  }
  return {
    props: {
      initialData,
    },
    revalidate: 1,
  };
};

const Home = ({ initialData }) => {
  const { setPlanets } = useContext(PlanetsContext);
  const { setPeople } = useContext(PeopleContext);
  const { setSpecies } = useContext(SpeciesContext);
  const functions = [setPlanets, setPeople, setSpecies];
  useEffect(() => {
    functions.map((fn, index) => fn(initialData[index]));
  }, []);
  return (
    <section className={`${styles.main}`}>
      <h2 className={styles.title} data-testid="title">
        Starta
      </h2>
      {initialData.map((type, index) => (
        <div key={index}>
          <div>
            <Link
              key={index}
              href={{
                pathname: `/[slug]/`,
                query: {
                  slug: type.all,
                },
              }}
            >
              <a>{type.all}</a>
            </Link>
          </div>
          <div className={styles.list}>
            <h3 className={styles.listTitle}>{type.all}</h3>
            <div className={styles.listInfo}>
              {type.data.results !== [] ? (
                <>
                  {type.data?.results.map((item, index) => (
                    <div className={styles.item} key={index}>
                      <Link
                        href={{
                          pathname: `/[slug]/[id]`,
                          query: {
                            slug: type.single,
                            id: index + 1,
                          },
                        }}
                      >
                        <a>{item.name}</a>
                      </Link>
                    </div>
                  ))}
                  <div className={styles.item}>
                    <Link
                      key={index}
                      href={{
                        pathname: `/[slug]/`,
                        query: {
                          slug: type.all,
                        },
                      }}
                    >
                      <a>See more {type.all}</a>
                    </Link>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
