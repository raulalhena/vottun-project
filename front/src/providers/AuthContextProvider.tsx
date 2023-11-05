import { useAuthContext, AuthContext } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

const AuthContextProvider = ({ children }) => {

  const auth = useAuth();

  return (<AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>);
}

export { useAuthContext, AuthContextProvider };