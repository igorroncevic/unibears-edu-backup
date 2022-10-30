import {
    PortableText as ReactPortableText,
    toPlainText,
} from '@portabletext/react';

interface PortableTextProps {
    content: any;
    plain?: string;
    shortenTo?: number;
}

const getLink = ({ children, value }: any) =>
    value.blank ? (
        <a
            className="external-link-underline"
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ) : (
        <a className="external-link-underline" href={value.href}>
            {children}
        </a>
    );

function PortableText({ content, plain, shortenTo }: PortableTextProps) {
    if (!content) {
        return null;
    }

    let contentFormatted = content;
    if (plain) {
        contentFormatted = toPlainText(content);
        if (shortenTo && shortenTo > 0 && shortenTo < contentFormatted.length) {
            contentFormatted = `${contentFormatted
                .slice(0, shortenTo)
                .trim()}...`;
        }
    }

    const serializers = {
        marks: {
            link: getLink,
        },
    };

    return (
        <ReactPortableText
            value={contentFormatted}
            components={serializers}
            /* Possibly add serializers */
        />
    );
}

export default PortableText;
