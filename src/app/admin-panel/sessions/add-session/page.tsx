import SessionForm from "@/src/components/admin-panel/sessions/SessionForm";
import { getShortCourses } from "@/src/lib/storage/courses";
import React from "react";

export default async function AddSessionPage() {
    const shortCourses = await getShortCourses();
    return (
        <div>
            <SessionForm shortCourses={shortCourses} mode="add" />
        </div>
    );
}
