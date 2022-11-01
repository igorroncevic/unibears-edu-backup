interface VideoProps {
    source: string;
}

function Video({ source }: VideoProps) {
    return (
        <div className="embed-container">
            <iframe
                title="lecture"
                src={source}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
            />
        </div>
    );
}

export default Video;
