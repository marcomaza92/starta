import { getItems, paginateItems, searchItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../../context/Planets';
import styles from './planets.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PeopleContext } from '../../context/People';
import { SpeciesContext } from '../../context/Species';
import { types } from '../../api/static';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialData = [];
  for (let index = 0; index < types.length; index++) {
    initialData.push(
      Object.assign(types[index], {
        data: await getItems(types[index].all),
      })
    );
  }
  const paths = [];
  for (let typeId = 0; typeId < types.length; typeId++) {
    for (
      let itemId = 0;
      itemId < initialData[itemId]?.data.results.length;
      itemId++
    ) {
      paths.push(
        Object.assign(
          {},
          {
            params: {
              slug: types[typeId].all,
              id: [(itemId + 1).toString()],
            },
          }
        )
      );
    }
  }
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialData = await paginateItems(
    context.params.slug,
    context.params.id !== undefined ? context.params.id[0] : 1
  );
  const pageId = context.params.id !== undefined ? context.params.id[0] : 1;
  const type =
    context.params.slug !== undefined ? context.params.slug : 'planets';
  console.log(initialData);
  return {
    props: {
      type,
      pageId,
      initialData,
    },
    revalidate: 1,
  };
};

const Planets = ({ initialData, pageId, type }) => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const { people, setPeople } = useContext(PeopleContext);
  const { species, setSpecies } = useContext(SpeciesContext);
  const contextData = [
    {
      contextName: 'planets',
      contextValue: planets,
      contextFunction: setPlanets,
    },
    {
      contextName: 'people',
      contextValue: people,
      contextFunction: setPeople,
    },
    {
      contextName: 'species',
      contextValue: species,
      contextFunction: setSpecies,
    },
  ];
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const itemsPagesArray = [];
  const itemsPages = contextData.map((item) => {
    if (item.contextName === type) {
      return Math.ceil(
        item?.contextValue.count /
          (item?.contextValue.results.length === 10
            ? item?.contextValue.results.length
            : 10)
      );
    }
  });
  for (let index = 0; index < itemsPages[index]; index++) {
    itemsPagesArray.push(index);
  }
  const handleKeyEnter = async (event) => {
    if (event.key === 'Enter') {
      setIsSearching(true);
      const value = event.currentTarget.value;
      let results = null;
      if (value !== '') {
        router.push(`/${type}/?results=${value}`, undefined, {
          shallow: true,
        });
        results = await searchItems(type, value);
      } else {
        router.push(`/${type}/${pageId}`, undefined, {
          shallow: true,
        });
        results = await paginateItems(type, pageId);
      }
      setPlanets(results);
      setIsSearching(false);
    }
  };
  useEffect(() => {
    if (initialData !== undefined) {
      contextData.map((item) => {
        if (item.contextName === type) {
          return item.contextFunction(initialData);
        }
      });
    }
    router.query.id === undefined ? (router.query.id = ['1']) : null;
  }, [router.query]);
  return (
    <section className={styles.main}>
      <h3 className={styles.title}>All {type}</h3>
      {isSearching && <h3>I am searching...</h3>}
      <div className={styles.list}>
        {contextData.map((data) =>
          data.contextName === type ? (
            <>
              <label htmlFor="">
                <input
                  onKeyDown={handleKeyEnter}
                  type="text"
                  placeholder={`search ${type}`}
                />
              </label>
              <div className={styles.listInfo}>
                {data?.contextValue.map((item, index) => (
                  <div className={styles.item} key={index}>
                    <Link
                      href={{
                        pathname: `/${initialData.single}/[id]`,
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
                {data?.previous !== null && (
                  <Link
                    href={{
                      pathname: `/${type}/[[...id]]`,
                      query: {
                        id: Number(router.query.id) - 1,
                      },
                    }}
                  >
                    <a className={styles.page}>Previous Page</a>
                  </Link>
                )}
                {itemsPagesArray.map((page, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: `/${type}/[[...id]]`,
                      query: {
                        id: page + 1,
                      },
                    }}
                  >
                    <a className={styles.page}>{page + 1}</a>
                  </Link>
                ))}
                {data?.next !== null && (
                  <Link
                    href={{
                      pathname: `/${type}/[[...id]]`,
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
          )
        )}
      </div>
    </section>
  );
};

export default Planets;
