import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
    Course,
    updatePreviousAndNextLecture,
} from '../redux/reducers/course.reducer';
import { getActiveLecture } from '../redux/selectors';
import {
    findTopicAndLectureIndex,
    setNextAndPreviousLecture,
} from '../utils/common';

function useLecture(course: Course) {
    const lecture = useSelector(getActiveLecture);
    const [lectureIndexes, setLectureIndexes] = useState({
        topicIndex: 0,
        lectureIndex: 0,
    });
    const { topics } = course;

    const router = useRouter();
    const dispatch = useDispatch();

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

    useEffect(() => {
        let topicInd = 0;
        let lectureInd = 0;
        if (router.isReady) {
            // read the router active value
            if (lecture?.id !== router.query.active) {
                const { topicIndex, lectureIndex } = findTopicAndLectureIndex(
                    topics,
                    router.query.active
                );
                if (topicIndex && lectureIndex) {
                    topicInd = topicIndex;
                    lectureInd = lectureIndex;
                }
            }
            setLectureIndexes({
                topicIndex: topicInd,
                lectureIndex: lectureInd,
            });

            setPreviousAndNextLecture(topicInd, lectureInd);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    return [lectureIndexes, setPreviousAndNextLecture];
}

export default useLecture;
