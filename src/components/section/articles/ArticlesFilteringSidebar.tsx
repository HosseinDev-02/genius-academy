import React from "react";
import Cover from "../../shared/Cover";
import {
    articleCategories,
    articlesFilteringTags,
} from "@/src/lib/placeholder-data";
import GridBoxesOutlineIcon from "../../icon/GridBoxesOutlineIcon";
import Accordion from "../../ui/Accordion";
import { LucideX } from "lucide-react";
import Link from "next/link";
type ArticlesSidebarProps = {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ArticlesFilteringSidebar({
    showSidebar,
    setShowSidebar,
}: ArticlesSidebarProps) {
    return (
        <>
            <div
                className={`fixed h-screen top-0 bg-background rounded-tl-xl rounded-bl-xl w-72 z-[100] p-4 md:rounded-none md:w-auto md:h-auto md:p-0 md:block col-span-4 lg:col-span-3 md:sticky md:top-24 transition-all ${showSidebar ? 'right-0' : '-right-72'}`}
            >
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
                <div>
                    <span className="font-YekanBakh-Black text-title inline-block">
                        تگ های محبوب
                    </span>
                    <div className="flex items-center gap-3 flex-wrap mt-5">
                        {articlesFilteringTags.map((tag) => (
                            <Link
                                key={tag.id}
                                className={`flex hover:text-primary transition-colors items-center justify-center rounded-xl px-4 h-10 bg-secondary text-xs font-YekanBakh-Bold`}
                                href={tag.href}
                            >
                                <span>#{tag.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                {/*  Courses Accordion boxes  */}
                <Accordion
                    icon={<GridBoxesOutlineIcon width={20} height={20} />}
                    title="دسته بندی مقاله ها"
                >
                    <div
                        className={`p-3 rounded-xl overflow-hidden bg-secondary space-y-2 left-0 right-0 top-full mt-2`}
                    >
                        {articleCategories.map((category) => (
                            <label
                                key={category.id}
                                className={`flex items-center gap-3 text-sm cursor-pointer xl:hover:text-primary transition-colors has-[:checked]:text-primary`}
                            >
                                <input
                                    value={category.title}
                                    className="bg-border w-4 h-4 appearance-none rounded-full checked:bg-transparent transition-all border-primary border-0 checked:border-[5px]"
                                    type="radio"
                                    name="category"
                                />
                                <span>{category.title}</span>
                            </label>
                        ))}
                    </div>
                </Accordion>
            </div>
            {showSidebar && (
                <Cover className="z-50" setElemStatus={setShowSidebar} />
            )}
        </>
    );
}
