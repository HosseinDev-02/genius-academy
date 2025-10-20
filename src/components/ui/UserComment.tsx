import { UserComment } from "@/src/lib/definition";
import { LucideArrowUpLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import PrimaryButton from "./button/PrimaryButton";

export default function UserComment(props: UserComment) {
    return (
        <div className="flex md:flex-row flex-col md:items-start gap-5 py-8">
            <a
                className="md:w-4/12 block rounded-3xl overflow-hidden"
                href="/course-detail/react-js"
            >
                <img
                    className="w-full h-full object-cover"
                    src={props.img}
                    alt={props.title}
                />
            </a>
            <div className="md:w-8/12 px-5 rounded-3xl bg-gradient-to-b from-secondary to-background">
                <div className="bg-background rounded-b-3xl p-5">
                    <h3 className="line-clamp-1">
                        <Link
                            className="font-YekanBakh-Black text-title transition-colors hover:text-primary"
                            href={props.courseHref}
                        >
                            {props.title}
                        </Link>
                    </h3>
                </div>
                <div className="mt-5">
                    {props.status ? (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-full bg-border w-3.5 h-3.5">
                                <span className="bg-success w-1.5 h-1.5 rounded-full"></span>
                            </div>
                            <span className="text-success font-YekanBakh-Bold text-sm">
                                تایید شده
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-full bg-border w-3.5 h-3.5">
                                <span className="bg-red-500 w-1.5 h-1.5 rounded-full"></span>
                            </div>
                            <span className="text-red-500 font-YekanBakh-Bold text-sm">
                                درانتظار تایید
                            </span>
                        </div>
                    )}
                    <p className="line-clamp-2 my-3 text-sm font-YekanBakh-SemiBold">
                        {props.text}
                    </p>
                    <PrimaryButton
                        href={props.courseHref}
                        icon={<LucideArrowUpLeft size={20}/>}
                        title="مشاهده در صفحه دوره"
                    ></PrimaryButton>
                </div>
            </div>
        </div>
    );
}
