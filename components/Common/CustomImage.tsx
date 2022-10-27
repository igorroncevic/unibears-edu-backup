import NextImage from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    width?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    className?: number | string;
}

// Thanks to https://www.youtube.com/watch?v=P7i5YIJRJew
const Image = ({
    src,
    alt,
    width,
    maxWidth,
    height,
    className,
    ...rest
}: ImageProps) => {
    const additionalStyle: any = {};
    width ? (additionalStyle['width'] = width) : '100%';
    maxWidth ? (additionalStyle['maxWidth'] = maxWidth) : '100%';
    height ? (additionalStyle['height'] = height) : '100%';

    return (
        <div className="customImageContainer">
            <NextImage
                className={`image ${className ? className : ''}`}
                layout="fill"
                src={src}
                alt={alt}
                {...rest}
                {...additionalStyle}
            />
        </div>
    );
};

export default Image;
