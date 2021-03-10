import { createContext, ReactElement, useState } from 'react';

export const PeopleContext = createContext(null);

interface PeopleProviderProps {
  children: ReactElement;
}

const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [people, setPeople] = useState(null);
  const [person, setPerson] = useState(null);
  return (
    <PeopleContext.Provider
      value={{
        people,
        person,
        setPeople,
        setPerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleProvider;
