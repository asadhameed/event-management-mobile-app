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
      if (response.status === 200) return await response.json();
      else throw new Error("Something wrong");
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
