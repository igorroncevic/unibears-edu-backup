import { toast } from "react-hot-toast";

export const toastSuccess = (message) => {
	toast.success(message);
}

export const toastError = (message) => {
	toast.error(message, { duration: 5000 });
}