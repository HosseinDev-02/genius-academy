"use client";

import { SetStateAction } from "react";

type CoverType = {
    setElemStatus: React.Dispatch<SetStateAction<boolean>>,
    className: string
}
export default function Cover({ setElemStatus, className }: CoverType) {
    const coverShowHandler = () => {
        setElemStatus((prevState) => !prevState);
    };

    return (
        <div
            onClick={coverShowHandler}
            className={`fixed inset-0 bg-secondary/80 z-40 transition-all ${className}`}
        ></div>
    );
}
