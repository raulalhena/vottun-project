import { User } from "../interfaces/User";

const useLocalStorage = () => {

    const save = (user: User) => {
        console.log('user storage ', user)
        localStorage.setItem(user.address, JSON.stringify(user));
    }

    const remove = (address: string) => {
        localStorage.removeItem(address);
    }

  return { save, remove };
}

export default useLocalStorage;