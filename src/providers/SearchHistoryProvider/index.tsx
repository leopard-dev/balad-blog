import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type SearchHistoryContextType = {
  history: string[];
  // eslint-disable-next-line no-unused-vars
  addHistory: (elementToAdd: string) => void;
};

export const SearchHistoryContext = createContext<SearchHistoryContextType>({
  history: [],
  addHistory: () => {},
});

const SearchHistoryProvider: FC = ({ children }) => {
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = useCallback((elementToAdd: string) => {
    setHistory((old) => {
      if (!old.includes(elementToAdd)) {
        return [elementToAdd, ...old];
      }
      return old;
    });
  }, []);

  const value = useMemo(() => ({ history, addHistory }), [history, addHistory]);

  return (
    <SearchHistoryContext.Provider value={value}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => useContext(SearchHistoryContext);

export default SearchHistoryProvider;
