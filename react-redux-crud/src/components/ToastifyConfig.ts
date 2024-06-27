import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const toastSuccess = (message : String) => toast.success(message)

export const toastError = (message : String) => toast.error(message)

export const toastWarn = (message : String) => toast.warn(message)