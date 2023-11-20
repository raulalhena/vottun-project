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

        const nonceData = {
            address: address
        };

        const nonceOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nonceData)
        };

        console.log('options ', nonceOptions)

        const nonce = await request({ url: 'http://localhost:3000/api/users/nonce', options: nonceOptions });

        const userData = {
            address: address,
            signature: await signer.signMessage(String(nonce))
        };

        const userOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };

        const user = await request({ url: 'http://localhost:3000/api/users/signin', options: userOptions });
        console.log('user ', user);

        const loggedUser = {
            _id: user._id,
            address: user.address,
            nonce: user.nonce,
            token: user.token
        }

        console.log('logged user ', loggedUser)
        setUser(loggedUser);
        save(loggedUser);

        return;
    }

    const signOut = () => {
        remove();
    }

    return { user, signIn, signOut };
}

export default useAuth