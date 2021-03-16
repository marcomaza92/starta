import Header from '../components/organisms/Header';
import { useContext } from 'react';
import PeopleProvider from '../context/People';
import PlanetsProvider from '../context/Planets';
import QueryProvider from '../context/Query';
import SpeciesProvider from '../context/Species';
import ThemeProvider, { ThemeContext } from '../context/Theme';
import '../styles/globals.scss';
import Footer from '../components/organisms/Footer';

const MyApp = ({ Component, pageProps }) => {
  const { options } = useContext(ThemeContext);
  return (
    <QueryProvider>
      <ThemeProvider>
        <PlanetsProvider>
          <PeopleProvider>
            <SpeciesProvider>
              <div className={`${options.mode} main-layout`}>
                <Header />
                <Component {...pageProps} />
                <Footer />
              </div>
            </SpeciesProvider>
          </PeopleProvider>
        </PlanetsProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default MyApp;
