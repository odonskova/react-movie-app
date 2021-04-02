import React, {useState} from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import {Tooltip} from "reactstrap";

const Buttons = (props) => {
    const {
        buttonStyle,
        buttonId,
        buttonSvg,
        buttonSvgPath,
        buttonText,
        tooltipText,
        user,
        scrollToMoviePlayer} = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        setTooltipOpen(!tooltipOpen)
    };
    return (
        <>
            <button type="button"
                    className={`btn btn-outline-${buttonStyle ? buttonStyle : "warning"} mr-3`}
                    id={buttonId}
                    onClick={scrollToMoviePlayer ? scrollToMoviePlayer : null}
            >
                {buttonId ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className={`bi bi-${buttonSvg}-fill mr-1 mb-1`} viewBox="0 0 16 16">
                        <path
                            d={buttonSvgPath}/>
                    </svg> : null
                }

                {buttonText}
            </button>
            { buttonId ?
                !user ?
                    <Tooltip placement="bottom" isOpen={tooltipOpen} target={buttonId} toggle={toggle}>
                        {tooltipText}
                    </Tooltip> :
                    null :
                null
            }
        </>

    )
};

export default AppContextHOC(Buttons)