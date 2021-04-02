import React from "react";
import {Media} from "reactstrap";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

const Rate = ({vote_average, getPercentageColor}) => {
    return (
        <Media className="ml-3">
            <div style={{ width: 60, height: 60}}
                 className="view overlay zoom d-flex">
                <CircularProgressbar
                    value={vote_average}
                    maxValue={10}
                    text={`${vote_average * 10}%`}
                    styles={buildStyles({
                        textSize: '28px',
                        pathColor: `${getPercentageColor()}`,
                        textColor: '#ffffff',
                    })}
                />
            </div>
        </Media>
    )
};

export default Rate