import { Icon } from "@/src/lib/definition";
import React from "react";

function TelegramIcon({ width, height, color, className }: Icon) {
    return (
        <svg
            id="telegram"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color ?? "currentColor"}
            className={className}
            width={width}
            height={height}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
        </svg>
    );
}

export default TelegramIcon;
