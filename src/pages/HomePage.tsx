import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Footer from "@/components/template/Footer";
import InitialIcons from "@/components/template/InitialIcons";
import SubMenuLayout from "@/components/template/sub-menu-layout";

const SubMenu = () => {
  return <div className="h-full w-full bg-amber-700">submenu</div>;
};

export default function HomePage() {
  const { t } = useTranslation();

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
        </div>
        <Footer />
      </div>
    </SubMenuLayout>
  );
}
