import { User } from "../interfaces/User";

const useLocalStorage = () => {

    const setUser = (user: User) => {
        localStorage.setItem(JSON.stringify(user));
    }

    const unsetUser = (user: User) => {
        localStorage.removeItem(JSON.parse(user));
    }

  return { setUser, unsetUser };
}

export default useLocalStorage;