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
  const personImage = () => {
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
    setPerson(initialPerson);
  }, [router]);
  return (
    <section className={styles.main}>
      <div className={styles.detail}>
        <h3 className={styles.detailTitle}>{person?.name}</h3>
        {person ? (
          <div className={styles.detailInfo}>
            {personImage && (
              <div className={styles.detailImage}>
                <img src={`/${personImage()}.png`} alt={personImage()} />
              </div>
            )}
            <div className={styles.detailListContainer}>
              <ul className={styles.detailList}>
                <li className={styles.detailListItem}>
                  <img src="/height.png" alt="" />
                  <span>{person.height}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/weight.png" alt="" />
                  <span>{person.mass}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/birth.png" alt="" />
                  <span>{person.birth_year}</span>
                </li>
                <li className={styles.detailListItem}>
                  <img src="/gender.png" alt="" />
                  <span>{person.gender}</span>
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
