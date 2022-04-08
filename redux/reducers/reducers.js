import { combineReducers } from "redux";

import { authReducer } from "./auth.reducer";
import { courseReducer } from "./course.reducer";
import { userReducer } from "./user.reducer";

const reducers = combineReducers({
	auth: authReducer,
	course: courseReducer,
	user: userReducer,
});

export default reducers;
