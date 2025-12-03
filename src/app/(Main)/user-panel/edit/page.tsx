import UserForm from "@/src/components/ui/user-panel/UserForm";
import { getMe } from "@/src/lib/storage/me";

export default async function Edit() {
    const user = await getMe();

    return (
        <div>
            <UserForm user={user}/>
        </div>
    );
}
