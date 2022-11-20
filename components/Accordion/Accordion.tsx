import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useLecture from '../../customHooks/useLecture';

import {
    Course,
    Lecture,
    lectureChange,
    Topic,
} from '../../redux/reducers/course.reducer';
import { getUser } from '../../redux/selectors';
import { PATH_NAMES } from '../../utils/routing';

interface AccordionProps {
    course: Course;
}

function AccordionComponent({ course }: AccordionProps) {
    const { langCode } = useSelector(getUser);
    const router = useRouter();
    const dispatch = useDispatch();

    const [topics, setTopics] = useState(course.topics);
    const [openTopics, setOpenTopics] = useState([]);
    const [activeLecture, setActiveLecture] = useState();

    const [{ topicIndex, lectureIndex }, setPreviousAndNextLecture] =
        useLecture(course);

    useEffect(() => {
        setTopics(course.topics);
    }, [course]);

    const handleActiveLecture = (activeTopicId: string, lecture: Lecture) => {
        if (lecture) {
            setActiveLecture(lecture);
            setOpenTopics([...openTopics, activeTopicId]);
            dispatch(lectureChange({ activeLecture: lecture }));
            router.push({
                pathname: PATH_NAMES.LectureCoursesIdFilled(course.slug),
                query: { active: lecture.id },
            });
        }
    };

    const handleTopicClick = (id: string) => {
        if (openTopics.includes(id)) {
            const topicsFiltered = openTopics.filter(
                (topicId: string) => topicId !== id
            );
            setOpenTopics(topicsFiltered);
        } else {
            setOpenTopics([...openTopics, id]);
        }
    };

    useEffect(() => {
        if (topics) {
            handleActiveLecture(
                topics[topicIndex].id,
                topics[topicIndex].lectures[lectureIndex]
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topicIndex, lectureIndex]);

    const getLectureClassname = (lecture: Lecture) => {
        return `lecture-name-duration d-flex justify-content-between ${
            (router.query.active || activeLecture?.id) === lecture.id
                ? 'active-lecture'
                : ''
        }`;
    };

    const onLectureClick = (
        lecture: Lecture,
        topicInd: number,
        lectureInd: number
    ) => {
        dispatch(lectureChange({ activeLecture: lecture }));
        setPreviousAndNextLecture(topicInd, lectureInd);
    };

    return (
        <div className="accordion-wrapper">
            {topics.length > 0 && activeLecture && (
                <Accordion defaultActiveKey={openTopics} alwaysOpen>
                    {topics.map((topic: Topic, topicInd: number) => (
                        <Accordion.Item eventKey={topic.id} key={topic.id}>
                            <Accordion.Header
                                onClick={() => handleTopicClick(topic.id)}
                            >
                                {topic.title[langCode]}
                            </Accordion.Header>
                            <Accordion.Body>
                                {topic.lectures.map((lecture, lectureInd) => {
                                    return (
                                        <Link
                                            key={lecture.id}
                                            href={{
                                                pathname:
                                                    PATH_NAMES.LectureCoursesIdFilled(
                                                        course.slug
                                                    ),
                                                query: { active: lecture.id },
                                            }}
                                            replace
                                        >
                                            <div
                                                className={getLectureClassname(
                                                    lecture
                                                )}
                                                onClick={() =>
                                                    onLectureClick(
                                                        lecture,
                                                        topicInd,
                                                        lectureInd
                                                    )
                                                }
                                            >
                                                <span>
                                                    {lecture.title[langCode]}
                                                </span>
                                                <span>{lecture.duration}</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
}

export default AccordionComponent;
