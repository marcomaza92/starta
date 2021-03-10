import { createContext, ReactElement, useState } from 'react';

export const PlanetsContext = createContext(null);

interface PlanetsProviderProps {
  children: ReactElement;
}

const PlanetsProvider: React.FC<PlanetsProviderProps> = ({ children }) => {
  const [planets, setPlanets] = useState(null);
  const [planet, setPlanet] = useState(null);
  return (
    <PlanetsContext.Provider
      value={{
        planets,
        planet,
        setPlanets,
        setPlanet,
      }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;
