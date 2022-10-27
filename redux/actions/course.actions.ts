import { Dispatch } from 'redux';
import {
    LECTURE_CHANGE,
    UPDATE_PREVIOUS_AND_NEXT_LECTURE,
    LAST_VISITED_COURSE,
} from '../constants/constants';
import { Lecture } from '../reducers/course.reducer';

export interface LectureChangePayload {
    activeLecture: Lecture | undefined;
}

export interface ChangeLastVisitedCoursePayload {
    slug: string;
}

export interface UpdatePreviousAndNextLecturePayload {
    previous: Lecture | undefined;
    next: Lecture | undefined;
}

type CoursePayload =
    | LectureChangePayload
    | ChangeLastVisitedCoursePayload
    | UpdatePreviousAndNextLecturePayload;

export type CourseAction = {
    type:
        | typeof LECTURE_CHANGE
        | typeof UPDATE_PREVIOUS_AND_NEXT_LECTURE
        | typeof LAST_VISITED_COURSE;
    payload: CoursePayload;
};

export const lectureChange =
    (payload: CoursePayload) => (dispatch: Dispatch) => {
        return dispatch({ type: LECTURE_CHANGE, payload });
    };

export const changeLastVisitedCourse =
    (payload: CoursePayload) => (dispatch: Dispatch) => {
        return dispatch({ type: LAST_VISITED_COURSE, payload });
    };

export const updatePreviousAndNextLecture =
    (payload: CoursePayload) => (dispatch: Dispatch) => {
        return dispatch({ type: UPDATE_PREVIOUS_AND_NEXT_LECTURE, payload });
    };
