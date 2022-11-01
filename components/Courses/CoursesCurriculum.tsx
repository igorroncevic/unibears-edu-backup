import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuth, getUser } from '../../redux/selectors';
import { PATH_NAMES } from '../../utils/routing';
import { CourseProps } from './CourseCard';

function CoursesCurriculum({ course }: CourseProps) {
    const [t] = useTranslation('courses');
    const { langCode } = useSelector(getUser);
    const { collectionItemsCount } = useSelector(getAuth);

    return (
        <div className="courses-curriculum">
            {course?.topics?.map((topic) => {
                return (
                    <Fragment key={topic.id}>
                        <h3>{topic.title[langCode]}</h3>
                        <ul>
                            {topic.lectures?.map((lecture) => (
                                <li key={lecture.id}>
                                    <a
                                        href={PATH_NAMES.LectureCoursesIdFilled(
                                            course.slug
                                        )}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <span className="courses-name">
                                            {lecture.title[langCode]}
                                        </span>
                                        <div className="courses-meta">
                                            {collectionItemsCount <
                                                course.requiredCollectionItems && (
                                                <span className="status locked">
                                                    {' '}
                                                    <i className="flaticon-password" />
                                                </span>
                                            )}
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                );
            })}
            {!course?.topics && <h3>{t('noLectures')}</h3>}
        </div>
    );
}

export default CoursesCurriculum;
