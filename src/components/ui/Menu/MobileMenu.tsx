"use client";
import Link from "next/link";
import Logo from "../Logo";
import React, { useState } from "react";
import {
    LucideChevronDown,
    LucideChevronLeft,
    LucideEqual,
    LucideFileText,
    LucideLogIn,
    LucideLogOut,
    LucideNewspaper,
    LucideSearch,
    LucideX,
} from "lucide-react";
import { MenuItem } from "@/src/lib/definition";
import ThemeToggleButton from "../button/ThemeToggleButton";
import Cover from "../../shared/Cover";
import { useHeaderContext } from "../../layout/HeaderProvider";
import { MenuTree } from "@/src/lib/storage/menu-tree";
import { useAuthContext } from "../../layout/LayoutProvider";

export default function MobileMenu({ data }: { data: MenuTree[] }) {
    const { mobileMenuOpen } = useHeaderContext();
    const { user } = useAuthContext()
    const [mobileMenuShow, setMobileMenuShow] = mobileMenuOpen;
    const level = 0;

    return (
        <div>
            <div
                id="mobile-menu"
                className={`lg:hidden transition-all h-screen overflow-y-auto fixed top-0 bg-background rounded-tl-xl rounded-bl-xl w-72 xs:w-80 p-4 space-y-5 z-[100] ${
                    mobileMenuShow ? "right-0" : "-right-72 xs:-right-80"
                }`}
            >
                {/*  mobile menu header  */}
                <div className="flex items-center justify-between mb-8">
                    <Logo />
                    <span
                        onClick={() => setMobileMenuShow(false)}
                        className="text-title"
                    >
                        <LucideX size={24} />
                    </span>
                </div>
                {/*  mobile search box  */}
                <form
                    action="#"
                    className="rounded-xl flex items-center bg-secondary relative h-10 px-12 py-2 border border-border"
                >
                    <span className="absolute right-4 top-0 bottom-0 m-auto flex items-center justify-center text-title">
                        <LucideSearch size={20} />
                    </span>
                    <input
                        placeholder="دنبال چی میگردی ؟"
                        className="w-full h-full bg-transparent outline-none text-title placeholder:text-caption text-sm"
                        type="text"
                    />
                </form>
                {/*  mobile change them wrapper  */}
                <ThemeToggleButton type="mobile" />
                {/*  Mobile Menu Categories  */}
                <div>
                    <ul className="flex flex-col gap-5">
                        {data.map((item) => {
                            return (
                                <MenuNode
                                    key={item.id}
                                    item={item}
                                    level={level + 1}
                                />
                            );
                        })}
                        {user ? (
                            <li>
                            <Link
                                className="flex items-center justify-between"
                                href="/register"
                            >
                                <span className="flex items-center gap-2 text-red-500">
                                    <LucideLogOut size={20} />
                                    <span className="text-xs font-YekanBakh-SemiBold">
                                        خروج از حساب
                                    </span>
                                </span>
                            </Link>
                        </li>
                        ) : (
                            <li>
                            <Link
                                className="flex items-center justify-between"
                                href="/register"
                            >
                                <span className="flex items-center gap-2">
                                    <LucideLogIn size={20} />
                                    <span className="text-xs font-YekanBakh-SemiBold">
                                        ورود / ثبت نام
                                    </span>
                                </span>
                            </Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
            {mobileMenuShow && (
                <Cover className="z-50" setElemStatus={setMobileMenuShow} />
            )}
        </div>
    );
}

function MenuNode({ item, level = 0 }: { item: MenuItem; level?: number }) {
    const [open, setOpen] = useState(false);

    const children = item.submenus || item.sub_submenus || [];
    const hasChildren = children.length > 0;

    const getIconByTitle = (title: string) => {
        const map: Record<string, React.ElementType> = {
            "مقالات آموزشی": LucideFileText,
            "تمامی صفحات": LucideNewspaper,
            "دسته بندی آموزش ها": LucideEqual,
        };
        return (
            map[title] ||
            (level === 0 &&
                item.sub_submenus?.length !== 0 &&
                LucideChevronLeft)
        );
    };

    const Icon = getIconByTitle(item.title);

    return (
        <li>
            <Link
                onClick={(e) => {
                    if (hasChildren) {
                        e.preventDefault();
                        setOpen((prev) => !prev);
                    }
                }}
                className={`flex items-center justify-between ${
                    open && "text-title"
                }`}
                href={item.url}
            >
                <span className="flex items-center gap-2">
                    {Icon && (
                        <Icon
                            className={`${
                                open &&
                                level === 0 &&
                                "transition-all -rotate-45"
                            }`}
                            size={20}
                        />
                    )}
                    <span className={`text-xs font-YekanBakh-SemiBold`}>
                        {item.title}
                    </span>
                </span>
                {hasChildren && level !== 0 && (
                    <LucideChevronDown
                        className={`${open && "transition-all rotate-180"}`}
                        size={20}
                    />
                )}
            </Link>
            {hasChildren && open && (
                <ul
                    className={`child:py-2 relative before:absolute before:content-[""] before:top-0 before:bottom-0 before:right-3 before:bg-zinc-200 dark:before:bg-zinc-900 before:h-full before:w-px pr-8 mt-4 child:text-xs text-zinc-400`}
                >
                    {children!.map((child) => (
                        <MenuNode key={child.id} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}
