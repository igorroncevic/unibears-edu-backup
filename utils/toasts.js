import { toast } from "react-hot-toast";

export const toastSuccess = (message) => {
	toast.success(message, {
		position: "bottom-right"
	});
}

export const toastError = (message, options = {}) => {
	toast.error(message, {
		duration: 5000,
		position: "bottom-right",
		...options
	});
}

export const toastErrorImportant = (message) => {
	toast.error(message, {
		duration: 8000,
		position: "top-center",
	})
}
