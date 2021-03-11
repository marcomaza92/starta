import { getItems, paginateItems, searchItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect, useRef, useState } from 'react';
import { PlanetsContext } from '../../context/Planets';
import styles from './planets.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialPlanets = await getItems('planets');
  const paths = initialPlanets.results.map((index) => ({
    params: { id: [(index + 1).toString()] },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPlanets = await paginateItems(
    'planets',
    context.params.id !== undefined ? context.params.id[0] : 1
  );
  const pageId = context.params.id !== undefined ? context.params.id[0] : 1;
  return {
    props: {
      pageId,
      initialPlanets,
    },
    revalidate: 1,
  };
};

const Planets = ({ initialPlanets, pageId }) => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const planetsPagesArray = [];
  const planetsPages = Math.ceil(
    planets?.count /
      (planets?.results.length === 10 ? planets?.results.length : 10)
  );
  for (let index = 0; index < planetsPages; index++) {
    planetsPagesArray.push(index);
  }
  const handleKeyEnter = async (event) => {
    if (event.key === 'Enter') {
      setIsSearching(true);
      const value = event.currentTarget.value;
      let results = null;
      if (value !== '') {
        router.push(`/planets/?results=${value}`, undefined, {
          shallow: true,
        });
        results = await searchItems('planets', value);
      } else {
        router.push(`/planets/${pageId}`, undefined, {
          shallow: true,
        });
        results = await paginateItems('planets', pageId);
      }
      setPlanets(results);
      setIsSearching(false);
    }
  };
  useEffect(() => {
    setPlanets(initialPlanets);
    router.query.id === undefined ? (router.query.id = ['1']) : null;
  }, [router.query]);
  return (
    <section className={styles.main}>
      <h3 className={styles.title}>All Planets</h3>
      {isSearching && <h3>I am searching...</h3>}
      <div className={styles.list}>
        {planets ? (
          <>
            <label htmlFor="">
              <input
                onKeyDown={handleKeyEnter}
                type="text"
                placeholder="search planets"
              />
            </label>
            <div className={styles.listInfo}>
              {planets?.results.map((item, index) => (
                <div className={styles.item} key={index}>
                  <Link
                    href={{
                      pathname: '/planet/[id]',
                      query: {
                        id: item.url
                          .slice(0, -1)
                          .slice(item.url.slice(0, -1).lastIndexOf('/') + 1),
                      },
                    }}
                  >
                    <a>{item.name}</a>
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              {planets?.previous !== null && (
                <Link
                  href={{
                    pathname: '/planets/[[...id]]',
                    query: {
                      id: Number(router.query.id) - 1,
                    },
                  }}
                >
                  <a className={styles.page}>Previous Page</a>
                </Link>
              )}
              {planetsPagesArray.map((page, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: '/planets/[[...id]]',
                    query: {
                      id: page + 1,
                    },
                  }}
                >
                  <a className={styles.page}>{page + 1}</a>
                </Link>
              ))}
              {planets?.next !== null && (
                <Link
                  href={{
                    pathname: '/planets/[[...id]]',
                    query: {
                      id: Number(router.query.id) + 1,
                    },
                  }}
                >
                  <a className={styles.page}>Next Page</a>
                </Link>
              )}
            </div>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </section>
  );
};

export default Planets;
