import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        if ((err as any).name !== "AbortError") {
          setState({ data: null, loading: false, error: "Error" });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { ...state, refetch: fetchData };
}
