import { PathNames } from "@/utils/routing";
import Link from "next/link";
import React from "react";

function Accordion({ data, active, onLectureClick }) {
  return (
    <div className="accordion-wrapper">
      <h3 className="topic">
        <i className="flaticon-webinar"></i> Topics list
      </h3>
      <div className="lectures-container nopadding">
        <div className="row nomargin">
          <div className="col nopadding">
            <div className="accordion shadow">
              {data.map((d, index) => {
                return (
                  <div
                    className="accordion-item"
                    key={"accordition-item-" + index}
                  >
                    <h2 className="accordion-header" id={"heading-" + index}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse-" + index}
                        aria-expanded={index === 0 ? true : false}
                        aria-controls={"collapse-" + index}
                      >
                        {d.topic}
                      </button>
                    </h2>
                    <div
                      id={"collapse-" + index}
                      className={`accordion-collapse collapse ${
                        index === 0 ? "show" : ""
                      }`}
                      aria-labelledby={"heading-" + index}
                    >
                      <div className="accordion-body">
                        {d.lectures.map((lecture, ind) => {
                          return (
                            <Link
                              key={"content-" + ind}
                              href={PathNames.LecturesId}
                              as={PathNames.LecturesIdFilled("1", lecture.id)}
                            >
                              <a
                                className={`lecture-name-duration d-flex justify-content-between ${
                                  active.id == lecture.id
                                    ? "active-lecture"
                                    : ""
                                }`}
                                onClick={() => onLectureClick(lecture)}
                              >
                                <span>{lecture.name}</span>
                                <span>{lecture.duration}</span>
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
