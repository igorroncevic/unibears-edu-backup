import {
	LECTURE_CHANGE,
	UPDATE_PREVIOUS_AND_NEXT_LECTURE,
	LAST_VISITED_COURSE,
} from "../constants/constants";

export const lectureChange = (payload) => (dispatch) => {
	return dispatch({ type: LECTURE_CHANGE, payload });
};

export const changeLastVisitedCourse = (payload) => (dispatch) => {
	return dispatch({ type: LAST_VISITED_COURSE, payload });
};

export const updatePreviousAndNextLecture = (payload) => (dispatch) => {
	return dispatch({ type: UPDATE_PREVIOUS_AND_NEXT_LECTURE, payload });
};
