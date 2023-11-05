import { useEffect, useState } from 'react'

interface useFetchProps {
    url: string;
    options?: unknown;
}

const useFetch = ({ url, options = {} }: useFetchProps) => {

    const [ data, setData ] = useState();

    useEffect(() => {
        const request = async () => {
            const resp = await fetch(url, options);
            const result = await resp.json();

            setData(result);
        };

        request();
    });
    
    return data;
}

export default useFetch;