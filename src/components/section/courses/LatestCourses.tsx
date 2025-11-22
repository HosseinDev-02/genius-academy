import React from "react";
import SectionLinkBtn from "../../ui/section/SectionLinkBtn";
import SectionHeader from "../../ui/section/SectionHeader";
import SectionTitle from "../../ui/section/SectionTitle";
import { LucideArrowUpLeft } from "lucide-react";
import Course from "../../ui/Course";
import { Course as TCourse } from "@/src/lib/definition";
import { getLatestCourses } from "@/src/lib/storage/courses";

export default async function LatestCourses() {
    const latestCourses = await getLatestCourses();
    return (
        <section>
            <div className="container">
                {/*  Section Header  */}
                <SectionHeader>
                    <SectionTitle
                        title="آخرین دوره های"
                        text="منتشر شده"
                    ></SectionTitle>
                    <SectionLinkBtn
                        href="/courses"
                        icon={<LucideArrowUpLeft size={20} />}
                        text="مشاهده همه"
                    ></SectionLinkBtn>
                </SectionHeader>
                {/*  Section Content  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-5">
                    {latestCourses.length &&
                        latestCourses.map((course) => {
                            return (
                                <Course key={course.id} {...course}></Course>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}
