import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import CommentsIcon from "@/src/components/icon/CommentsIcon";
import Box from "@/src/components/ui/Box";
import Session from "@/src/components/ui/Session";
import SubTitle from "@/src/components/ui/SubTitle";
import UserInfo from "@/src/components/ui/user/UserInfo";
import LikeButton from "@/src/components/ui/button/LikeButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import SectionLinkBtn from "@/src/components/ui/section/SectionLinkBtn";
import {
    LucideArrowUpLeft,
    LucideClock,
    LucideCornerUpRight,
    LucideList,
    LucidePencil,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import CourseDetailMenu from "@/src/components/ui/CourseDetailMenu";
import { CourseWithRelations } from "@/src/lib/type-definition";
import { extensions } from "@/src/lib/tiptapExtensions";
import { generateHTML } from "@tiptap/html";
import { getCourseByShortName } from "@/src/lib/storage/courses";
import CourseCommentsWrapper from "@/src/components/section/courses/CourseCommentsWrapper";
export default async function Page({
    params,
}: {
    params: { shortName: string };
}) {
    const { shortName } = await params
    //    const short_name = params.shortName
    const course = (await getCourseByShortName(
        params.shortName
    )) as unknown as CourseWithRelations;
    const content = course.content;
    const htmlContent = generateHTML(content, extensions);

    return (
        <section className="py-5">
            <div className="container">
                <div className="flex md:flex-row flex-col md:items-start gap-5">
                    {/*  course detail right side  */}
                    <div className="md:w-8/12 pb-5">
                        {/*  course image  */}
                        <div>
                            <Image
                                width={814}
                                height={458}
                                className="w-full h-full rounded-3xl"
                                src={course.image}
                                alt="دوره پروژه محور ری اکت و نکست"
                            />
                        </div>
                        {/*  course infos  */}
                        <div className="bg-gradient-to-b from-background to-secondary mx-5 p-5 rounded-3xl space-y-2">
                            <span
                                className={`text-xs font-YekanBakh-Bold ${
                                    course.is_completed
                                        ? "text-success"
                                        : "text-yellow-500"
                                }`}
                            >
                                {course.is_completed
                                    ? "تکمیل شده"
                                    : "در حال برگزاری"}
                            </span>
                            <h1 className="text-title text-xl font-YekanBakh-Bold">
                                {course.title}
                            </h1>
                            <p className="text-sm">{course.about}</p>
                        </div>
                        {/*  course detail boxes  */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
                            {/* {boxes.map((box) => (
                                <Box key={box.id} {...box} />
                            ))} */}
                        </div>
                        {/*  course detail menu  */}
                        <CourseDetailMenu />
                        {/*  course detail description  */}
                        <div id="intro" className="space-y-5 my-5">
                            <SubTitle title="معرفی دوره"></SubTitle>
                            <div
                                className="space-y-5"
                                dangerouslySetInnerHTML={{
                                    __html: htmlContent,
                                }}
                            ></div>
                        </div>
                        {/*  course detail sessions  */}
                        <div id="sections">
                            <SubTitle title="سرفصل ها"></SubTitle>
                            <div className="mt-5">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full space-y-3"
                                >
                                    <AccordionItem
                                        className="border-b-0"
                                        value="item-1"
                                    >
                                        <AccordionTrigger className="px-5 rounded-3xl bg-secondary text-xs font-YekanBakh-SemiBold hover:text-title transition-colors hover:!no-underline cursor-pointer">
                                            <div className="flex items-center gap-6">
                                                <span className="text-title">
                                                    فصل اول
                                                </span>
                                                <span>معرفی دوره</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-1 py-3 mx-8">
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        معرفی دوره
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        پیش نیاز مشاهده این دوره
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        چرا باید این دوره را
                                                        مشاهده کنیم؟
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        در این پروژه از
                                                        typescript هم استفاده
                                                        می‌شود
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem
                                        className="border-b-0"
                                        value="item-2"
                                    >
                                        <AccordionTrigger className="px-5 rounded-3xl bg-secondary text-xs font-YekanBakh-SemiBold hover:text-title transition-colors hover:!no-underline cursor-pointer">
                                            <div className="flex items-center gap-6">
                                                <span className="text-title">
                                                    فصل دوم
                                                </span>
                                                <span>
                                                    پیاده سازی ساختار پروژه
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-1 py-3 mx-8">
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        معرفی دوره
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        پیش نیاز مشاهده این دوره
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        چرا باید این دوره را
                                                        مشاهده کنیم؟
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                                <div className="flex items-center gap-2 md:gap-5">
                                                    <span>1</span>
                                                    <Link
                                                        href="#"
                                                        className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                                    >
                                                        در این پروژه از
                                                        typescript هم استفاده
                                                        می‌شود
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                                    <div className="flex items-center gap-1">
                                                        <span>03:54</span>
                                                        <LucideClock
                                                            size={16}
                                                        />
                                                    </div>
                                                    <Link
                                                        className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                        href="#"
                                                    >
                                                        <span className="font-YekanBakh-SemiBold">
                                                            مشاهده
                                                        </span>
                                                        <LucideArrowUpLeft
                                                            size={20}
                                                        />
                                                    </Link>
                                                </div>
                                            </li>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                        {/*  course detail comments  */}
                        <div id="comments" className="pt-8 pb-5">
                            <CourseCommentsWrapper/>
                        </div>
                    </div>
                    {/*  course detail left side  */}
                    <div className="md:w-4/12 space-y-8 md:sticky md:top-24">
                        <div className="bg-gradient-to-b from-secondary to-background rounded-2xl px-5 pb-5">
                            <div className="bg-background rounded-bl-2xl rounded-br-2xl p-5 mb-5">
                                <SubTitle title="نام نویسی در دوره" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-YekanBakh-Bold">
                                    هزینه ثبت نام :
                                </span>
                                <div className="flex flex-col items-end">
                                    <span className="line-through">
                                        1,900,000
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xl text-title font-YekanBakh-Black">
                                            {Number(
                                                course.price
                                            ).toLocaleString()}
                                        </span>
                                        <span className="text-xs hidden lg:inline-block">
                                            تومان
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <PrimaryButton
                                    icon={<LucideArrowUpLeft size={20} />}
                                    title="اضافه به سبد"
                                />
                                <LikeButton />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <SubTitle
                                className="text-sm"
                                title="مدرس دوره"
                            ></SubTitle>
                            <div>
                                <UserInfo
                                    image={course.user.image}
                                    name={course.user?.name}
                                />
                                <div className="p-5 bg-secondary rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none rounded-b-2xl mt-3">
                                    <p className="text-sm">
                                        {course.user?.about}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
