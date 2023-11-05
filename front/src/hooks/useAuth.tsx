import { useState } from "react";
import useLocalStorage from 'useLocalStorage';
import useFetch from "./useFetch";

interface User {
    _id: string;
    address: string;
    nonce: number;
    token: string;
}

const useAuth = () => {

    const { setUser, unsetUser } = useLocalStorage();
    const user = useFetch({ url: 'http://localhost:3000/api/users/' });
    console.log('use auth fetch', data);

    const [ user, setUser ] = useState<User>({
        _id: '',
        address: '',
        nonce: 0,
        token: ''
    });

    const signIn = () => {
        setUser({
            _id: user._id,
            address: user.address,
            nonce: user.nonce,
            token: ''
        });
    }

    const signUp = () => {

    }

    const signOut = () => {
        unsetUser();
    }

    return { user, signIn, signUp, signOut };
}

export default useAuth