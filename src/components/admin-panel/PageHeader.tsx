import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type PageHeader = {
    title: string;
    href?: string;

};

export default function PageHeader({ title, href }: PageHeader) {
    return (
        <div className="grid grid-cols-12">
            {href && (
                <Link href={`/admin-panel/${href}`} className="col-span-1 flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer">
                <span>افزودن دوره</span>
                <Plus strokeWidth={'2.5px'} size={16}/>
            </Link>
            )}
            <div className="flex items-center justify-center gap-3 mb-8 col-start-5 col-end-9 col-span-4">
                <div className="flex items-center gap-1 grow">
                    <span className="block w-full h-1 rounded-xl bg-gradient-to-r from-teal-600 to-teal-400/10"></span>
                    <span className="block w-2 h-2 rounded-full border-3 border-teal-600 bg-teal-600"></span>
                    <span className="block w-3 h-3 rounded-full border-3 border-teal-600"></span>
                    <span className="block w-4 h-4 rounded-full border-3 border-teal-600"></span>
                </div>
                <h2 className="text-3xl text-center font-YekanBakh-Bold">
                    {title}
                </h2>
                <div className="flex items-center gap-1 grow">
                    <span className="block w-4 h-4 rounded-full border-3 border-teal-600"></span>
                    <span className="block w-3 h-3 rounded-full border-3 border-teal-600"></span>
                    <span className="block w-2 h-2 rounded-full border-3 border-teal-600 bg-teal-600"></span>
                    <span className="block w-full h-1 rounded-xl bg-gradient-to-l from-teal-600 to-teal-400/10"></span>
                </div>
            </div>
        </div>
    );
}
