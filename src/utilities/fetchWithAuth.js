import { cookies } from "next/headers";

const X_AUTH = process.env.X_AUTHENTICATION;

const fetchWithAuth = async (url, options = {}) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;

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
