"use client";
import React, { useEffect, useState } from "react";
// import Input from "./Input";
import RoundButton from "./button/RoundButton";
import { LucideSearch, LucideX } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type SearchItem = {
    id: string;
    title: string;
    short_name: string;
    type: "course" | "article";
};

export default function HeaderSearchBox() {
    const [searchModalShow, setSearchModalShow] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchItem[]>([]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            const res = await fetch(`/api/search?q=${query}`);
            const data = await res.json();
            console.log("search result :", data);
            setResults(data);
            setIsLoading(false);
        }, 500); // debounce

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div>
            {/* header search btn */}
            <RoundButton
                className={"hidden lg:flex cursor-pointer"}
                clickEvent={() => setSearchModalShow(true)}
                icon={<LucideSearch size={20} />}
            ></RoundButton>
            {/* modal search wrapper */}
            <div
                style={searchModalShow ? { top: "0" } : {}}
                id="header-search-modal"
                className="transition-all fixed left-0 right-0 -top-20 bg-background z-50 hidden lg:flex items-center justify-center h-20"
            >
                <div className="container relative">
                    <div className="flex items-center justify-between gap-5">
                        <form className="block w-full h-10" action="#">
                            {/* Handle Search Logic When Add Courses Data To Project */}
                            <Input
                                className="placeholder:text-caption w-full h-full outline-none text-title bg-transparent border-none shadow-none ring-0 focus-visible:ring-0"
                                type="text"
                                placeholder="نام دوره یا مقاله را وارد کنید ..."
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                        <RoundButton
                            className="w-9 h-9 shrink-0 cursor-pointer"
                            icon={<LucideX size={20} />}
                            clickEvent={() => setSearchModalShow(false)}
                        ></RoundButton>
                    </div>
                    {searchModalShow && query.length > 0 && (
                        <div className="absolute w-full left-0 right-0 top-full overflow-hidden">
                            <div className="flex flex-col gap-1 rounded-xl overflow-y-scroll max-h-40 bg-secondary p-2">
                                {isLoading ? (
                                    <span className="px-6 flex items-center gap-4 py-2.5 text-title font-YekanBakh-SemiBold text-sm bg-blue-100 rounded-xl hover:bg-blue-200 transition-all duration-300">
                                        در حال دریافت نتیجه
                                    </span>
                                ) : (
                                    <>
                                        {results.length > 0 ? (
                                            results.map((item, index) => (
                                                <Link
                                                    key={item.id}
                                                    href={
                                                        item.type === "course"
                                                            ? `/course-detail/${item.short_name}`
                                                            : `/article-detail/${item.short_name}`
                                                    }
                                                    className="px-6 flex items-center gap-4 py-2.5 text-title font-YekanBakh-SemiBold text-sm bg-blue-50 rounded-xl hover:bg-blue-200 transition-all duration-300"
                                                >
                                                    <span>{index + 1}</span>
                                                    <div className="flex flex-col gap-1">
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                        <span className="text-xs font-YekanBakh-Bold">
                                                            {item.type ===
                                                            "course"
                                                                ? "دوره"
                                                                : "مقاله"}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-6 py-2.5 text-title font-YekanBakh-SemiBold text-sm flex bg-blue-50 rounded-xl hover:bg-blue-200 transition-all duration-300">
                                                نتیجه ای یافت نشد
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
