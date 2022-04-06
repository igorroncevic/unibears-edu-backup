import React from "react";

const AuthorSocials = ({ author }) => {
	return (
		<ul className="social-link">
			<li>
				<a href={author.fb_url || "#"} className="d-block" rel='noreferrer' target="_blank">
					<i className='bx bxl-facebook'></i>
				</a>
			</li>
			<li>
				<a href={author.tw_url || "#"} className="d-block" rel='noreferrer' target="_blank">
					<i className='bx bxl-twitter'></i>
				</a>
			</li>
			<li>
				<a href={author.insta_url || "#"} className="d-block" rel='noreferrer' target="_blank">
					<i className='bx bxl-instagram'></i>
				</a>
			</li>
			<li>
				<a href={author.in_url || "#"} className="d-block" rel='noreferrer' target="_blank">
					<i className='bx bxl-linkedin'></i>
				</a>
			</li>
		</ul>
	)
}

export default AuthorSocials;
