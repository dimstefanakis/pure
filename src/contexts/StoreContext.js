import React, { useState, useEffect } from 'react';
const isBrowser = typeof window !== 'undefined'

const defaultStoreContext = {
  filteredCollection: null,
  filteredTags: [],
  updateFilterTags: () => [],
  updateFilterCollection: () => {},
  updateFilterType: () => {},
  updateFilterSort: () => {},
}
export const StoreContext = React.createContext(defaultStoreContext)
export const Provider = ({ children }) => {
  const [store, updateStore] = useState(defaultStoreContext)

  return (
    <StoreContext.Provider
      value={{
        ...store,
        updateFilterTags: tags => {
          updateStore(state => {
              return { ...state, filteredTags: tags }
          })
        },
        updateFilterCollection: collection => {
          updateStore(state => {
              return { ...state, filteredCollection: collection }
          })
        },
        updateFilterType: type => {
          updateStore(state => {
              return { ...state, filteredType: type }
          })
        },
        updateFilterSort: sort => {
          updateStore(state => {
              return { ...state, filteredSort: sort }
          })
        },
      }}>
      {children}
    </StoreContext.Provider>
  );
};
