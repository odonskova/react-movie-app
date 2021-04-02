import React from "react";
import YouTube from 'react-youtube';

const MovieTrailer = React.forwardRef((props, ref) => {
    const trailerKey = props.trailerKey.length > 1 ?
        props.trailerKey[0] :
        props.trailerKey.join(",");

    const videoOnReady = event => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    //https://developers.google.com/youtube/player_parameters
    const opts = {
        height: '600',
        width: '1000',
    };
    return (
        <article
            className="d-flex justify-content-center mt-3"
            ref={ref}
        >
            <YouTube
                videoId={trailerKey}
                opts={opts}
                onReady={videoOnReady}
            />
        </article>
    )

});

export default MovieTrailer;