import NextImage from 'next/image';

// Thanks to https://www.youtube.com/watch?v=P7i5YIJRJew
const Image = ({ src, alt, width, maxWidth, className, ...rest }) => {
    let widths = {};
    width ? widths["width"] = width : "100%";
    maxWidth ? widths["maxWidth"] = maxWidth : "100%";

    return (
        <div className="customImageContainer">
            <NextImage className={`image ${className}`} layout="fill" src={src} alt={alt} {...rest} />
        </div>
    )
}

export default Image;