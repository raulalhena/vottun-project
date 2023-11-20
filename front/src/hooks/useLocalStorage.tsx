import { User } from "../interfaces/User";

const useLocalStorage = () => {

    const save = (user: User) => {
        console.log('user storage ', user)
        localStorage.setItem('user', JSON.stringify(user));
        return;
    }

    const remove = () => {
        localStorage.removeItem('user');
        return;
    }

  return { save, remove };
}

export default useLocalStorage;