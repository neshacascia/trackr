import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider(props) {
  const [toggleMenu, setToggleMenu] = useState(false);

  function openMobileMenu() {
    setToggleMenu(true);
  }

  return (
    <Context.Provider value={{ toggleMenu, openMobileMenu }}>
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
