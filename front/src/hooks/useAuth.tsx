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

    const signIn = async (address: string) => {
        const options = {
            method: 'POST',
            'content-type': 'application/json',
            body: {
                address: address
            }
        }
        const userData = await request({ url: 'http://localhost:3000/api/users/' }, options);
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