import ReactPortableText from "react-portable-text";
import { blockContentToPlainText } from "react-portable-text";

const PortableText = ({ content, plain, shortenTo }) => {
    let contentFormatted = content;
    if (plain) {
        contentFormatted = blockContentToPlainText(content);
        if (shortenTo > 0 && shortenTo < contentFormatted.length) {
            contentFormatted = contentFormatted.slice(0, shortenTo).trim() + "...";
        }
    }

    return (
        <ReactPortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={contentFormatted}
        /* Possibly add serializers */
        />
    )
}

export default PortableText;