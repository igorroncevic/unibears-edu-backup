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

const getFormattedContent = ({
    content,
    plain,
    shortenTo,
}: PortableTextProps) => {
    let contentFormatted = content;
    if (plain) {
        contentFormatted = toPlainText(content);
        if (shortenTo && shortenTo > 0 && shortenTo < contentFormatted.length) {
            contentFormatted = `${contentFormatted
                .slice(0, shortenTo)
                .trim()}...`;
        }
    }
    return contentFormatted;
};

function PortableText({ content, plain, shortenTo }: PortableTextProps) {
    if (!content) {
        return null;
    }

    const formattedContent = getFormattedContent({ content, plain, shortenTo });
    const serializers = {
        marks: {
            link: getLink,
        },
    };

    return (
        <ReactPortableText
            value={formattedContent}
            components={serializers}
            /* Possibly add serializers */
        />
    );
}

export default PortableText;
