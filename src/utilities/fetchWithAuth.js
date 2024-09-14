import { parseCookies } from "nookies";

const X_AUTH = process.env.NEXT_PUBLIC_X_AUTHENTICATION;

const fetchWithAuth = async (url, options = {}) => {
  const cookies = parseCookies();
  const token = cookies.token;

  console.log({ token });

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  options.headers = {
    ...options.headers,
    "x-authentication": X_AUTH,
    cache: "no-store",
  };

  const response = await fetch(url, options);
  return response;
};

export default fetchWithAuth;
