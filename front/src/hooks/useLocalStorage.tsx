import { User } from "../interfaces/User";

const useLocalStorage = () => {

    const save = (user: User) => {
        localStorage.setItem(user.address, JSON.stringify(user));
    }

    const remove = (address: string) => {
        localStorage.removeItem(address);
    }

  return { save, remove };
}

export default useLocalStorage;