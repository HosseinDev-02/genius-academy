import SectionHeader from "@/src/components/ui/section/SectionHeader";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import Course from "@/src/components/ui/Course";
import Cover from "@/src/components/shared/Cover";
import React from "react";
import { courseCategories, courseTypes, courses, sortingCoursesTypes } from "@/src/lib/placeholder-data";
import { LucideFilter, LucideStar, LucideX } from "lucide-react";
import Accordion from "@/src/components/ui/Accordion";
import GridBoxesIcon from "@/src/components/icon/GridBoxesIcon";
import GridBoxesOutlineIcon from "@/src/components/icon/GridBoxesOutlineIcon";
import CoursesFilteringSidebar from "@/src/components/section/CoursesFilteringSidebar";
import AdjustmentsIcon from "@/src/components/icon/AdjustmentsIcon";

export default function Courses() {
    return (
        <main className="py-5">
            <div className="container">
                <div className="space-y-8">
                    <SectionHeader>
                        <SectionTitle
                            lineHeight="1rem"
                            fontSize="12px"
                            title="دوره های آموزشی"
                            text="دوره ببین، تمرین کن، برنامه نویس شو"
                        ></SectionTitle>
                    </SectionHeader>
                    <div className="md:grid grid-cols-12 gap-5 items-start">
                        {/*  Courses Side Bar  */}
                        <CoursesFilteringSidebar/>
                        {/*  Courses Wrapper  */}
                        <div className="col-span-8 lg:col-span-9">
                            {/*  Courses Wrapper Header  */}
                            <div className="flex gap-3 items-center mb-3">
                                <div className="flex items-center gap-1">
                                    <AdjustmentsIcon width={20} height={20}/>
                                    <span className="text-xs font-YekanBakh-SemiBold hidden sm:inline">
                                        مرتب سازی :
                                    </span>
                                </div>
                                <Accordion title={'انتخاب کنید'}>
                                        <div
                                            className={`p-3 rounded-xl overflow-hidden bg-secondary space-y-2 left-0 right-0 top-full z-50 absolute w-full`}
                                        >
                                            {sortingCoursesTypes.map((item) => (
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
                                    // onClick={() =>
                                    //     setFilteringMenu(
                                    //         (prevState) => !prevState
                                    //     )
                                    // }
                                    className="flex md:hidden items-center gap-1 h-11 px-4 text-title bg-secondary rounded-2xl"
                                >
                                    <LucideFilter size={20}/>
                                    <span className="hidden font-YekanBakh-SemiBold text-xs xs:flex items-center gap-1">
                                        فیلتر
                                        <span className="hidden sm:inline">
                                            دوره ها
                                        </span>
                                    </span>
                                </button>
                            </div>
                            {/*  Courses wrapper Content  */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                                {courses.map((course) => (
                                    <Course
                                        key={course.id}
                                        {...course}
                                    ></Course>
                                ))}
                            </div>
                        </div>
                        {/*  Courses Filtering Menu Cover  */}
                        {/* {filteringMenu && (
                            <Cover
                                className="z-50"
                                setElemStatus={setFilteringMenu}
                            />
                        )} */}
                    </div>
                </div>
            </div>
        </main>
    );
}
