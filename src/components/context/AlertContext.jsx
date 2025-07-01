import { createContext, useContext } from 'react';
import { toast, Bounce } from 'react-toastify';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
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

    return (
        <AlertContext.Provider value={{ errorAlert, successAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
