import { createContext, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const apiUrl = URL_CONFIG.API_URL;

  const errorAlert = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const successAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const [auth, setAuth] = useState({
    userNo: null,
    userId: null,
    userName: null,
    accessToken: null,
    refreshToken: null,
    userRole: null,
  });

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const userNo = sessionStorage.getItem("userNo");
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");
    const userRole = sessionStorage.getItem("userRole");

    if (
      accessToken &&
      refreshToken &&
      userNo &&
      userId &&
      userName &&
      userRole
    ) {
      setAuth({
        userNo: userNo,
        userId: userId,
        userName: userName,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userRole: userRole,
      });
    }
  }, []);

  const login = (
    accessToken,
    refreshToken,
    userNo,
    userId,
    userName,
    userRole
  ) => {
    setAuth({
      userNo: userNo,
      userId: userId,
      userName: userName,
      accessToken: accessToken,
      refreshToken: refreshToken,
      userRole: userRole,
    });

    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("userNo", userNo);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userRole", userRole);

    //  window.location.href = "/";
    if (userRole === "ADMIN") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  };

  const logout = () => {
    setAuth({
      userNo: null,
      userId: null,
      userName: null,
      accessToken: null,
      refreshToken: null,
      userRole: null,
    });

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userNo");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userPhone");

    window.location.href = "/";
  };

  return (
    <GlobalContext.Provider
      value={{ errorAlert, successAlert, auth, login, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
