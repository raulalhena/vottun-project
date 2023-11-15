import { User } from "../interfaces/User";

const useLocalStorage = () => {

    const save = (user: User) => {
        console.log('user storage ', user)
        localStorage.setItem(user.address, JSON.stringify(user));
        return;
    }

    const remove = (address: string) => {
        localStorage.removeItem(address);
        return;
    }

  return { save, remove };
}

export default useLocalStorage;