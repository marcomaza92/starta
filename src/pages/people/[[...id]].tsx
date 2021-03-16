import { getItems, paginateItems, searchItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../../context/People';
import styles from './people.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialPeople = await getItems('people');
  const paths = initialPeople.results.map((index) => ({
    params: { id: [(index + 1).toString()] },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPeople = await paginateItems(
    'people',
    context.params.id !== undefined ? context.params.id[0] : 1
  );
  const pageId = context.params.id !== undefined ? context.params.id[0] : 1;
  return {
    props: {
      pageId,
      initialPeople,
    },
    revalidate: 1,
  };
};

const People = ({ initialPeople, pageId }) => {
  const { people, setPeople } = useContext(PeopleContext);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const peoplePagesArray = [];
  const peoplePages = Math.ceil(
    people?.count /
      (people?.results.length === 10 ? people?.results.length : 10)
  );
  for (let index = 0; index < peoplePages; index++) {
    peoplePagesArray.push(index);
  }
  const handleKeyEnter = async (event) => {
    if (event.key === 'Enter') {
      setIsSearching(true);
      const value = event.currentTarget.value;
      let results = null;
      if (value !== '') {
        router.push(`/people/?results=${value}`, undefined, {
          shallow: true,
        });
        results = await searchItems('people', value);
      } else {
        router.push(`/people/${pageId}`, undefined, {
          shallow: true,
        });
        results = await paginateItems('people', pageId);
      }
      setPeople(results);
      setIsSearching(false);
    }
  };
  const personImage = (person) => {
    let value = '';
    if (person.species.length === 0) {
      value = person.gender;
    } else {
      value =
        Number(
          person.species[0]
            .slice(0, -1)
            .slice(person.species[0].slice(0, -1).lastIndexOf('/') + 1)
        ) === 2
          ? 'droid'
          : 'other';
    }
    return value;
  };
  useEffect(() => {
    setPeople(initialPeople);
    router.query.id === undefined ? (router.query.id = ['1']) : null;
  }, [router.query]);
  return (
    <section className={styles.main}>
      <h3 className={styles.title}>All People</h3>
      {isSearching && <h3>I am searching...</h3>}
      <div className={styles.list}>
        {people ? (
          <>
            <label className={styles.search} htmlFor="">
              <input
                onKeyDown={handleKeyEnter}
                type="text"
                placeholder="Search People"
              />
            </label>
            <div className={styles.listInfo}>
              {people?.results.map((item, index) => (
                <div className={styles.item} key={index}>
                  <img src={`/${personImage(item)}.png`} alt="" />
                  <Link
                    href={{
                      pathname: '/person/[id]',
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
              {people?.previous !== null && (
                <p className={styles.page}>
                  <Link
                    href={{
                      pathname: '/people/[[...id]]',
                      query: {
                        id: Number(router.query.id) - 1,
                      },
                    }}
                  >
                    <a className={styles.page}>Previous Page</a>
                  </Link>
                </p>
              )}
              {peoplePagesArray.map((page, index) => (
                <p
                  className={`${styles.page} ${
                    index + 1 === Number(router.query.id)
                      ? styles.currentPage
                      : null
                  }`}
                >
                  <Link
                    key={index}
                    href={{
                      pathname: '/people/[[...id]]',
                      query: {
                        id: page + 1,
                      },
                    }}
                  >
                    <a className={styles.page}>{page + 1}</a>
                  </Link>
                </p>
              ))}
              {people?.next !== null && (
                <p className={styles.page}>
                  <Link
                    href={{
                      pathname: '/people/[[...id]]',
                      query: {
                        id: Number(router.query.id) + 1,
                      },
                    }}
                  >
                    <a className={styles.page}>Next Page</a>
                  </Link>
                </p>
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

export default People;
