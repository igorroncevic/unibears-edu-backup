import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { toastErrorImportant } from "@/utils/toasts";
import { PathNames } from "@/utils/routing";

const Auth = ({ children, auth }) => {
	const [t] = useTranslation("toasts");
	const router = useRouter()
	const { unibearsCount } = useSelector(state => state.auth);
	const { lastVisitedCourse } = useSelector(state => state.course);

	useEffect(() => {
		if (unibearsCount < auth.requiredUnibearsCount) {
			toastErrorImportant(t("error.notEnoughUnibears"));
			if (lastVisitedCourse) {
				router.push(PathNames.CoursesId, PathNames.CoursesIdFilled(lastVisitedCourse));
			} else {
				router.push(PathNames.CoursesIndex);
			}
		}
	}, [])

	return children
}

export default Auth;