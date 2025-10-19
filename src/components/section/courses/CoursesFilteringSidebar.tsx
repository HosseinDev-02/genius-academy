import React, { useState } from "react";
import Accordion from "../../ui/Accordion";
import { LucideStar, LucideX } from "lucide-react";
import { courseCategories, courseTypes } from "@/src/lib/placeholder-data";
import GridBoxesOutlineIcon from "../../icon/GridBoxesOutlineIcon";
import Cover from "../../shared/Cover";

type TSidebarProps = {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CoursesFilteringSidebar({
    showSidebar,
    setShowSidebar,
}: TSidebarProps) {
    return (
        <>
            <div
                className={`fixed h-screen top-0 bg-background rounded-tl-xl rounded-bl-xl w-72 z-[100] p-4 md:rounded-none md:w-auto md:h-auto md:p-0 md:block col-span-4 lg:col-span-3 md:sticky md:top-24 transition-all ${
                    showSidebar ? "right-0" : "-right-72"
                }`}
            >
                {/*  Courses Filtering Mobile Header  */}
                <div className="flex md:hidden items-center justify-between mb-8 text-title">
                    <span className="font-YekanBakh-Bold text-sm">
                        فیلتر دوره ها
                    </span>
                    <span
                        onClick={() =>
                            setShowSidebar((prevState) => !prevState)
                        }
                    >
                        <LucideX size={24} />
                    </span>
                </div>
                {/*  Courses Search Box  */}
                <div className="mb-3">
                    <span className="text-sm text-title font-YekanBakh-Bold inline-block mb-3">
                        جستجو دوره
                    </span>
                    <form
                        className="flex items-center px-3 bg-secondary rounded-xl overflow-hidden h-11"
                        action="#"
                    >
                        <input
                            placeholder="عنوان دوره ..."
                            className="bg-transparent outline-none w-full h-full text-sm"
                            type="text"
                        />
                        <span className="shrink-0">
                            <svg className="w-5 h-5">
                                <use href="#search"></use>
                            </svg>
                        </span>
                    </form>
                </div>
                {/*  Courses Begin CheckBox  */}
                <label className="flex items-center justify-between bg-secondary rounded-xl overflow-hidden h-11 px-3 mb-3">
                    <span className="text-title font-YekanBakh-Bold text-sm">
                        درحال برگزاری
                    </span>
                    <input
                        // onChange={() =>
                        //     setStarted(
                        //         (prevState) => !prevState
                        //     )
                        // }
                        className="peer sr-only"
                        type="checkbox"
                    />
                    <div className="inline-block cursor-pointer border-2 border-zinc-200 dark:border-[#1d4ed8] h-5 w-11 bg-white dark:bg-[#1d4ed8] relative rounded-xl before:w-3 before:h-3 before:bg-zinc-200 before:absolute before:left-0 before:transition-all peer-checked:border-primary before:translate-x-[2px] before:rounded-full before:top-0 before:bottom-0 before:my-auto peer-checked:bg-primary peer-checked:before:bg-background peer-checked:before:translate-x-[26px] transition-all"></div>
                </label>
                {/*  Courses Accordion boxes  */}
                <div className="divide-y divide-border">
                    {/*  Courses Accordion Free Or Not Free Filtering  */}
                    <Accordion icon={<LucideStar size={20} />} title="نوع دوره">
                        <div
                            className={`p-3 rounded-xl overflow-hidden bg-secondary space-y-2 left-0 right-0 top-full mt-2 w-full`}
                        >
                            {courseTypes.map((item) => (
                                <label
                                    key={item.id}
                                    className={`flex items-center gap-3 text-sm cursor-pointer xl:hover:text-primary transition-colors has-[:checked]:text-primary`}
                                >
                                    <input
                                        value={item.title}
                                        className="bg-border w-4 h-4 appearance-none rounded-full checked:bg-transparent transition-all border-primary border-0 checked:border-[5px]"
                                        type="radio"
                                        name="category"
                                    />
                                    <span>{item.title}</span>
                                </label>
                            ))}
                        </div>
                    </Accordion>
                    {/*  Courses Accordion Categories Filtering  */}
                    <Accordion
                        icon={<GridBoxesOutlineIcon width={20} height={20} />}
                        title="دسته بندی ها"
                    >
                        <div
                            className={`p-3 rounded-xl overflow-hidden bg-secondary space-y-2 left-0 right-0 top-full mt-2 w-full`}
                        >
                            {courseCategories.map((item) => (
                                <label
                                    key={item.id}
                                    className={`flex items-center gap-3 text-sm cursor-pointer xl:hover:text-primary transition-colors has-[:checked]:text-primary`}
                                >
                                    <input
                                        value={item.title}
                                        className="bg-border w-4 h-4 appearance-none rounded-full checked:bg-transparent transition-all border-primary border-0 checked:border-[5px]"
                                        type="radio"
                                        name="category"
                                        // onChange={changeCategoryHandler}
                                    />
                                    <span>{item.title}</span>
                                </label>
                            ))}
                        </div>
                    </Accordion>
                </div>
            </div>
            {/* Cover Elem */}
            {showSidebar && (
                <Cover setElemStatus={setShowSidebar} className="z-50" />
            )}
        </>
    );
}
