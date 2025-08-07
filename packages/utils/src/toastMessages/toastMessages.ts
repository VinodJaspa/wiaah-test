// utils/toastUtils.ts
import { toast, ToastOptions } from "react-toastify";
import md5 from "md5";

const generateToastId = (type: string, message: string) => {
  return `${type}-${md5(message)}`;
};

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  pauseOnHover: true,
  draggable: true,
};

export const successToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    toastId: generateToastId("success", message),
    ...defaultOptions,
    ...options,
  });
};

export const errorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    toastId: generateToastId("error", message),
    ...defaultOptions,
    ...options,
  });
};

export const warningToast = (message: string, options?: ToastOptions) => {
  toast.warning(message, {
    toastId: generateToastId("warning", message),
    ...defaultOptions,
    ...options,
  });
};
