import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import useFetch from "./useFetch";

interface User {
    _id: string;
    address: string;
    nonce: number;
    token: string;
}

const useAuth = () => {

    const { save, remove } = useLocalStorage();
    const { request } = useFetch();

    const [ user, setUser ] = useState<User>({
        _id: '',
        address: '',
        nonce: 0,
        token: ''
    });

    const signIn = (address: string) => {
        const userData = request({ url: 'http://localhost:3000/api/users/' });
        const loggedUser = {
            _id: userData._id,
            address: userData.address,
            nonce: userData.nonce,
            token: ''
        }
        setUser(loggedUser);
        save(loggedUser);
    }

    const signUp = () => {

    }

    const signOut = () => {
        remove();
    }

    return { user, signIn, signUp, signOut };
}

export default useAuth