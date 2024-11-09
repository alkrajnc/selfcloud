"use client";
import { useEffect, useState } from "react";

function useQuery<T>(url: string) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(url).then(async (res) => {
            setData(await res.json());
        }).catch((err) => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }, [url]);

    return { data, loading, error };
}

export default useQuery;
