import {
    MenuItem,
    MenuItemWithLinks,
    MenuItemWithSubLinks,
} from "@/src/lib/definition";
import { menuItems } from "@/src/lib/placeholder-data";
import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";

export default function Menu() {
    function hasLinks(item: MenuItem): item is MenuItemWithLinks {
        return !!item.links;
    }

    function hasSubLinks(item: MenuItem): item is MenuItemWithSubLinks {
        return !!item.subLinks;
    }

    return (
        <ul className="hidden lg:flex items-center gap-5 font-YekanBakh-SemiBold text-sm child-hover:text-title child:transition-colors">
            {menuItems.map((item) => {
                if (hasLinks(item)) {
                    return (
                        <li key={item.id} className="group/categories">
                            <Link
                                className="flex items-center gap-1 hover:text-title"
                                href={item.href}
                            >
                                <span className="">{item.title}</span>
                                <ChevronDown
                                    size={20}
                                    className="group-hover/categories:rotate-180 transition-all"
                                />
                            </Link>
                            {/* header categories menu */}
                            <ul className="invisible shadow opacity-0 group-hover/categories:visible group-hover/categories:opacity-100 absolute top-full bg-background border border-border w-56 flex flex-col gap-1 child:leading-5 delay-75 transition-all shadow-black/5 text-title z-20">
                                {item.links.map((link) => {
                                    if (hasSubLinks(link)) {
                                        return (
                                            <li key={link.id} className="group/subcategories">
                                                <Link
                                                    className="flex items-center justify-between p-3 hover:text-primary transition-colors"
                                                    href={link.href}
                                                >
                                                    <span>{link.title}</span>
                                                    <ChevronLeft size={20} />
                                                </Link>
                                                {/* header categories submenu */}
                                                <ul className="invisible shadow opacity-0 group-hover/subcategories:visible group-hover/subcategories:opacity-100 transition-all delay-75 flex flex-col flex-wrap space-y-3 px-3 pt-8 pb-3 bg-background border border-border w-96 absolute right-full -top-px -bottom-px text-caption text-sm">
                                                    <li className="absolute top-2 font-YekanBakh-Bold pointer-events-none">
                                                        محبوب ترین موضوعات
                                                    </li>
                                                    {link.subLinks?.map(
                                                        (subLink) => (
                                                            <li
                                                                key={subLink.id}
                                                                className="w-1/2"
                                                            >
                                                                <Link
                                                                    className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                                    href={
                                                                        subLink.href
                                                                    }
                                                                >
                                                                    {
                                                                        subLink.title
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={link.id}>
                                                <Link
                                                    className={`flex items-center justify-between p-3 hover:text-primary transition-colors`}
                                                    href={link.href}
                                                >
                                                    <span>{link.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </li>
                    );
                } else {
                    return (
                        <li key={item.id} className="group">
                            <Link
                                className="flex items-center gap-1 hover:text-title"
                                href={item.href}
                            >
                                {item.title}
                            </Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
}
