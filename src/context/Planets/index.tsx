import { createContext, ReactElement, useState } from 'react';

export const PlanetsContext = createContext(null);

interface PlanetProviderProps {
  children: ReactElement;
}

const PlanetsProvider: React.FC<PlanetProviderProps> = ({ children }) => {
  const [planets, setPlanets] = useState(null);
  return (
    <PlanetsContext.Provider
      value={{
        planets,
        setPlanets,
      }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;
