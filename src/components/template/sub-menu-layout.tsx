import { cn } from "@/utils/tailwind";
import React, { useState } from "react";

type SubMenuLayoutProps = {
  children: React.ReactNode;
  sideMenu?: React.ReactNode;
};

const SUB_MENU_WIDTH = 260;

export default function SubMenuLayout({
  children,
  sideMenu,
}: SubMenuLayoutProps) {
  const [isOpen, setOpen] = useState(true);
  const visible = isOpen ? "w-full" : "w-[0px] overflow-hidden";

  return (
    <div className="inline-flex w-full h-full">
      <div className={cn(`flex max-w-[260px] transition-all h-full`, visible)}>
        {sideMenu}
      </div>
      <div className={cn(`flex w-full h-full`)}>
        {children}
      </div>
    </div>
  );
}
