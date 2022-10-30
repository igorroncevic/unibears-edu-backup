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
    allCategoriesFilterTranslated,
    categoriesFilterTranslated,
    findAllCategories,
} from '../../services/category.service';
import { findAllCourses } from '../../services/course.service';

interface IndexProps {
    courses: Course[];
    categories: Category[];
}

function Index({ courses, categories }: IndexProps) {
    const [t] = useTranslation('courses');
    const { langCode } = useSelector(getUser);
    const [displayCourses, setDisplayCourses] = useState(courses);

    const [allCategories, setAllCategories] = useState([
        t('all'),
        ...categoriesFilterTranslated(categories, langCode),
    ]);
    const [categoryFilter, setCategoryFilter] = useState(t('all'));

    useEffect(() => {
        const allCategoriesFilterTemp = allCategoriesFilterTranslated(langCode);

        const allCategoriesTemp = [
            allCategoriesFilterTemp,
            ...categoriesFilterTranslated(categories, langCode),
        ];

        setAllCategories([...allCategoriesTemp]);
        setCategoryFilter(allCategoriesFilterTemp);
    }, [categories, langCode]);

    const filterCourses = () =>
        courses.filter((course: Course) =>
            course.categories.some(
                (category: Category) =>
                    category.name[langCode] === categoryFilter
            )
        );

    useEffect(() => {
        switch (categoryFilter) {
            case allCategoriesFilterTranslated(langCode):
                setDisplayCourses(courses);
                break;
            default:
                setDisplayCourses(filterCourses());
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [langCode, categoryFilter]);

    const handleCategorySelect = (e: any) => {
        setCategoryFilter(e);
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
                                    {allCategories.map((category: Category) => (
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
    const categories = await findAllCategories();

    return {
        props: { courses, categories },
        revalidate: 10 * 60, // Regenerate page every 10 minutes, since it won't update that often.
    };
}

export default Index;
