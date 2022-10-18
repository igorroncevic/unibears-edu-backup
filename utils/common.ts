import { Lecture, Topic } from "../redux/reducers/course.reducer";

export const findTopicAndLectureIndex = (
	topics: Topic[],
	lectureId: string | string[] | undefined
) => {
	let topicIndex, lectureIndex;
	topics.find((topic, topicInd) => {
		topicIndex = topicInd;
		return topic.lectures.find((lecture, lectureInd) => {
			lectureIndex = lectureInd;
			return lecture.id === lectureId;
		});
	});

	return { topicIndex, lectureIndex };
};

export const setNextAndPreviousLecture = (
	topics: Topic[],
	topicIndex: number,
	lectureIndex: number
) => {
	let previousTopic, previousLecture, nextTopic, nextLecture;

	// current one
	let chosenTopic = topics[topicIndex];

	// check if lecture before exists
	if (chosenTopic.lectures[lectureIndex - 1]) {
		previousLecture = chosenTopic.lectures[lectureIndex - 1];
	}
	//check if lecture after exists
	if (chosenTopic.lectures[lectureIndex + 1]) {
		nextLecture = chosenTopic.lectures[lectureIndex + 1];
	}

	// one topic before
	chosenTopic = topics[topicIndex - 1];
	// get the last lecture
	if (!previousTopic && !previousLecture && chosenTopic) {
		previousLecture = chosenTopic.lectures[chosenTopic.lectures.length - 1];
	}

	// one topic after
	chosenTopic = topics[topicIndex + 1];
	// get the first lecture
	if (
		!nextTopic &&
		!nextLecture &&
		chosenTopic &&
		chosenTopic.lectures.length > 0
	) {
		nextLecture = chosenTopic.lectures[0];
	}

	return {
		previous: previousLecture,
		next: nextLecture,
	};
};
