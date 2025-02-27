import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/template/AppSideBar";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import dex4Logo from "../assets/dex4logo.png";
import { SubMenuProvider } from "@/contexts/SubMenuContext";
export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <DragWindowRegion />
    <div className="bg-background">
      <SidebarProvider defaultOpen={false}>
        <SubMenuProvider>
          <AppSidebar />
          <div className="w-full h-screen">
          <header className="flex w-full h-12 shrink-0 items-center gap-2 px-4 bg-sidebar">
            <img src={dex4Logo}/>
            <div className="ml-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
            <SidebarInset>
              <main className="h-screen w-full">{children}</main>
            </SidebarInset>
          </div>
        </SubMenuProvider>
      </SidebarProvider>
    </div>
    </>
  );
}
