import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { CourseProps } from './CourseCard';
import { AppState } from '../../redux/reducers/reducers';
import { PATH_NAMES } from '../../utils/routing';
import { Fragment } from 'react';

const CoursesCurriculum = ({ course }: CourseProps) => {
    const [t] = useTranslation('courses');
    const { langCode } = useSelector((state: AppState) => state.user);
    const { collectionItemsCount } = useSelector(
        (state: AppState) => state.auth
    );

    return (
        <div className="courses-curriculum">
            {course?.topics?.map((topic) => {
                return (
                    <Fragment key={topic.id}>
                        <h3>{topic.title[langCode]}</h3>
                        <ul>
                            {topic.lectures?.map((lecture) => (
                                <li key={lecture.id}>
                                    <Link
                                        href={{
                                            pathname:
                                                PATH_NAMES.LectureCoursesIdFilled(
                                                    course.slug
                                                ),
                                            query: { active: lecture.id },
                                        }}
                                    >
                                        <a className="d-flex justify-content-between align-items-center">
                                            <span className="courses-name">
                                                {lecture.title[langCode]}
                                            </span>
                                            <div className="courses-meta">
                                                {collectionItemsCount <
                                                    course.requiredCollectionItems && (
                                                    <span className="status locked">
                                                        {' '}
                                                        <i className="flaticon-password"></i>
                                                    </span>
                                                )}
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                );
            })}
            {!course?.topics && <h3>{t('noLectures')}</h3>}
        </div>
    );
};

export default CoursesCurriculum;
