import NextImage from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

interface ImageSizes {
    width?: string;
    maxWidth?: string;
    height?: string;
}

const defaultStyles = {
    width: '100%',
    maxWidth: '100%',
    height: '100%',
};

const getStyleProps = ({ width, height, maxWidth }: ImageSizes) => {
    const size = { ...defaultStyles };
    if (width) {
        size.width = width;
    }
    if (maxWidth) {
        size.maxWidth = maxWidth;
    }
    if (height) {
        size.height = height;
    }
    return size;
};

// Thanks to https://www.youtube.com/watch?v=P7i5YIJRJew
function Image({
    src,
    alt,
    className = '',
    width,
    height,
    maxWidth,
    ...rest
}: ImageProps & ImageSizes) {
    const style = getStyleProps({ width, height, maxWidth });
    return (
        <div className="customImageContainer" style={style}>
            <NextImage
                className={`image ${className}`}
                layout="fill"
                src={src}
                alt={alt}
                {...rest}
            />
        </div>
    );
}

export default Image;
