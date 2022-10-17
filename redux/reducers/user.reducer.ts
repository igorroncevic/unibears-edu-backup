import { Lang, UserAction } from "../actions/user.actions";
import { LANGUAGE_CHANGE } from "../constants/constants";

export interface UserState {
	langCode: Lang;
}

export const initialState: UserState = {
	langCode: "sr",
};

export const userReducer = (
	state: UserState = initialState,
	action: UserAction
): UserState => {
	switch (action.type) {
		case LANGUAGE_CHANGE:
			return {
				...state,
				langCode: action.payload.langCode,
			};
		default:
			return state;
	}
};
