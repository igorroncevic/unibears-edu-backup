import { PathNames } from "@/utils/routing";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";

function Accordionv({ course, onLectureClick }) {
  const [topics, setTopics] = useState(course.topics);
  const [openTopics, setOpenTopics] = useState([]);
  const [active, setActive] = useState();
  const router = useRouter();

  useEffect(() => {
    setTopics(course.topics);
  }, [course]);

  const handleActiveLecture = (activeTopic, lecture) => {
    console.log(lecture);
    if (lecture) {
      setActive(lecture);
      setOpenTopics([...openTopics, activeTopic]);
      onLectureClick(lecture);
    }
  };

  useEffect(() => {
    // if router.query.active does not exist, set first lecture from first topic as active
    if (router.isReady) {
      if (
        !router.query.active &&
        topics.length > 0 &&
        topics[0].lectures?.length > 0
      ) {
        handleActiveLecture(topics[0].id, topics[0].lectures[0]);
        return;
      }

      // read the router active value
      if (router.isReady && active?.id !== router.query.active) {
        let lecture;
        const topic = topics.find(
          (topic) =>
            (lecture = topic.lectures.find(
              (lecture) => lecture.id === router.query.active
            ))
        );
        handleActiveLecture(topic.id, lecture);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleTopicClick = (id) => {
    if (openTopics.includes(id)) {
      const topicsFiltered = openTopics.filter((topicId) => topicId !== id);
      setOpenTopics(topicsFiltered);
    } else {
      setOpenTopics([...openTopics, id]);
    }
  };

  const getLectureClassname = (lecture) => {
    return `lecture-name-duration d-flex justify-content-between
      ${router.query.active === lecture.id ? "active-lecture" : ""}`;
  };

  return (
    <div className="accordion-wrapper">
      {topics.length > 0 && active && (
        <Accordion defaultActiveKey={openTopics} alwaysOpen>
          {topics.map((topic) => (
            <Accordion.Item eventKey={topic.id} key={topic.id}>
              <Accordion.Header onClick={() => handleTopicClick(topic.id)}>
                {topic.title}
              </Accordion.Header>
              <Accordion.Body>
                {topic.lectures.map((lecture) => {
                  return (
                    <Link
                      key={lecture.id}
                      href={{
                        pathname: PathNames.LectureCoursesIdFilled(course.slug),
                        query: { active: lecture.id },
                      }}
                      replace
                    >
                      <a
                        className={getLectureClassname(lecture)}
                        onClick={() => onLectureClick(lecture)}
                      >
                        <span>{lecture.title}</span>
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

export default Accordionv;
