import SessionForm from "@/src/components/admin-panel/sessions/SessionForm";
import React from "react";

export default async function EditSessionPage(context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/sessions/${id}`)
    const session = await response.json()
    // const session = getSessionById();
    return <SessionForm defaultValues={{ ...session }} sessionId={id} mode="edit" />;
}
