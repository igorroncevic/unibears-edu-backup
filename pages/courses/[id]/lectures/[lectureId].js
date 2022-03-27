import Accordion from "@/components/Common/Accordion";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Lecture from "@/components/Lectures/Lecture";
import React, { useEffect, useState } from "react";

const data = [
  {
    topic: "Topic 1",
    lectures: [
      {
        id: "1",
        name: "Lecture 1",
        description: "Description 1",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:31",
      },
      {
        id: "2",
        name: "Lecture 2",
        description: "Description 2",
        source: "https://player.vimeo.com/video/226053498?h=a1599a8ee9b",
        duration: "55:32",
      },
      {
        id: "3",
        name: "Lecture 3",
        description: "Description 3",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:33",
      },
      {
        id: "4",
        name: "Lecture 4",
        description: "Description 4",
        source: "https://player.vimeo.com/video/226053498?h=a1599a8ee9",
        duration: "55:34",
      },
      {
        id: "5",
        name: "Lecture 5",
        description: "Description 5",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:35",
      },
    ],
  },
  {
    topic: "Topic 2",
    lectures: [
      {
        id: "6",
        name: "Lecture 6",
        description: "Description 6",
        source: "https://player.vimeo.com/video/226053498?h=a1599a8ee9",
        duration: "55:36",
      },
      {
        id: "7",
        name: "Lecture 7",
        description: "Description 7",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:37",
      },
      {
        id: "8",
        name: "Lecture 8",
        description: "Description 8",
        source: "https://player.vimeo.com/video/226053498?h=a1599a8ee9",
        duration: "55:38",
      },
      {
        id: "9",
        name: "Lecture 9",
        description: "Description 9",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:39",
      },
      {
        id: "10",
        name: "Lecture 10",
        description: "Description 10",
        source: "https://player.vimeo.com/video/226053498?h=a1599a8ee9",
        duration: "55:40",
      },
    ],
  },
  {
    topic: "Topic 3",
    lectures: [
      {
        id: "11",
        name: "Lecture 11",
        description: "Description 11",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:41",
      },
      {
        id: "12",
        name: "Lecture 12",
        description: "Description 12",
        source: "https://player.vimeo.com/video/226053498?h=a1599a8ee9",
        duration: "55:42",
      },
      {
        id: "13",
        name: "Lecture 13",
        description: "Description 13",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:43",
      },
      {
        id: "14",
        name: "Lecture 14",
        description: "Description 14",
        source: "https://player.vimeo.com/video/226053498?h=a1599a8ee9",
        duration: "55:44",
      },
      {
        id: "15",
        name: "Lecture 15",
        description: "Description 15",
        source: "https://player.vimeo.com/video/56282283?h=ac171d413b",
        duration: "55:45",
      },
    ],
  },
];

const paths = [
  { name: "Home", link: "/home" },
  { name: "Courses", link: "/courses" },
  { name: "Lectures", link: "/lectures", active: true },
];

function Lectures() {
  const [show, setShow] = useState(true);
  const [active, setActive] = useState(data[0].lectures[0]);

  const showHandler = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <>
      <Breadcrumb paths={paths} />
      <div className="lectures-grid shadow min-vh-100 nomargin nopadding bg-light">
        {show && (
          <div className="accordion-grid-item min-w-400">
            <Accordion
              data={data}
              active={active}
              onLectureClick={(lecture) => setActive(lecture)}
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

// export async function getStaticPaths() {
//   const lectures = data.map((topic) => topic.lectures).flat();
//   console.log(lectures);
//   const paths = lectures.map((lecture) => ({
//     params: { id: "1", lectureId: lecture.id },
//   }));

//   return {
//     paths,
//     fallback: true, // If page was not pre-rendered at build time, Next.js will generate that page.
//   };
// }

// export async function getStaticProps({ params }) {
//   // console.log(params);
//   const { lectureId } = params;
//   // console.log(lectureId);
//   const lecture = data.map((topic) =>
//     topic.lectures.filter((lecture) => lecture.id === lectureId).flat()
//   );
//   return { props: { lecture } };
// }

export default Lectures;
