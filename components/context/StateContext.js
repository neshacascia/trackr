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

  const [filterInvoices, setFilterInvoices] = useState([]);
  const [filterExpenses, setFilterExpenses] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(true);

  function toggleDarkMode() {
    setIsDarkMode(prevState => !prevState);
  }

  return (
    <Context.Provider
      value={{
        toggleMenu,
        openMobileMenu,
        closeMobileMenu,
        filterInvoices,
        setFilterInvoices,
        filterExpenses,
        setFilterExpenses,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
