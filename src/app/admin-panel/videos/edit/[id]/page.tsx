import VideoForm from "@/src/components/admin-panel/videos/VideoForm";
import React from "react";

export default async function EditVideoPage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/videos/${id}`);
    const video = await response.json();
    console.log("video : ", video);
    return <VideoForm mode="edit" videoId={id} defaultValues={{ ...video }} />;
}
