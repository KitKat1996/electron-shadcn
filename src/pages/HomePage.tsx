import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Footer from "@/components/template/Footer";
import InitialIcons from "@/components/template/InitialIcons";
import SubMenuLayout from "@/components/template/sub-menu-layout";
import { useSubMenu } from "@/contexts/SubMenuContext";
import { Button } from "@/components/ui/button";
import { AlarmSmoke, DrillIcon, Router, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FolderTree } from "@/components/ui/tree-folder";



type HierarchySubMenuItemProps = {
  label: string;
  icon?: React.ReactElement;
  content?: HierarchySubMenuItemProps[];
};

const SubMenuItem = (item: HierarchySubMenuItemProps) => {
  if (!item.content?.length) {
    return (
      <div className="inline-block w-full pt-0 pb-4">
        {item.icon && item.icon}
        <h1 className="text-muted">{item.label}</h1>
      </div>
    );
  } else {
    return (
      <AccordionItem value={item.label}>
        <AccordionTrigger className="py-2">
          <div className="inline-flex w-full items-center gap-1">
            {item.icon && <div className="w-fit">{item.icon}</div>}
            <div className="w-full">{item.label}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {item.content?.map((subItem) => {
            return <SubMenuItem key={subItem.label} {...subItem} />;
          })}
        </AccordionContent>
      </AccordionItem>
    );
  }
};

const SubMenu = () => {
  return (
    <div className="bg-sidebar/80 text-sidebar-foreground flex h-full w-full flex-col">
      <div className="flex w-full flex-row justify-between p-5">
        <h1 className="text-muted text-lg font-light">Hierarchy</h1>
        <Button variant={"outline"} className="text-muted w-fit">
          <Search />
        </Button>
      </div>
      <Separator />
      <div className="flex w-full flex-col py-5">
        <FolderTree/>
      </div>
    </div>
  );
};

export default function HomePage() {
  const { t } = useTranslation();
  const { isOpen, setOpen, toggleMenu } = useSubMenu();
  const onClick = () => {
    setOpen(!isOpen);
  };
  return (
    <SubMenuLayout sideMenu={<SubMenu />}>
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <InitialIcons />
          <span>
            <h1 className="font-mono text-4xl font-bold">{t("appName")}</h1>
            <p
              className="text-muted-foreground text-end text-sm uppercase"
              data-testid="pageTitle"
            >
              {t("titleHomePage")}
            </p>
          </span>
          <LangToggle />
          <ToggleTheme />
          <Button onClick={onClick}>Sub Menu</Button>
        </div>
        <Footer />
      </div>
    </SubMenuLayout>
  );
}
