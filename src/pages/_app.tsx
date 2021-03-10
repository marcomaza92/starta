import { useContext } from 'react';
import PeopleProvider from '../context/People';
import PlanetsProvider from '../context/Planets';
import QueryProvider from '../context/Query';
import SpeciesProvider from '../context/Species';
import ThemeProvider, { ThemeContext } from '../context/Theme';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  const { options } = useContext(ThemeContext);
  return (
    <QueryProvider>
      <ThemeProvider>
        <PlanetsProvider>
          <PeopleProvider>
            <SpeciesProvider>
              <div className={`${options.mode}`}>
                <Component {...pageProps} />
              </div>
            </SpeciesProvider>
          </PeopleProvider>
        </PlanetsProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default MyApp;
