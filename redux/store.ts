import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";

import reducers, { AppState } from "./reducers/reducers";
import { initialState as authInitialState } from "./reducers/auth.reducer";
import { initialState as courseInitialState } from "./reducers/course.reducer";
import { initialState as userInitialState } from "./reducers/user.reducer";

const bindMiddleware = (middleware: any) => {
	if (process.env.NODE_ENV !== "production") {
		const { composeWithDevTools } = require("redux-devtools-extension");
		return composeWithDevTools(applyMiddleware(...middleware));
	}

	return applyMiddleware(...middleware);
};

const reducer = (state: AppState | undefined, action: any) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // previous state
			...action.payload,
		};
		return nextState;
	} else {
		// Call other reducers
		return reducers(state, action);
	}
};

const initStore = () => {
	return createStore(
		reducer,
		{
			auth: authInitialState,
			course: courseInitialState,
			user: userInitialState,
		},
		bindMiddleware([thunkMiddleware])
	);
};

export const wrapper = createWrapper(initStore);
export const store = initStore();
