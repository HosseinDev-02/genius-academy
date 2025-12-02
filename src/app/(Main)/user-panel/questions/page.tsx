import EducationIcon from "@/src/components/icon/EducationIcon";
import UserCommentsWrapper from "@/src/components/section/user-panel/comments/UserCommentsWrapper";
import SubTitle from "@/src/components/ui/SubTitle";
import { userComments } from "@/src/lib/placeholder-data";
import { getMe } from "@/src/lib/storage/me";
import { getUserComments } from "@/src/lib/storage/users";
import { LucideFileText } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
export default async function Questions() {
    const user = await getMe();
    if(!user) {
        notFound();
    }
    const userComments = await getUserComments(user.id);
    return (
        <UserCommentsWrapper userComments={userComments}/>
    );
}
