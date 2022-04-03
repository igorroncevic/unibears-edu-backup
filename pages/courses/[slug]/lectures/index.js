import React, { useState, useEffect } from "react";
import Accordion from "@/components/Common/Accordion";
import Lecture from "@/components/Lectures/Lecture";
import { getCoursePaths, getCourseLectures } from "@/services/course.service";

function Lectures({ course }) {
  const [show, setShow] = useState(true);
  const [active, setActive] = useState();

  const showHandler = () => {
    setShow((prevState) => !prevState);
  };

  const onLectureClick = (lecture) => {
    setActive(lecture);
  };

  return (
    <>
      <div className="lectures-grid shadow min-vh-100 nomargin nopadding bg-light">
        <div className="accordion-grid-item min-w-400">
          <Accordion
            course={course}
            onLectureClick={(lecture) => onLectureClick(lecture)}
          />
        </div>
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
        {active && (
          <div className="lecture-grid-item">
            <Lecture lecture={active} />
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await getCoursePaths();

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true, // If page was not pre-rendered at build time, Next.js will generate that page.
  };
}

export async function getStaticProps({ params }) {
  const course = await getCourseLectures(params.slug);

  return { props: { course } };
}

export default Lectures;
