import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    Lecture,
    lectureChange,
    Topic,
    updatePreviousAndNextLecture,
} from '../../redux/reducers/course.reducer';
import { AppState } from '../../redux/store';
import {
    findTopicAndLectureIndex,
    setNextAndPreviousLecture,
} from '../../utils/common';
import { PATH_NAMES } from '../../utils/routing';

interface NavigationProps {
    topics: Topic[];
}

function Navigation({ topics }: NavigationProps) {
    const [t] = useTranslation('courses');
    const previous: Lecture | undefined = useSelector(
        (state: AppState) => state.course.activeLecture?.previous
    );
    const next: Lecture | undefined = useSelector(
        (state: AppState) => state.course.activeLecture?.next
    );

    const dispatch = useDispatch();

    const onNavigationClick = (lecture: Lecture) => {
        const { topicIndex, lectureIndex } = findTopicAndLectureIndex(
            topics,
            lecture.id
        );
        if (topicIndex && lectureIndex) {
            dispatch(
                lectureChange({
                    activeLecture: topics[topicIndex].lectures[lectureIndex],
                })
            );
            const data = setNextAndPreviousLecture(
                topics,
                topicIndex,
                lectureIndex
            );
            dispatch(updatePreviousAndNextLecture(data));
        }
    };

    return (
        previous &&
        next && (
            <div className="container d-flex justify-content-between">
                <button
                    onClick={() => {}}
                    className="btn btn-light d-flex flex-row"
                    type="button"
                    disabled={!previous}
                >
                    <div
                        style={{
                            transform: 'rotate(180deg)',
                            paddingLeft: '5px',
                        }}
                    >
                        <i className="flaticon-right-chevron"></i>
                    </div>
                    <Link
                        href={{
                            pathname:
                                PATH_NAMES.LectureCoursesIdFilled(
                                    'test-course'
                                ),
                            query: { active: previous?.id },
                        }}
                    >
                        <a onClick={() => onNavigationClick(previous)}>
                            {t('previous')}
                        </a>
                    </Link>
                </button>
                <button
                    onClick={() => {}}
                    className="btn btn-light d-flex flex-row"
                    type="button"
                    disabled={!next}
                >
                    <Link
                        href={{
                            pathname:
                                PATH_NAMES.LectureCoursesIdFilled(
                                    'test-course'
                                ),
                            query: { active: next && next.id },
                        }}
                    >
                        <a onClick={() => onNavigationClick(next)}>
                            {t('next')}
                        </a>
                    </Link>
                    <div style={{ paddingLeft: '5px' }}>
                        <i className="flaticon-right-chevron"></i>
                    </div>
                </button>
            </div>
        )
    );
}

export default Navigation;
