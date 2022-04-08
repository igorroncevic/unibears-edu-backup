import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { toastError } from "@/utils/toasts";
import { PathNames } from "@/utils/routing";

const Auth = ({ children, auth }) => {
	const router = useRouter()
	const { address, unibearsCount } = useSelector(state => state.auth);

	useEffect(() => {
		/* if (!address) {
			toastError("You are not authorized to view this page. Please connect your wallet.");
			router.back();
		} */
		if (unibearsCount < auth.requiredUnibearsCount) {
			toastError("You do not have enough Unibears to access this course.");
			router.push(PathNames.CoursesIndex);
		}
	}, [])

	return children
}

export default Auth;