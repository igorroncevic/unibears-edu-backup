import {
	ChangeLastVisitedCoursePayload,
	CourseAction,
	LectureChangePayload,
	UpdatePreviousAndNextLecturePayload,
} from "../actions/course.actions";
import {
	LECTURE_CHANGE,
	UPDATE_PREVIOUS_AND_NEXT_LECTURE,
	LAST_VISITED_COURSE,
} from "../constants/constants";

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

export const courseReducer = (
	state: CourseState = initialState,
	action: CourseAction
): CourseState => {
	switch (action.type) {
		case LECTURE_CHANGE:
			const { activeLecture } = action.payload as LectureChangePayload;
			return {
				...state,
				activeLecture: {
					active: activeLecture,
				},
			};
		case UPDATE_PREVIOUS_AND_NEXT_LECTURE:
			const { previous, next } =
				action.payload as UpdatePreviousAndNextLecturePayload;
			return {
				...state,
				activeLecture: {
					active: state.activeLecture?.active,
					previous,
					next,
				},
			};
		case LAST_VISITED_COURSE:
			const { slug } = action.payload as ChangeLastVisitedCoursePayload;
			return {
				...state,
				lastVisitedCourse: slug,
			};
		default:
			return state;
	}
};
