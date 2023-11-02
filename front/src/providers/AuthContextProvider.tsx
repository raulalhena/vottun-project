import { createContext, useContext } from "react";

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {

  const auth = useAuth();

  return <AuthContextProvider.Provider value={auth}>{ children }</AuthContextProvider.Provider>
}

export default { useAuthContext, AuthContextProvider };