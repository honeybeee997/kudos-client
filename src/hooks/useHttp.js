import { useState } from 'react'

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)

  const sendRequest = async (url, method = 'GET', body = null, headers = { 'content-type': 'application/json' }) => {
    setIsLoading(true)
    try {
      const response = await fetch(url, {
        method,
        body,
        headers
      })

      const data = await response.json()
      setIsLoading(false)

      return data
    } catch (err) {
      setIsLoading(false)

      return err
    }
  }

  return { isLoading, sendRequest }
}
