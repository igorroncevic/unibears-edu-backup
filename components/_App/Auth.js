import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toastError } from "@/utils/toasts";
import { PathNames } from "@/utils/routing";

const Auth = ({ children, auth }) => {
	const router = useRouter()
	const { address } = useSelector(state => state.auth);
	// console.log(auth);

	// useEffect(() => {
	//     if (!address) {
	//         toastError("You are not authorized to view this page. Please connect your wallet.");
	//         router.push(PathNames.Index);
	//     }
	// }, [])

	return children
}

export default Auth;