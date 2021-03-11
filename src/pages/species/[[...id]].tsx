import { getItems, paginateItems, searchItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { SpeciesContext } from '../../context/Species';
import styles from './species.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialSpecies = await getItems('species');
  const paths = initialSpecies.results.map((index) => ({
    params: { id: [(index + 1).toString()] },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialSpecies = await paginateItems(
    'species',
    context.params.id !== undefined ? context.params.id[0] : 1
  );
  const pageId = context.params.id !== undefined ? context.params.id[0] : 1;
  return {
    props: {
      pageId,
      initialSpecies,
    },
    revalidate: 1,
  };
};

const Species = ({ initialSpecies, pageId }) => {
  const { species, setSpecies } = useContext(SpeciesContext);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const speciesPagesArray = [];
  const speciesPages = Math.ceil(
    species?.count /
      (species?.results.length === 10 ? species?.results.length : 10)
  );
  for (let index = 0; index < speciesPages; index++) {
    speciesPagesArray.push(index);
  }
  const handleKeyEnter = async (event) => {
    if (event.key === 'Enter') {
      setIsSearching(true);
      const value = event.currentTarget.value;
      let results = null;
      if (value !== '') {
        router.push(`/species/?results=${value}`, undefined, {
          shallow: true,
        });
        results = await searchItems('species', value);
      } else {
        router.push(`/species/${pageId}`, undefined, {
          shallow: true,
        });
        results = await paginateItems('species', pageId);
      }
      setSpecies(results);
      setIsSearching(false);
    }
  };
  useEffect(() => {
    setSpecies(initialSpecies);
    router.query.id === undefined ? (router.query.id = ['1']) : null;
  }, [router.query]);
  return (
    <section className={styles.main}>
      <h3 className={styles.title}>All Species</h3>
      {isSearching && <h3>I am searching...</h3>}
      <div className={styles.list}>
        {species ? (
          <>
            <label htmlFor="">
              <input
                onKeyDown={handleKeyEnter}
                type="text"
                placeholder="search species"
              />
            </label>
            <div className={styles.listInfo}>
              {species?.results.map((item, index) => (
                <div className={styles.item} key={index}>
                  <Link
                    href={{
                      pathname: '/specie/[id]',
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
              {species?.previous !== null && (
                <Link
                  href={{
                    pathname: '/species/[[...id]]',
                    query: {
                      id: Number(router.query.id) - 1,
                    },
                  }}
                >
                  <a className={styles.page}>Previous Page</a>
                </Link>
              )}
              {speciesPagesArray.map((page, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: '/species/[[...id]]',
                    query: {
                      id: page + 1,
                    },
                  }}
                >
                  <a className={styles.page}>{page + 1}</a>
                </Link>
              ))}
              {species?.next !== null && (
                <Link
                  href={{
                    pathname: '/species/[[...id]]',
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

export default Species;
