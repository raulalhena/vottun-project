import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import useFetch from "./useFetch";
import ethers from 'ethers';

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

    const signIn = async (address: string, signer: ethers.JsonRpcSigner) => {
        // console.log('signed message ', await signer.signMessage('18821'))
        console.log(address)
        const data = {
            address: address,
            signature: await signer.signMessage('18821'),
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const userData = await request({ url: 'http://localhost:3000/api/users/signin' , options });
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