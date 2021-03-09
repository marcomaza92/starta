import { useContext } from 'react';
import PlanetsProvider, { PlanetsContext } from '../context/Planets';
import QueryProvider from '../context/Query';
import ThemeProvider, { ThemeContext } from '../context/Theme';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  const { options } = useContext(ThemeContext);
  return (
    <QueryProvider>
      <ThemeProvider>
        <PlanetsProvider>
          <div className={`${options.mode}`}>
            <Component {...pageProps} />
          </div>
        </PlanetsProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default MyApp;
