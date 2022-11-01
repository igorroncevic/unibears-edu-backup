import { AppState } from './store';

export const getAuth = (state: AppState) => state.auth;
export const getUser = (state: AppState) => state.user;
export const getCourse = (state: AppState) => state.course;
export const getActiveLecture = (state: AppState) =>
    state.course.activeLecture?.active;

export const getPreviousLecture = (state: AppState) =>
    state.course.activeLecture?.previous;

export const getNextLecture = (state: AppState) =>
    state.course.activeLecture?.next;
