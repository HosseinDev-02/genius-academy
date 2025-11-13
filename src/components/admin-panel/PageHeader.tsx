import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type PageHeader = {
    title: string;
    className?: string;
};

export default function PageHeader({ title, className }: PageHeader) {
    return (
        <div className={`flex md:inline-flex items-center justify-center gap-3 mb-8 ${className}`}>
            <div className="hidden sm:flex items-center gap-1">
                <span className="block w-20 md:w-40 h-1 rounded-xl bg-gradient-to-r from-teal-600 to-teal-400/10"></span>
                <span className="block w-2 h-2 rounded-full border-3 border-teal-600 bg-teal-600"></span>
                <span className="hidden md:block w-3 h-3 rounded-full border-3 border-teal-600"></span>
                <span className="hidden md:block w-4 h-4 rounded-full border-3 border-teal-600"></span>
            </div>
            <h2 className="text-2xl md:text-3xl text-center font-YekanBakh-Bold">
                {title}
            </h2>
            <div className="hidden sm:flex items-center gap-1">
                <span className="hidden md:block w-4 h-4 rounded-full border-3 border-teal-600"></span>
                <span className="hidden md:block w-3 h-3 rounded-full border-3 border-teal-600"></span>
                <span className="block w-2 h-2 rounded-full border-3 border-teal-600 bg-teal-600"></span>
                <span className="block w-20 md:w-40 h-1 rounded-xl bg-gradient-to-l from-teal-600 to-teal-400/10"></span>
            </div>
        </div>
    );
}
