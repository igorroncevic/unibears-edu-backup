import { DefaultToastOptions, toast } from 'react-hot-toast';

export const toastSuccess = (message: string) => {
    toast.success(message, {
        position: 'bottom-right',
    });
};

export const toastError = (
    message: string,
    options: DefaultToastOptions = {}
) => {
    toast.error(message, {
        duration: 5000,
        position: 'bottom-right',
        ...options,
    });
};

export const toastErrorImportant = (message: string) => {
    toast.error(message, {
        duration: 8000,
        position: 'top-center',
    });
};
