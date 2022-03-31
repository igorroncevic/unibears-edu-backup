import React, { useState } from "react";

function Accordion({ topics, active, openTopicIndex, onLectureClick }) {
  const [openTopics, setOpenTopics] = useState([openTopicIndex]);

  useEffect(() => {
    handleTopicClick(openTopicIndex);
  }, [openTopicIndex])

  const handleTopicClick = (index) => {
    if (openTopics.includes(index)) {
      const topicsFiltered = openTopics.filter(topicIndex => topicIndex != index);
      setOpenTopics(topicsFiltered);
    } else {
      setOpenTopics([...openTopics, index])
    }
  }

  return (
    <div className="accordion-wrapper">
      <h3 className="topic">
        <i className="flaticon-webinar"></i> Topics list
      </h3>
      <div className="lectures-container nopadding">
        <div className="row nomargin">
          <div className="col nopadding">
            <div className="accordion shadow">
              {topics.map((topic, topicInd) => {
                return (
                  <div
                    className="accordion-item"
                    key={"accordition-item-" + topicInd}
                  >
                    <h2 className="accordion-header" id={"heading-" + topicInd}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse-" + topicInd}
                        aria-expanded={openTopics.includes(topicInd) ? true : false}
                        aria-controls={"collapse-" + topicInd}
                        onClick={(topicInd) => handleTopicClick(topicInd)}
                      >
                        {topic.title}
                      </button>
                    </h2>
                    <div
                      id={"collapse-" + topicInd}
                      className={`accordion-collapse collapse ${openTopics.includes(topicInd) ? "show" : ""}`}
                      aria-labelledby={"heading-" + topicInd}
                    >
                      <div className="accordion-body">
                        {topic.lectures.map((lecture, lecInd) => {
                          return (
                            <a key={lecInd}
                              className={`lecture-name-duration d-flex justify-content-between 
                              ${active.id == lecture.id ? "active-lecture" : ""}`}
                              onClick={() => onLectureClick(lecture)}
                            >
                              <span>{lecture.name}</span>
                              <span>{lecture.duration}</span>
                            </a>
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
    </div >
  );
}

export default Accordion;
