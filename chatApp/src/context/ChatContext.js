const {createContext} = require('react');
export const UserContext = createContext({
  userData: null,
  setuserData: userData => {},
});
