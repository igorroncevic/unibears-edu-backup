import {
    PortableText as ReactPortableText,
    toPlainText,
} from '@portabletext/react';

interface PortableTextProps {
    content: any;
    plain?: string;
    shortenTo?: number;
}

const PortableText = ({ content, plain, shortenTo }: PortableTextProps) => {
    if (!content) {
        return <></>;
    }

    let contentFormatted = content;
    if (plain) {
        contentFormatted = toPlainText(content);
        if (shortenTo && shortenTo > 0 && shortenTo < contentFormatted.length) {
            contentFormatted =
                contentFormatted.slice(0, shortenTo).trim() + '...';
        }
    }

    const serializers = {
        marks: {
            link: ({ children, value }: any) =>
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
                ),
        },
    };

    return (
        <ReactPortableText
            // dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            // projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            value={contentFormatted}
            components={serializers}
            /* Possibly add serializers */
        />
    );
};

export default PortableText;
