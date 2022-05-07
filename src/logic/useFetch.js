import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const abortCont = new AbortController();
            fetch(url, { signal: abortCont.signal })
                .then((res) => {
                    console.log('res')
                    console.log(res)
                    if (!res.ok) {
                        throw Error('Cannot get the data')
                    }
                    return res.json()
                })
                .then((data) => {
                    setData(data)
                    setPending(false)
                    setError(null)
                    console.log(data)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    }
                    else{
                        setError(err.message)
                        setPending(false)
                    }
                })
            return () => abortCont.abort();
    }, [url])
    return {data, pending, error}
}

export default useFetch;