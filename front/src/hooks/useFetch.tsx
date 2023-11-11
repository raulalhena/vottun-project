import { useFetchProps } from "../interfaces/useFetchProps";

const useFetch = () => {

    const request = async ({ url, options }: useFetchProps) => {
        console.log('request', options, url)
        const resp = await fetch(url, options);
        const result = await resp.json();

        return result;
    };
    
    return { request };
}

export default useFetch;