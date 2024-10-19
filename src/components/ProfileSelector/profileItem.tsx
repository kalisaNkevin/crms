import { Power, UserRound } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Separator } from "../ui/separator";
import { useAppDispatch } from "@/state/hooks";
import { removeUser } from "@/state/auth/reducer";

const ProfileItem: FC = () => {
  const dispatch = useAppDispatch();
  const logout = () => dispatch(removeUser());

  return (
    <div>
      <ul>
        <li>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-1.5 my-2"
          >
            <UserRound className="size-5" /> <span>Admin</span>
          </Link>
        </li>
        <Separator orientation="horizontal" />
        <li
          onClick={logout}
          className="flex items-center gap-1.5 mt-2.5 cursor-pointer"
        >
          <Power className="rotate-90 size-5" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileItem;