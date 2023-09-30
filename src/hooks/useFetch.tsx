import { useState } from "react";
import { DELETE, GET, POST, PUT } from "../utils/fetch.utils";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type UseFetchProps = {
  url: string;
  method: MethodType;
};

type UseFetchOutput<R, P> = [
  (body: P) => Promise<void>,
  R | null,
  boolean,
  string
];

/**
 * @returns [customFetch, data, isLoading, error]
 */

export const useFetch = <R, P>({ url, method, }: UseFetchProps): UseFetchOutput<R, P> => {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const requestByMethod = (method: MethodType, url: string, body: P): Promise<R> => {
    if (method === "GET") return GET<R>(url);
    if (method === "POST") return POST<R, P>(url, body);
    if (method === "PUT") return PUT<R, P>(url, body);
    if (method === "DELETE") return DELETE<R>(url);
    throw Error("invalid method");
  };

  const customFetch = async (body: P): Promise<void> => {
    try {
      setIsLoading(true);
      const result = await requestByMethod(method, url, body);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("Oops! Can not complete this operation, try again later");
    }
  };
  return [customFetch, data, isLoading, error];
};
