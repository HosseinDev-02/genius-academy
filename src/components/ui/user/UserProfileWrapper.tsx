import React from "react";
import UserProfile from "./UserProfile";
import { getMe } from "@/src/lib/storage/users";

export default async function UserProfileWrapper() {
    const user = await getMe();
    return (
        <div>
            <UserProfile user={user} />
        </div>
    );
}
