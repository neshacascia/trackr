import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  function storeAuthValue(value) {
    if (value === 'signup') {
      localStorage.setItem('authValue', 'signup');
    } else if (value === 'login') {
      localStorage.setItem('authValue', 'login');
    }
  }

  function changeAuthValue(value) {
    if (value === 'signup') {
      localStorage.setItem('authValue', 'login');
    } else if (value === 'login') {
      localStorage.setItem('authValue', 'signup');
    }
  }

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
        storeAuthValue,
        changeAuthValue,
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
