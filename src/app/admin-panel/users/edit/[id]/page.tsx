import UserForm from "@/src/components/admin-panel/users/UserForm";
import React from "react";

export default async function EditUser({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await response.json();
    console.log(
        'user :',
        user
    );
    return (
        <UserForm
            mode="edit"
            userId={id}
            defaultValues={{
                name: user.name,
                email: user.email || "",
                role: user.role,
                phone_number: user.phone_number,
                about: user.about || "",
                image: user.image,
            }}
        />
    );
}
