import { API_URL } from "@env";
export const useHttpClient = () => {
  const sendRequest = async (
    relativeUrl,
    method = "GET",
    headers = null,
    body = null
  ) => {
    try {
      const response = await fetch(`${API_URL + relativeUrl}`, {
        method,
        headers,
        body,
      });
      return response;
    } catch (error) {
      console.log(
        "🚀 ~ file: BackEndAPI.js ~ line 17 ~ useHttpClient ~ error",
        error
      );
      throw error;
    }
  };
  return { sendRequest };
};
