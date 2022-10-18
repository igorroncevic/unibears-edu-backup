import { Dispatch } from "redux";
import { LANGUAGE_CHANGE } from "../constants/constants";

export type Lang = "sr" | "en";

interface UserPayload {
	langCode: Lang;
}

export type UserAction = {
	type: typeof LANGUAGE_CHANGE;
	payload: UserPayload;
};

export const languageChange =
	(payload: UserPayload) => (dispatch: Dispatch) => {
		return dispatch({ type: LANGUAGE_CHANGE, payload });
	};
