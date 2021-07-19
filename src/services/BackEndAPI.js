import { API_URL } from "@env";
import { useCallback, useRef, useEffect } from "react";
export const useHttpClient = () => {
  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(
    async (relativeUrl, method = "GET", headers = {}, body = null) => {
      const httpAbortControl = new AbortController();
      activeHttpRequests.current.push(httpAbortControl);
      try {
        const response = await fetch(`${API_URL + relativeUrl}`, {
          method,
          headers,
          body,
          signal: httpAbortControl.signal,
        });
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortControl
        );
        return response;
      } catch (error) {
        console.log(
          "file: BackEndAPI.js ~ line 17 ~ useHttpClient ~ error",
          error
        );
        throw error;
      }
    },
    []
  );
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { sendRequest };
};
