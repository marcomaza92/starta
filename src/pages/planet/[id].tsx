import { getItem, getItems } from '../../api/endpoints';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../../context/Planets';
import styles from './planet.module.scss';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const initialPlanets = await getItems('planets');
  const paths = initialPlanets.results.map((index) => ({
    params: { id: (index + 1).toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialPlanet = await getItem('planets', context.params.id);
  return {
    props: {
      initialPlanet,
    },
    revalidate: 1,
  };
};

const Planets = ({ initialPlanet }) => {
  const { planet, setPlanet } = useContext(PlanetsContext);
  const router = useRouter();
  useEffect(() => {
    setPlanet(initialPlanet);
  }, [router]);
  const climateImage = () => {
    switch (planet?.climate.split(',')[0]) {
      case 'arid':
        return 'arid';
        break;
      case 'frozen':
        return 'frozen';
        break;
      default:
        return 'temperate';
        break;
    }
  };
  return (
    <section className={styles.main}>
      <div className={styles.detail}>
        <h3 className={styles.detailTitle}>Planet Detail</h3>
        {planet ? (
          <div className={styles.detailInfo}>
            {climateImage && (
              <div className={styles.detailImage}>
                <img src={`/${climateImage()}.png`} alt={climateImage()} />
              </div>
            )}
            <div className={styles.detailTextContainer}>
              <p className={styles.detailText}>
                In <strong>{planet?.name}</strong> you can have fun during every
                day of all the <strong>{planet?.orbital_period}</strong> days of
                the year.
              </p>
              <p className={styles.detailText}>
                With a <strong>{planet?.climate}</strong> climate and around{' '}
                <strong>{planet?.population}</strong> people to get along with,
                rest assured that you will have the best time of your live.
              </p>
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
