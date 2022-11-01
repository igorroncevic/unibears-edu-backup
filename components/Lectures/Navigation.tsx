import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    Lecture,
    lectureChange,
    Topic,
    updatePreviousAndNextLecture,
} from '../../redux/reducers/course.reducer';
import { getNextLecture, getPreviousLecture } from '../../redux/selectors';
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
    const previous: Lecture | undefined = useSelector(getPreviousLecture);
    const next: Lecture | undefined = useSelector(getNextLecture);

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
                        <i className="flaticon-right-chevron" />
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
                        <button
                            onClick={() => onNavigationClick(previous)}
                            type="button"
                        >
                            {t('previous')}
                        </button>
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
                        <button
                            onClick={() => onNavigationClick(next)}
                            type="button"
                        >
                            {t('next')}
                        </button>
                    </Link>
                    <div style={{ paddingLeft: '5px' }}>
                        <i className="flaticon-right-chevron" />
                    </div>
                </button>
            </div>
        )
    );
}

export default Navigation;
