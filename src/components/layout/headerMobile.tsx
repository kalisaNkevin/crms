"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import ProfileSelector from "../ProfileSelector";
import { sideBarLinksSyndicate } from "@/lib/links";
import { Logo } from "../Logo";
import { Drawer } from "../ui/drawer";
import { usePathname, useRouter } from "next/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white h-20 flex justify-between items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <Drawer>
            <div className="w-[15rem] z-50 h-screen flex flex-col gap-10 items-center fixed top-0 left-0">
              <div className="flex flex-col justify-start items-start gap-5 mx-5">
                <div className="flex py-5">
                  <Logo className="text-xl" />
                </div>

                {sideBarLinksSyndicate.map((link) => (
                  <div key={link.key} className="w-full grid grid-cols-1 gap-5">
                    <span className="px-2 text-[#898989]">{link.name}</span>
                    {link.subLinks.map((subLink) => {
                      const isActive = subLink.key === pathname;
                      return (
                        <Button
                          key={subLink.key}
                          variant={isActive ? "default" : "ghost"}
                          onClick={() => {
                            router.push(subLink.key);
                            setOpen(false);
                          }}
                          className={`flex text-black gap-2 items-center justify-start p-2 cursor-pointer ${
                            isActive
                              ? "bg-primary text-white h-[48px] px-2 w-[210px] rounded-md"
                              : "hover:bg-primary hover:text-white h-[48px] px-2 w-[210px] rounded-md"
                          }`}
                        >
                          <subLink.icon className="w-6 h-6" />
                          {subLink.label}
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Drawer>
        </SheetContent>
      </Sheet>
      <div className="flex justify-center gap-5 items-center px-5">
        <ProfileSelector />
      </div>
    </div>
  );
}
