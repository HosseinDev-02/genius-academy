"use client";
import React, { ComponentType, JSX, SVGProps, useEffect } from "react";
import CommentsIcon from "../icon/CommentsIcon";
import { LucideList, LucidePencil } from "lucide-react";
import useActiveSection from "@/src/hooks/useActiveSection";
import { scrollToSection } from "@/src/utils";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const menuItems = [
    {
        id: 1,
        title: "معرفی",
        sectionTag: "intro",
    },
    {
        id: 2,
        title: "سرفصل ها",
        sectionTag: "sections",
    },
    {
        id: 3,
        title: "دیدگاه و پرسش",
        sectionTag: "comments",
    },
];

const sectionTags = ["intro", "sections", "comments"];

export default function CourseDetailMenu() {
    const activeSection = useActiveSection(sectionTags);

    const iconsMap: Record<string, JSX.Element> = {
        intro: <LucidePencil size={20} />,
        sections: <LucideList size={20} />,
        comments: <CommentsIcon width={20} height={20} />,
    };

    return (
        <div className="block md:inline-block bg-secondary border border-border rounded-3xl mt-10 p-1 z-10 sticky top-24 overflow-auto">
            <ul className="inline-flex items-center gap-2">
                {menuItems.map((item) => {
                    const Icon = iconsMap[item.title];
                    return (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.sectionTag)}
                                className={`flex items-center gap-2 text-sm font-YekanBakh-SemiBold px-4 py-2 rounded-3xl ${
                                    activeSection === item.sectionTag &&
                                    "text-title bg-background"
                                }`}
                            >
                                {Icon}
                                <span className="text-nowrap">
                                    {item.title}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
