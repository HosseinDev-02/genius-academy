'use client';
import React from "react";
import EducationIcon from "../../icon/EducationIcon";
import { LucideFileText } from "lucide-react";

type UserCoursesMenuProps = {
    type: string,
    setType: React.Dispatch<React.SetStateAction<string>>
}

export default function UserCoursesMenu({ type, setType }: UserCoursesMenuProps) {
    const typeChangeHandler = () => {
        setType((prevState) => {
            if (prevState === "inProgress") {
                return "completed";
            } else {
                return "inProgress";
            }
        });
    };
    return (
        <div className="overflow-x-auto">
            <ul className="bg-secondary rounded-full inline-flex items-center gap-5 border border-border p-1 mt-5">
                <li>
                    <button
                        onClick={typeChangeHandler}
                        className={`flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors cursor-pointer ${
                            type === "inProgress" && "text-title bg-background"
                        }`}
                    >
                        <EducationIcon width={20} height={20} />
                        <span className="text-sm font-YekanBakh-Bold text-nowrap">
                            در حال برگزاری
                        </span>
                    </button>
                </li>
                <li>
                    <button
                        onClick={typeChangeHandler}
                        className={`flex items-center gap-2 h-10 rounded-full px-5 hover:bg-background hover:text-title transition-colors cursor-pointer ${
                            type === "completed" && "text-title bg-background"
                        }`}
                    >
                        <LucideFileText size={20} />
                        <span className="text-sm font-YekanBakh-Bold text-nowrap">
                            تکمیل شده
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    );
}
