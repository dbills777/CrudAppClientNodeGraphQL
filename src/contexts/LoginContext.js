import React, { useContext, createContext, useState } from 'react';

const LoginContext = createContext({
  isAuth: true,
  email: '',
  name: '',
  login: () => {},
  setName: () => {},
  setEmail: () => {},
});

export const LoginContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const loginHandler = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  const nameHandler = (personName) => {
    setName(personName);
  };
  const emailHandler = (email) => {
    setEmail(email);
  };

  return (
    <LoginContext.Provider
      value={{
        login: loginHandler,
        setName: nameHandler,
        name: name,
        isAuth: isAuthenticated,
        email: email,
        setEmail: emailHandler,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
