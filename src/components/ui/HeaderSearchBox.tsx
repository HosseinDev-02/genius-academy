"use client";
import React, { useEffect, useState } from "react";
// import Input from "./Input";
import RoundButton from "./button/RoundButton";
import { LucideSearch, LucideX } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import EducationIcon from "../icon/EducationIcon";
import BookIcon from "../icon/BookIcon";

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
                id="header-search-modal"
                className={`transition-all duration-500 fixed left-0 right-0 bg-background z-[1000] hidden lg:flex items-center justify-center h-20 ${searchModalShow ? 'top-0' : '-top-20'}`}
            >
                <div className="container relative borer border-primary">
                    <div className="flex items-center justify-between gap-5">
                        <form className="block w-full h-10" action="#">
                            {/* Handle Search Logic When Add Courses Data To Project */}
                            <Input
                                value={query}
                                className="placeholder:text-caption w-full h-full outline-none text-title bg-transparent border-none shadow-none ring-0 focus-visible:ring-0"
                                type="text"
                                placeholder="نام دوره یا مقاله را وارد کنید ..."
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                        <RoundButton
                            className="w-9 h-9 shrink-0 cursor-pointer"
                            icon={<LucideX size={20} />}
                            clickEvent={() => {
                                setSearchModalShow(false);
                                setResults([]);
                                setQuery("");
                            }}
                        ></RoundButton>
                    </div>
                    {searchModalShow && query.length > 0 && (
                        <div className="absolute w-full left-0 right-0 top-[120%] overflow-hidden shadow border border-border p-3 bg-background rounded-xl">
                            <div className="search-results flex flex-col gap-1 overflow-y-auto max-h-48 rounded-xl">
                                {isLoading ? (
                                    <span className="px-6 flex items-center gap-4 py-2.5 text-title font-YekanBakh-SemiBold text-sm rounded-xl transition-all duration-300">
                                        در حال دریافت نتیجه
                                    </span>
                                ) : (
                                    <>
                                        {results.length > 0 ? (
                                            results.map((item, index) => (
                                                <Link
                                                    onClick={() => {
                                                        setSearchModalShow(
                                                            false
                                                        );
                                                        setQuery("");
                                                        setResults([]);
                                                    }}
                                                    key={item.id}
                                                    href={
                                                        item.type === "course"
                                                            ? `/course-detail/${item.short_name}`
                                                            : `/article-detail/${item.short_name}`
                                                    }
                                                    className="px-6 flex items-center gap-4 py-2.5 text-title font-YekanBakh-SemiBold text-xs rounded-xl transition-all duration-300 hover:text-primary"
                                                >
                                                    <span>
                                                        {item.type ===
                                                        "course" ? (
                                                            <EducationIcon
                                                                width={16}
                                                                height={16}
                                                            />
                                                        ) : (
                                                            <BookIcon
                                                                width={16}
                                                                height={16}
                                                            />
                                                        )}
                                                    </span>
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
                                            <div className="px-6 py-2.5 text-title font-YekanBakh-SemiBold text-sm flex rounded-xl transition-all duration-300">
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
