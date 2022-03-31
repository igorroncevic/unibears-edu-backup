import React, { useState, useEffect } from "react";
import Accordion from "@/components/Common/Accordion";
import Lecture from "@/components/Lectures/Lecture";
import { PathNames } from "@/utils/routing";

function Lectures({ course }) {
  const [show, setShow] = useState(true);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [active, setActive] = useState({});

  const router = useRouter()

  useEffect(() => {
    const { active: id } = router.query;

    let activeLecture = {};
    let activeTopicIndex = 0;
    let found = false;
    // Iterate through topics
    if (course.topics && Array.isArray(course.topics)) {
      // ti - Topic Index
      for (let ti = 0; ti < course.topics.length; ti++) {
        // Iterate through lectures
        if (course.topics[ti].lectures && Array.isArray(course.topics[ti].lectures)) {
          activeLecture = course.topics[0].lectures[0]; // In case we don't find active lecture, save the first one here (because of checks)
          // li - Lecture Index
          for (let li = 0; li < course.topics[ti].lectures.length; li++) {
            let lecture = course.topics[ti].lectures[li];
            if (course.topics[ti].lectures[li].id == id) {
              activeLecture = lecture;
              activeTopicIndex = ti;
              found = true;
              break;
            }
          }
          // Finish iterating through lectures
        }
        if (found) break;
        // Finish iterating through topics
      }
    }

    // Setting values
    if (!found) {
      setActive(activeLecture);
      setActiveTopicIndex(0);
    } else {
      setActive(activeLecture);
      setActiveTopicIndex(activeTopicIndex);
    }
  }, [router, course])

  const showHandler = () => {
    setShow((prevState) => !prevState);
  };

  const onLectureClick = (lecture) => {
    setActive(lecture);
    // https://stackoverflow.com/a/64337902
    router.push(
      {
        pathname: PathNames.LecturesId,
        query: {
          slug: course.slug,
          active: active.id
        },
      }
        `${PathNames.LecturesIdFilled(course.slug)}?active=${active.id}`,
      { shallow: true }
    );
  }

  return (
    <>
      <div className="lectures-grid shadow min-vh-100 nomargin nopadding bg-light">
        {show && (
          <div className="accordion-grid-item min-w-400">
            <Accordion
              topics={course.topics}
              active={active}
              openTopicIndex={activeTopicIndex}
              onLectureClick={(lecture) => onLectureClick(lecture)}
            />
          </div>
        )}
        <div className="nopadding">
          <div style={{ transform: `rotate(${show ? "180deg" : "0deg"})` }}>
            <button
              onClick={showHandler}
              className="btn btn-light"
              type="button"
            >
              <i className="flaticon-right-chevron"></i>
            </button>
          </div>
        </div>
        <div className="lecture-grid-item">
          <Lecture lecture={active} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const course = await getCourseLectures(params.slug);

  return { props: { course } };
}

export default Lectures;
