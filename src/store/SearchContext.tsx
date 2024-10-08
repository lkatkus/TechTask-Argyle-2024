import { createContext, PropsWithChildren, useState } from "react";

interface SearchContextValue {
  search: string;
  actions: {
    updateSearchString: (newSearchValue: string) => void;
  };
}

export const SearchContext = createContext<SearchContextValue>({
  search: "",
  actions: {
    updateSearchString: () => {},
  },
});

export const SearchContextWrapper = ({ children }: PropsWithChildren) => {
  const [searchString, setSearchString] = useState("");

  const handleUpdateSearch = (newSearchValue: string) => {
    setSearchString(newSearchValue);
  };

  const value: SearchContextValue = {
    search: searchString,
    actions: {
      updateSearchString: handleUpdateSearch,
    },
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
