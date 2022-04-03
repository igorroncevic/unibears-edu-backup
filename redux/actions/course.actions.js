import {
  LECTURE_CHANGE,
  UPDATE_PREVIOUS_AND_NEXT_LECTURE,
} from "../constants/constants";

export const lectureChange = (payload) => (dispatch) => {
  return dispatch({ type: LECTURE_CHANGE, payload });
};

export const updatePreviousAndNextLecture = (payload) => (dispatch) => {
  return dispatch({ type: UPDATE_PREVIOUS_AND_NEXT_LECTURE, payload });
};
