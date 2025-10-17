import { Icon } from "@/src/lib/definition";
import React from "react";

function ClockIcon(props: Icon) {
    return (
        <svg
            id="clock"
            width={props.width}
            height={props.height}
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={props.color ?? "currentColor"}
        >
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default ClockIcon;
