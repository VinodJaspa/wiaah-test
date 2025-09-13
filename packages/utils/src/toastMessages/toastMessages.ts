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


interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
    [key: string]: any;
  };
  path?: (string | number)[];
  originalError?: any;
  [key: string]: any;
}

export function showGraphQLError(error: any) {
  // GraphQL errors can be in error.graphQLErrors or error.response.errors
  const errors: GraphQLError[] =
    error.graphQLErrors ||
    error.response?.errors ||
    (error.message ? [{ message: error.message }] : []);

  if (!errors.length) {
    errorToast("An unknown error occurred.");
    return;
  }

  const extractMessages = (errs: GraphQLError[]): string[] => {
    const messages: string[] = [];
    errs.forEach((err) => {
      if (err.message) messages.push(err.message);
      if (err.originalError?.message) messages.push(err.originalError.message);
      if (Array.isArray(err.extensions?.errors)) {
        messages.push(...extractMessages(err.extensions.errors));
      }
    });
    return messages;
  };

  const allMessages = extractMessages(errors);

  allMessages.forEach((msg) => errorToast(msg));
}


export const warningToast = (message: string, options?: ToastOptions) => {
  toast.warning(message, {
    toastId: generateToastId("warning", message),
    ...defaultOptions,
    ...options,
  });
};
