import { useState } from "react"

export const useFetch = <T> (url : string) => {

    const [data, setData]= useState <T>()
    const [loading, setLoading]= useState(false)
    const [error, setError]= useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(url)
            const json = await response.json()
            setData(json)
        }
        catch {
            setError(true)

        }
        finally{
            setLoading(false)
        }
    }
    return {data, loading, error, fetchData}
} 