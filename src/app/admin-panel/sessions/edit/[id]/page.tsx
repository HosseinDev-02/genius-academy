import PageHeader from "@/src/components/admin-panel/PageHeader";
import SessionForm from "@/src/components/admin-panel/sessions/SessionForm";
import { getShortCourses } from "@/src/lib/storage/courses";
import React from "react";

export default async function EditSessionPage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const shortCourses = await getShortCourses();
    const response = await fetch(`http://localhost:3000/api/sessions/${id}`);
    const session = await response.json();
    // const session = getSessionById();
    return (
        <>
            <PageHeader />
            <SessionForm
                shortCourses={shortCourses}
                defaultValues={{ ...session }}
                sessionId={id}
                mode="edit"
            />
        </>
    );
}
