import NextImage from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const defaultStyles = {
    width: '100%',
    maxWidth: '100%',
    height: '100%',
};

// Thanks to https://www.youtube.com/watch?v=P7i5YIJRJew
function Image({ src, alt, className = '', ...rest }: ImageProps) {
    return (
        <div className="customImageContainer">
            <NextImage
                className={`image ${className}`}
                layout="fill"
                src={src}
                alt={alt}
                {...defaultStyles}
                {...rest}
            />
        </div>
    );
}

export default Image;
