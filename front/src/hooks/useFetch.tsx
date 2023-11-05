import { useEffect, useState } from 'react'

interface useFetchProps {
    url: string;
    options?: unknown;
}

const useFetch = ({ url, options = {} }: useFetchProps) => {

    const [ data, setData ] = useState<unknown>({});

    useEffect(() => {
        const request = async () => {
            console.log('request', url)
            const resp = await fetch(url, options);
            const result = await resp.json();

            console.log('result ', result)

            setData(result);
        };

        request();
    }, []);
    
    return data;
}

export default useFetch;