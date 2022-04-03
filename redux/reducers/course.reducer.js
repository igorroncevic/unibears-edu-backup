import {
  LECTURE_CHANGE,
  UPDATE_PREVIOUS_AND_NEXT_LECTURE,
} from "../constants/constants";

const initialState = {
  active: undefined,
  activeLecture: undefined,
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
    default:
      return state;
  }
};
