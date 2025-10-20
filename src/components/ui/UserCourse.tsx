import React from "react";
import PrimaryButton from "./button/PrimaryButton";
import { LucideArrowUpLeft } from "lucide-react";
import { Course } from "@/src/lib/definition";
import GridBoxesIcon from "../icon/GridBoxesIcon";
import Link from "next/link";
import PapersIcon from "../icon/PapersIcon";
import ClockIcon from "../icon/ClockIcon";
import Image from "next/image";

export default function UserCourse(props: Course) {
    const {
        img,
        title,
        category,
        isCompleted,
        sections,
        time,
        teacherImg,
        teacher,
        isFree,
        costPrice,
        price,
        href,
    } = props;
    return (
        <div>
            <div className="block rounded-3xl overflow-hidden relative">
                <Link href={href}>
                    <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt={title}
                    />
                </Link>
                <a
                    href={href}
                    className="absolute left-3 top-3 flex items-center gap-1 bg-black/20 rounded-full h-11 px-4 text-white hover:opacity-80 transition-all"
                >
                    <GridBoxesIcon width={24} height={24} />
                    <span className="font-YekanBakh-SemiBold text-sm tracking-wider">
                        {category}
                    </span>
                </a>
            </div>
            <div className="bg-gradient-to-b from-background to-secondary mx-5 p-5 rounded-3xl">
                <div className="flex items-center gap-2">
                    {isCompleted ? (
                        <>
                            <span className="block bg-success w-1 h-1 rounded-full"></span>
                            <span className="text-xs font-YekanBakh-Black text-success">
                                تکمیل شده
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="block bg-yellow-500 w-1 h-1 rounded-full"></span>
                            <span className="text-xs font-YekanBakh-Black text-yellow-500">
                                درحال برگزاری
                            </span>
                        </>
                    )}
                </div>
                <h6 className="mt-2 text-title text-sm font-YekanBakh-Bold">
                    <Link
                        className="hover:text-primary transition-colors line-clamp-1"
                        href={href}
                    >
                        {title}
                    </Link>
                </h6>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1">
                        <span>
                            <PapersIcon width={20} height={20} />
                        </span>
                        <span className="text-xs font-YekanBakh-SemiBold">
                            {sections} فصل
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ClockIcon width={20} height={20} />
                        <span className="text-xs font-YekanBakh-SemiBold">
                            {time} ساعت
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-5 mt-3">
                    <div className="flex items-center gap-2">
                        <span className="block overflow-hidden w-10 h-10 rounded-full shrink-0 relative">
                            <Image
                                className="w-full h-full"
                                src={teacherImg}
                                alt={teacher}
                                fill
                                objectFit="cover"
                            />
                        </span>
                        <div className="flex flex-col gap-1 text-xs font-YekanBakh-SemiBold">
                            <span className="line-clamp-1">مدرس دوره :</span>
                            <span className="text-title font-YekanBakh-Bold line-clamp-1">
                                {teacher}
                            </span>
                        </div>
                    </div>
                    {isFree ? (
                        <div className="flex items-center justify-center h-14">
                            <span className="text-success font-YekanBakh-Black text-xl line-clamp-1">
                                رایگان !
                            </span>
                        </div>
                    ) : costPrice !== 0 ? (
                        <div className="flex items-end h-14 flex-col justify-center">
                            <span className='relative block before:bg-caption before:absolute before:-top-1 before:bottom-0 before:w-full before:my-auto before:h-px before:content[" "] font-YekanBakh-SemiBold'>
                                {price.toLocaleString()}
                            </span>
                            {costPrice !== 0 && (
                                <div className="flex items-center gap-1">
                                    <span className="text-title font-YekanBakh-Black text-xl">
                                        {costPrice.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 h-14">
                            <span className="text-title font-YekanBakh-Black text-xl">
                                {price.toLocaleString()}
                            </span>
                        </div>
                    )}
                </div>
                <PrimaryButton
                    className={`w-full mt-5`}
                    icon={<LucideArrowUpLeft size={20} />}
                    title="ادامه یادگیری"
                ></PrimaryButton>
            </div>
        </div>
    );
}
