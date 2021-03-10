import { createContext, ReactElement, useState } from 'react';

export const SpeciesContext = createContext(null);

interface SpeciesProviderProps {
  children: ReactElement;
}

const SpeciesProvider: React.FC<SpeciesProviderProps> = ({ children }) => {
  const [species, setSpecies] = useState(null);
  const [specie, setSpecie] = useState(null);
  return (
    <SpeciesContext.Provider
      value={{
        species,
        specie,
        setSpecies,
        setSpecie,
      }}
    >
      {children}
    </SpeciesContext.Provider>
  );
};

export default SpeciesProvider;
