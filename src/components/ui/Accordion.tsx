"use client";
import { LucideChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type TAccordionProps = {
    title: string;
    className?: string;
    classNameWrapper?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
};

export default function Accordion({
    title,
    className,
    classNameWrapper,
    children,
    icon,
}: TAccordionProps) {
    const [modalShow, setModalShow] = useState(false);

    const clickHandler = () => {
        setModalShow((prevState) => !prevState);
    };

    return (
        <div className={`py-2 ${classNameWrapper} relative`}>
            <button
                onClick={() => clickHandler()}
                type="button"
                className={`text-sm font-YekanBakh-SemiBold text-title transition-colors flex items-center justify-between bg-secondary rounded-xl overflow-hidden h-11 w-full px-3 min-w-[200px] ${
                    modalShow ? "!text-primary" : ""
                } ${className}`}
            >
                <div className="flex items-center gap-2">
                    {icon && (
                        icon
                    )}
                    <span>{title}</span>
                </div>
                <span>
                    <LucideChevronDown
                        size={20}
                        className={`w-5 h-5 transition-all ${
                            modalShow ? "rotate-180" : ""
                        }`}
                    />
                </span>
            </button>
            <div className={`${modalShow ? "block" : "hidden"}`}>
                {children}
            </div>
        </div>
    );
}
