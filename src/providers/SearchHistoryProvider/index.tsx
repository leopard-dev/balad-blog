import * as React from "react";

type SearchHistoryContextType = {
  history: string[];
  addHistory: (elementToAdd: string) => void;
};

export const SearchHistoryContext =
  React.createContext<SearchHistoryContextType>({
    history: [],
    addHistory: () => {},
  });

const SearchHistoryProvider: React.FC = ({ children }) => {
  const [history, setHistory] = React.useState<string[]>([]);
  const addHistory = React.useCallback((elementToAdd: string) => {
    setHistory((old) => {
      if (!old.includes(elementToAdd)) {
        return [elementToAdd, ...old];
      } else {
        return old;
      }
    });
  }, []);
  return (
    <SearchHistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => React.useContext(SearchHistoryContext);

export default SearchHistoryProvider;
