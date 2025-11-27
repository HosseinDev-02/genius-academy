import CommentForm from "@/src/components/admin-panel/comments/CommentForm";
import { getShortArticles } from "@/src/lib/storage/articles";
import { getAllComments } from "@/src/lib/storage/comments";
import { getShortCourses } from "@/src/lib/storage/courses";
import { getAdminUsers } from "@/src/lib/storage/users";
import React from "react";

export default async function AddCommentPage() {
    const users = await getAdminUsers();
    const courses = await getShortCourses();
    const articles = await getShortArticles();
    const comments = await getAllComments();

    return (
        <CommentForm
            users={users}
            courses={courses}
            articles={articles}
            mode="add"
        />
    );
}
