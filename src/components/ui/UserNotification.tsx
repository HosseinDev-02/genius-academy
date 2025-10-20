import { UserNotification } from "@/src/lib/definition";
import { LucideAlertCircle } from "lucide-react";
import React from "react";

export default function UserNotification(props: UserNotification) {
    return (
        <div className="flex items-center border border-border rounded-2xl p-5">
            <div className="flex items-center justify-center pl-5 border-l border-border">
                <LucideAlertCircle size={24} className="text-yellow-500"/>
            </div>
            <div className="text-sm pr-5 space-y-1">
                <span className="font-YekanBakh-Black text-title inline-block">
                    {props.title}
                </span>
                <p className="font-YekanBakh-SemiBold line-clamp-2">
                    {props.text}
                </p>
                <span className="font-YekanBakh-SemiBold inline-block">
                    {props.time} روز پیش
                </span>
            </div>
        </div>
    );
}
