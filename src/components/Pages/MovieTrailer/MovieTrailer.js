import React from "react";
import { useState, useEffect } from "react"
import YouTube from 'react-youtube';

const MovieTrailer = React.forwardRef((props, ref) => {
    const [key, setKey] = useState(null);

    useEffect(() => {
        props.trailerKey.length > 1 ?
            setKey(props.trailerKey[0]) :
            setKey(props.trailerKey.join(","));
    }, [props.trailerKey]);


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
                videoId={key}
                opts={opts}
                onReady={videoOnReady}
            />
        </article>
    )

});

export default MovieTrailer;