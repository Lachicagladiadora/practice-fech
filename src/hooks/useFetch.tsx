// create hook
// pass parameters, url, method, body
//  return data,  isLoading, error->(string or something error)



import { useState } from "react"

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

type UseFetchProps = {
  url: string,
  method: MethodType,
  body: any
}


export const useFetch = ({ url, method, body }: UseFetchProps) => { 
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const requestByMethod = (method: MethodType, url:string, body: any) => { // todo: explain how todo this by map object
    if(method === 'GET') return GET(url)
    if(method === 'POST') return POST(url, body)
    if(method === 'PUT') return PUT(url, body)
    if(method === 'DELETE') return DELETE(url)
  }

  const customFetch = async () => {
    try {
      setIsLoading(true)
      const result = await requestByMethod(method, url, body)
      setData(result)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setError('Oops! Can not complete this operation, try again later')
    }
  }

  return { customFetch, data, isLoading, error}
}

const GET = async<T,>(url: string): Promise<T> => {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

// POST
const POST = async<R, P>(url: string, body: P): Promise<R> => {
  const res = await fetch(url, {
    method: 'POST', body: JSON.stringify(body), headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const data = res.json()
  return data
}

// PUT
const PUT = async<R, P>(url: string, body: P): Promise<R> => {
  const res = await fetch(url, {
    method: 'PUT', body: JSON.stringify(body), headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const data = res.json()
  return data
}

// DELETE
const DELETE = async<R,>(url: string): Promise<R> => {
  const res = await fetch(url, {
    method: 'DELETE', headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const data = res.json()
  return data
}

