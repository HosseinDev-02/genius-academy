import PageHeader from "@/src/components/admin-panel/PageHeader";
import VideoForm from "@/src/components/admin-panel/videos/VideoForm";
import { getShortSessions } from "@/src/lib/storage/sessions";
import React from "react";

export default async function EditVideoPage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/videos/${id}`);
    const video = await response.json();
    const sessions = await getShortSessions();

    return (
        <>
            <PageHeader />
            <VideoForm
                sessions={sessions}
                mode="edit"
                videoId={id}
                defaultValues={{ ...video }}
            />
        </>
    );
}
