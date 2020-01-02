import React, { useState, useMemo, useContext } from 'react';

function makeStore(initialState) {
  const context = React.createContext([{}, function() {}]);

  const StoreProvider = ({ initialValue, children }) => {
    const [state, setState] = useState(initialValue || initialState || {});
    const contextValue = useMemo(() => [state, setState], [state]);
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  const useStore = () => {
    const [state, setState] = useContext(context);
    return { state, setState };
  };

  return { StoreProvider, useStore, initialState };
}

export { makeStore };
