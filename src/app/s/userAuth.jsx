"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const userAuth = (WrappedComponent) => {
  const AuthRoute = (props) => {
    const { push } = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        setIsAuthenticating(true);
        const token = Cookies.get("token");

        if (!token) {
          push("/login");
          setIsAuthenticating(false);
          return;
        }

        setIsAuthenticating(false);
      };

      checkAuthentication();
    }, []);

    return isAuthenticating ? <Loading /> : <WrappedComponent {...props} />;
  };

  return AuthRoute;
};

export default userAuth;
