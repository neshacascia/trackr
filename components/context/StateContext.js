import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [toggleMenu, setToggleMenu] = useState(false);

  function openMobileMenu() {
    setToggleMenu(true);
  }

  function closeMobileMenu() {
    setToggleMenu(false);
  }

  const [filterInvoices, setFilterInvoices] = useState();

  return (
    <Context.Provider
      value={{
        toggleMenu,
        openMobileMenu,
        closeMobileMenu,
        filterInvoices,
        setFilterInvoices,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
