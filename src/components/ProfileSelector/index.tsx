import { ChevronDown } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileItem from "./profileItem";

const ProfileSelector = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage
              src="https://beep.az/front/demo/c1.png"
              width={100}
              height={100}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <ProfileItem />
      </PopoverContent>
    </Popover>
  );
};

export default ProfileSelector;
