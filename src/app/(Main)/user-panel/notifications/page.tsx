import SubTitle from "@/src/components/ui/SubTitle";
import React from "react";
import UserNotification from "@/src/components/ui/UserNotification";
import { userNotifications } from "@/src/lib/placeholder-data";

export default function Notifications() {
    return (
        <div>
            <SubTitle title="اعلانات"></SubTitle>
            <div className="mt-5 space-y-5">
                {userNotifications.map((notification) => (
                    <UserNotification
                        key={notification.id}
                        {...notification}
                    ></UserNotification>
                ))}
            </div>
        </div>
    );
}
