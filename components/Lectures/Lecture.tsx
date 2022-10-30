import { useSelector } from 'react-redux';
import { getActiveLecture, getUser } from '../../redux/selectors';
import PortableText from '../Common/CustomPortableText';
import Video from './Video';

function Lecture() {
    const lecture = useSelector(getActiveLecture);
    const { langCode } = useSelector(getUser);

    return lecture ? (
        <div className="container">
            <h2 className="font-weight-light py-3">
                {lecture.title[langCode]}{' '}
            </h2>
            <Video source={lecture.source} />
            <div className="p-4">
                <PortableText
                    content={lecture.overview ? lecture.overview[langCode] : ''}
                />
            </div>
            {/* <h3> Additional docs </h3>
			<div> File </div> */}
            {/* <hr /> */}
            {/* Currently bugged, but it isn't used often anyways. */}
            {/* <Navigation topics={topics} /> */}
        </div>
    ) : (
        <>Loading...</>
    );
}

export default Lecture;
