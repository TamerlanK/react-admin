import { useState, useEffect } from "react"
import axios, { AxiosResponse, CancelTokenSource } from "axios"
import axiosInstance from "../api/axiosInstance"

interface FetchState {
  data: any
  loading: boolean
  error: Error | null
}

const useFetch = (url: string): FetchState => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  let cancelTokenSource: CancelTokenSource

  useEffect(() => {
    cancelTokenSource = axios.CancelToken.source()

    const fetchData = async () => {
      setLoading(true)
      try {
        const response: AxiosResponse<any> = await axiosInstance.get(url, {
          cancelToken: cancelTokenSource.token,
        })
        setData(response.data)
      } catch (error: any) {
        if (!axios.isCancel(error)) {
          setError(error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled by cleanup")
      }
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
