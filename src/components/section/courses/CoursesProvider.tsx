"use client";
import React, { useState } from "react";
import CoursesFilteringSidebar from "./CoursesFilteringSidebar";
import AdjustmentsIcon from "../../icon/AdjustmentsIcon";
import Accordion from "../../ui/Accordion";
import { sortingTypes } from "@/src/lib/placeholder-data";
import { LucideFilter } from "lucide-react";
export default function CoursesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className="md:grid grid-cols-12 gap-5 items-start">
            {/*  Courses Side Bar  */}
            <CoursesFilteringSidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            {/*  Courses Wrapper  */}
            <div className="col-span-8 lg:col-span-9">
                {/*  Courses Wrapper Header  */}
                <div className="flex gap-3 items-center mb-3">
                    <div className="flex items-center gap-1">
                        <AdjustmentsIcon width={20} height={20} />
                        <span className="text-xs font-YekanBakh-SemiBold hidden sm:inline">
                            مرتب سازی :
                        </span>
                    </div>
                    <Accordion title={"انتخاب کنید"}>
                        <div
                            className={`p-3 rounded-xl overflow-hidden bg-secondary space-y-2 left-0 right-0 top-full z-50 absolute w-full`}
                        >
                            {sortingTypes.map((item) => (
                                <label
                                    key={item.id}
                                    className={`flex items-center gap-3 text-sm cursor-pointer xl:hover:text-primary transition-colors has-[:checked]:text-primary`}
                                >
                                    <input
                                        value={item.title}
                                        className="bg-border w-4 h-4 appearance-none rounded-full checked:bg-transparent transition-all border-primary border-0 checked:border-[5px]"
                                        type="radio"
                                        name="category"
                                        // onChange={() => setFilteringItem(item.title)}
                                    />
                                    <span>{item.title}</span>
                                </label>
                            ))}
                        </div>
                    </Accordion>
                    {/*  Courses Filtering Buttons  */}
                    <button
                        onClick={() =>
                            setShowSidebar((prevState) => !prevState)
                        }
                        className="flex md:hidden items-center gap-1 h-11 px-4 text-title bg-secondary rounded-2xl"
                    >
                        <LucideFilter size={20} />
                        <span className="hidden font-YekanBakh-SemiBold text-xs xs:flex items-center gap-1">
                            فیلتر
                            <span className="hidden sm:inline">دوره ها</span>
                        </span>
                    </button>
                </div>
                {/*  Courses wrapper Content  */}
                {children}
            </div>
        </div>
    );
}
