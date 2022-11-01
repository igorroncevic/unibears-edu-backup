import { useSelector } from 'react-redux';
import { Author } from '../../redux/reducers/course.reducer';
import { getUser } from '../../redux/selectors';
import Image from '../Common/CustomImage';
import PortableText from '../Common/CustomPortableText';

interface AuthorProps {
    author: Author;
}

function Instructor({ author }: AuthorProps) {
    const { langCode } = useSelector(getUser);

    return (
        <div className="courses-instructor">
            <div className="single-advisor-box">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-4">
                        <div className="advisor-image">
                            <Image
                                src={`${
                                    author.profilePhoto
                                        ? author.profilePhoto
                                        : '/images/advisor/advisor2.jpg'
                                }`}
                                alt={author.name}
                            />
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-8">
                        <div className="advisor-content">
                            <h3>{author.name}</h3>
                            <span className="sub-title">
                                {author.title || ''}
                            </span>
                            <PortableText content={author.bio[langCode]} />

                            {/* <AuthorSocials/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructor;
