import { createContext, ReactElement, useState } from 'react';

const initialOptions = {
  mode: 'dark',
  direction: 'ltr',
};

export const ThemeContext = createContext({
  options: initialOptions,
  setOptions: (initialOptions) => initialOptions,
});

interface ThemeProviderProps {
  children: ReactElement;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [options, setOptions] = useState(initialOptions);
  return (
    <ThemeContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
