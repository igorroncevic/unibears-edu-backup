import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Course } from '../../redux/reducers/course.reducer';
import { getUser } from '../../redux/selectors';
import { displayCategories } from '../../services/category.service';
import { PATH_NAMES } from '../../utils/routing';
import Image from '../Common/CustomImage';
import PortableText from '../Common/CustomPortableText';

export interface CourseProps {
    course: Course;
}

function CourseCard({ course }: CourseProps) {
    const [t] = useTranslation('courses');
    const { langCode } = useSelector(getUser);

    return (
        <div className="col-lg-6 col-md-12">
            <div className="single-courses-box">
                <div className="courses-image">
                    <Link
                        href={PATH_NAMES.CoursesId}
                        as={PATH_NAMES.CoursesIdFilled(course.slug)}
                        className="d-block image"
                    >
                        <Image
                            src={course.thumbnail ? course.thumbnail : ''}
                            alt={course.title[langCode]}
                        />
                    </Link>
                </div>
                <div className="courses-content">
                    <div className="course-author d-flex align-items-center">
                        {/* TODO: Add default user image. */}
                        <Image
                            src={
                                course.author && course.author.profilePhoto
                                    ? course.author.profilePhoto
                                    : '/images/user1.jpg'
                            }
                            className="rounded-circle"
                            alt={
                                course.author && course.author.name
                                    ? course.author.name
                                    : 'Author Profile Picture'
                            }
                        />
                        <span className="course-author-name">
                            {course.author.name}
                        </span>
                    </div>

                    <h3>
                        <Link
                            href={PATH_NAMES.CoursesId}
                            as={PATH_NAMES.CoursesIdFilled(course.slug)}
                        >
                            {course.title[langCode]}
                        </Link>
                    </h3>
                    <PortableText
                        content={
                            course.overview ? course.overview[langCode] : ''
                        }
                    />
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                        <li>
                            {/* TODO: Add appropriate icon */}
                            <i className="flaticon-agenda" />{' '}
                            {course.categories
                                ? displayCategories(course.categories, langCode)
                                : ''}
                        </li>
                        <li>
                            {/* TODO: Add some more data to make design look nicer */}
                            <i className="flaticon-web" />{' '}
                            {t('requiredCollectionItems')}:{' '}
                            {course.requiredCollectionItems}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
