import NextImage from "next/image";

// Thanks to https://www.youtube.com/watch?v=P7i5YIJRJew
const Image = ({ src, alt, width, maxWidth, height, className, ...rest }) => {
	const additionalStyle = {};
	width ? additionalStyle["width"] = width : "100%";
	maxWidth ? additionalStyle["maxWidth"] = maxWidth : "100%";
	height ? additionalStyle["height"] = height : "100%";

	return (
		<div className="customImageContainer">
			<NextImage className={`image ${className}`} layout="fill" src={src} alt={alt} {...rest} />
		</div>
	)
}

export default Image;