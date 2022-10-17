import { combineReducers } from "redux";

import { authReducer, AuthState } from "./auth.reducer";
import { courseReducer, CourseState } from "./course.reducer";
import { userReducer, UserState } from "./user.reducer";

export interface AppState {
	auth: AuthState;
	course: CourseState;
	user: UserState;
}

const reducers = combineReducers<AppState>({
	auth: authReducer,
	course: courseReducer,
	user: userReducer,
});

export default reducers;
