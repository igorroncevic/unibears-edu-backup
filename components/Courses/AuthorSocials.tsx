interface AuthorSocialURLs {
    fb_url: string;
    tw_url: string;
    insta_url: string;
    in_url: string;
}

interface AuthorProps {
    author: AuthorSocialURLs;
}

function AuthorSocials({ author }: AuthorProps) {
    return (
        <ul className="social-link">
            <li>
                <a
                    href={author.fb_url || '#'}
                    className="d-block"
                    rel="noreferrer"
                    target="_blank"
                >
                    <i className="bx bxl-facebook" />
                </a>
            </li>
            <li>
                <a
                    href={author.tw_url || '#'}
                    className="d-block"
                    rel="noreferrer"
                    target="_blank"
                >
                    <i className="bx bxl-twitter" />
                </a>
            </li>
            <li>
                <a
                    href={author.insta_url || '#'}
                    className="d-block"
                    rel="noreferrer"
                    target="_blank"
                >
                    <i className="bx bxl-instagram" />
                </a>
            </li>
            <li>
                <a
                    href={author.in_url || '#'}
                    className="d-block"
                    rel="noreferrer"
                    target="_blank"
                >
                    <i className="bx bxl-linkedin" />
                </a>
            </li>
        </ul>
    );
}

export default AuthorSocials;
