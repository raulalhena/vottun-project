import { useState } from "react"
import useFetch from "./useFetch";

interface User {
    _id: string;
    address: string;
    nonce: number;
    token: string;
}

const useAuth = () => {

    const data = useFetch('http://localhost:3000/api/users/');
    console.log('use auth fetch', data);

    const [ user, setUser ] = useState<User>({
        _id: '',
        address: '',
        nonce: 0,
        token: ''
    });

    const signIn = () => {

    }

    const signUp = () => {

    }

    const signOut = () => {
        
    }

    return { user, signIn, signUp, signOut };
}

export default useAuth