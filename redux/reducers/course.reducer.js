import {
	LECTURE_CHANGE,
	UPDATE_PREVIOUS_AND_NEXT_LECTURE,
	LAST_VISITED_COURSE
} from "../constants/constants";

const initialState = {
	active: undefined,
	activeLecture: undefined,
	lastVisitedCourse: undefined,
};

export const courseReducer = (state = initialState, action) => {
	switch (action.type) {
		case LECTURE_CHANGE:
			return {
				...state,
				activeLecture: { ...state.activeLecture, ...action.payload },
			};
		case UPDATE_PREVIOUS_AND_NEXT_LECTURE:
			const { previous, next } = action.payload;
			return {
				...state,
				activeLecture: {
					...state.activeLecture,
					previous,
					next,
				},
			};
		case LAST_VISITED_COURSE:
			const { slug } = action.payload;
			return {
				...state,
				lastVisitedCourse: slug,
			}
		default:
			return state;
	}
};
