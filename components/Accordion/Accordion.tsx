import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    Course,
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

interface AccordionProps {
    course: Course;
}

function AccordionComponent({ course }: AccordionProps) {
    const { langCode } = useSelector((state: AppState) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const [topics, setTopics] = useState(course.topics);
    const [openTopics, setOpenTopics] = useState([]);
    const [activeLecture, setActiveLecture] = useState();

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

    useEffect(() => {
        if (router.isReady) {
            // if router.query.active does not exist, set first lecture from first topic as active
            if (
                !router.query.active &&
                topics.length > 0 &&
                topics[0].lectures?.length > 0
            ) {
                handleActiveLecture(topics[0].id, topics[0].lectures[0]);
                setPreviousAndNextLecture(0, 0);
            }

            // read the router active value
            if (activeLecture?.id !== router.query.active) {
                const { topicIndex, lectureIndex } = findTopicAndLectureIndex(
                    topics,
                    router.query.active
                );
                if (topicIndex && lectureIndex) {
                    handleActiveLecture(
                        topics[topicIndex].id,
                        topics[topicIndex].lectures[lectureIndex]
                    );

                    setPreviousAndNextLecture(topicIndex, lectureIndex);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

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

    const getLectureClassname = (lecture: Lecture) => {
        return `lecture-name-duration d-flex justify-content-between ${
            (router.query.active || activeLecture?.id) === lecture.id
                ? 'active-lecture'
                : ''
        }`;
    };

    const setPreviousAndNextLecture = (
        topicIndex: number,
        lectureIndex: number
    ) => {
        const data = setNextAndPreviousLecture(
            topics,
            topicIndex,
            lectureIndex
        );
        dispatch(updatePreviousAndNextLecture(data));
    };

    const onLectureClick = (
        lecture: Lecture,
        topicIndex: number,
        lectureIndex: number
    ) => {
        dispatch(lectureChange({ activeLecture: lecture }));
        setPreviousAndNextLecture(topicIndex, lectureIndex);
    };

    return (
        <div className="accordion-wrapper">
            {topics.length > 0 && activeLecture && (
                <Accordion defaultActiveKey={openTopics} alwaysOpen>
                    {topics.map((topic: Topic, topicIndex: number) => (
                        <Accordion.Item eventKey={topic.id} key={topic.id}>
                            <Accordion.Header
                                onClick={() => handleTopicClick(topic.id)}
                            >
                                {topic.title[langCode]}
                            </Accordion.Header>
                            <Accordion.Body>
                                {topic.lectures.map((lecture, lectureIndex) => {
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
                                            <a
                                                className={getLectureClassname(
                                                    lecture
                                                )}
                                                onClick={() =>
                                                    onLectureClick(
                                                        lecture,
                                                        topicIndex,
                                                        lectureIndex
                                                    )
                                                }
                                            >
                                                <span>
                                                    {lecture.title[langCode]}
                                                </span>
                                                <span>{lecture.duration}</span>
                                            </a>
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
