import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface Translation {
    en: string;
    sr: string;
}

export interface Author {
    id: string;
    name: string;
    title: string;
    profilePhoto: any;
    bio: any;
}

export interface Category {
    id: string;
    name: Translation;
}

export interface Lecture {
    id: string | undefined;
    title: Translation;
    source: string;
    overview: Translation;
    duration: string;
}

export interface Topic {
    id: string;
    title: Translation;
    overview: string;
    lectures: Lecture[];
}

export interface Course {
    id: string;
    title: Translation;
    slug: string;
    author: Author;
    categories: Category[];
    bannerPhoto: any;
    thumbnail: any;
    coursePreview: string;
    publishedAt: any;
    overview: any;
    topics: Topic[];
    duration: string;
    requiredCollectionItems: number;
}

export interface LectureData {
    active: Lecture | undefined;
    previous?: Lecture;
    next?: Lecture;
}

export interface CourseState {
    active: boolean | undefined;
    activeLecture: LectureData | undefined;
    lastVisitedCourse: string | undefined;
}

export const initialState: CourseState = {
    active: undefined,
    activeLecture: undefined,
    lastVisitedCourse: undefined,
};

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

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        lectureChange: (
            state: CourseState,
            action: { payload: LectureChangePayload }
        ) => {
            state.activeLecture = {
                active: action.payload.activeLecture,
            };
        },
        updatePreviousAndNextLecture: (
            state: CourseState,
            action: { payload: UpdatePreviousAndNextLecturePayload }
        ) => {
            const { previous, next } = action.payload;
            state.activeLecture = {
                active: state.activeLecture?.active,
                previous,
                next,
            };
        },
        changeLastVisitedCourse: (
            state: CourseState,
            action: { payload: ChangeLastVisitedCoursePayload }
        ) => {
            state.lastVisitedCourse = action.payload.slug;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.course,
            };
        },
    },
});

export const {
    lectureChange,
    updatePreviousAndNextLecture,
    changeLastVisitedCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
