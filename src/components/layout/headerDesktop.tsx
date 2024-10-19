"use client";
import ProfileSelector from "@components/ProfileSelector";

export default function MainNav() {
  return (
    <div className="hidden fixed top-0 left-0 right-0 z-10 bg-white h-20  md:flex justify-end ">
      <div className="flex justify-center gap-5 items-center px-5">
        <ProfileSelector />
      </div>
    </div>
  );
}
