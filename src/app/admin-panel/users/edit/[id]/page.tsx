import React from "react";

export default async function EditUser({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log("Id : ", id);
    return <div>EditUser</div>;
}
