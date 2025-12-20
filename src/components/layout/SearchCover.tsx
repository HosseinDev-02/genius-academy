"use client";
import React from "react";
import Cover from "../shared/Cover";
import { useHeaderContext } from "./HeaderProvider";

export default function SearchCover() {
    const { searchModalShow } = useHeaderContext();
    const [open, setOpen] = searchModalShow;
    return (
        <Cover
            className={`hidden lg:block !bg-black/80 z-[40] ${
                open ? "visible opacity-100" : "invisible opacity-0"
            }`}
            setElemStatus={setOpen}
        />
    );
}
