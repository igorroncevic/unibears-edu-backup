/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PageBanner from '../../components/Common/PageBanner';
import CourseCard from '../../components/Courses/CourseCard';
import { Category, Course } from '../../redux/reducers/course.reducer';
import { getUser } from '../../redux/selectors';
import {
    findAllCategories,
    getAllCategoryFilter,
} from '../../services/category.service';
import { findAllCourses } from '../../services/course.service';

interface IndexProps {
    courses: Course[];
    allCategories: Category[];
}

function Index({ courses, allCategories }: IndexProps) {
    const [t] = useTranslation('courses');
    const { langCode } = useSelector(getUser);
    const [displayCourses, setDisplayCourses] = useState(courses);
    const allCategory = t('all');

    const [categories, setCategories] = useState(
        getAllCategoryFilter(allCategories, allCategory, langCode)
    );
    const [categoryFilter, setCategoryFilter] = useState(allCategory);

    const filterCourses = (chosen: string) =>
        courses.filter((course: Course) =>
            course.categories.some(
                (category: Category) => category.name[langCode] === chosen
            )
        );

    useEffect(() => {
        setCategories(
            getAllCategoryFilter(allCategories, allCategory, langCode)
        );
        setCategoryFilter(allCategory);
    }, [allCategories, allCategory, langCode]);

    const handleCategorySelect = (category: string) => {
        setCategoryFilter(category);

        if (category === allCategory) {
            setDisplayCourses(courses);
        } else {
            setDisplayCourses(filterCourses(category));
        }
    };

    return (
        <>
            <PageBanner pageTitle={t('coursesTitle')} />
            <div className="courses-area courses-section pt-100 pb-70">
                <div className="container">
                    <div className="learning-platform-grid-sorting row align-items-center">
                        <div className="col-lg-8 col-md-6 result-count">
                            <p>
                                {t('weFound')}{' '}
                                <span className="count">
                                    {displayCourses && displayCourses.length
                                        ? displayCourses.length
                                        : 0}
                                </span>{' '}
                                {t('coursesAvailableForYou')}.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-6 categories-filter">
                            <span>{t('categories')}</span>
                            <Dropdown
                                className="dropdown-button-custom"
                                onSelect={handleCategorySelect}
                            >
                                <Dropdown.Toggle>
                                    {categoryFilter}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {categories.map((category: Category) => (
                                        <Dropdown.Item
                                            key={category}
                                            eventKey={category}
                                        >
                                            {category}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="row">
                        {displayCourses.length ? (
                            displayCourses.map((course: Course) => (
                                <CourseCard course={course} key={course.id} />
                            ))
                        ) : (
                            <h1>{t('notFound')}</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const courses = await findAllCourses();
    const allCategories = await findAllCategories();

    return {
        props: { courses, allCategories },
        revalidate: 10 * 60, // Regenerate page every 10 minutes, since it won't update that often.
    };
}

export default Index;
