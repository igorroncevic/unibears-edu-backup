import { useState } from 'react';

import AccordionComponent from '../../../../components/Accordion/Accordion';
import { CourseProps } from '../../../../components/Courses/CourseCard';
import Lecture from '../../../../components/Lectures/Lecture';
import Head from '../../../../components/_App/CustomHead';
import Preloader from '../../../../components/_App/Preloader';
import useCourse from '../../../../customHooks/useCourse';
import {
    getCourseLectures,
    getCoursePaths,
} from '../../../../services/course.service';

export interface StaticParams {
    params: { slug: string };
}

function Lectures({ course }: CourseProps) {
    const [show, setShow] = useState(true);
    const [metadata] = useCourse(course);

    if (!course) {
        return <Preloader />;
    }

    return (
        <>
            <Head title={metadata.title} description={metadata.description} />
            <div className="lectures-grid shadow min-vh-100 nomargin pb-5 bg-light">
                {show && (
                    <div className="accordion-grid-item min-w-400">
                        <AccordionComponent course={course} />
                    </div>
                )}
                <div className="nopadding">
                    <div
                        style={{
                            transform: `rotate(${show ? '180deg' : '0deg'})`,
                        }}
                    >
                        <button
                            onClick={() =>
                                setShow((prevState: boolean) => !prevState)
                            }
                            className="btn btn-light"
                            type="button"
                        >
                            <i className="flaticon-right-chevron" />
                        </button>
                    </div>
                </div>
                <div className="lecture-grid-item">
                    <Lecture />
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const slugs = await getCoursePaths();
    const paths = slugs.map((slug: string) => ({
        params: { slug },
    }));

    return {
        paths,
        fallback: true, // If page was not pre-rendered at build time, Next.js will generate that page.
    };
}

export async function getStaticProps({ params }: StaticParams) {
    const course: any = await getCourseLectures(params.slug);
    const auth = {
        requiredCollectionItems: course.requiredCollectionItems,
    };

    return { props: { course, auth }, revalidate: 10 * 60 };
}

export default Lectures;
