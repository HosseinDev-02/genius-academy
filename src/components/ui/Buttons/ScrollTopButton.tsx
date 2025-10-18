"use client";
import React from "react";
import SectionLinkBtn from "../section/SectionLinkBtn";
import { LucideChevronUp } from "lucide-react";

export default function ScrollTopButton() {
    const topScrollHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <div className="flex items-center gap-3">
            <div className="h-px w-full border-t border-dashed border-border"></div>
            <SectionLinkBtn
                text="برگشت به بالا"
                icon={<LucideChevronUp size={20} />}
                clickEvent={topScrollHandler}
            ></SectionLinkBtn>
        </div>
    );
}
