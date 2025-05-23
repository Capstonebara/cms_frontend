"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardOverview } from "./dashboard-overview";
import { UsersAccordion } from "./users-accordion";
import { AccessLogsAccordion } from "./access-logs-accordion";
import { AccountsList } from "./account-list";

type ViewType = "dashboard" | "users" | "logs" | "accounts";

export default function UserDashboard() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");

  // Render the appropriate content based on the active view
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />;
      case "users":
        return <UsersAccordion />;
      case "accounts":
        return <AccountsList />;
      case "logs":
        return <AccessLogsAccordion />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <div>
            <h1 className="text-lg font-semibold">
              {activeView === "dashboard" && "Dashboard"}
              {activeView === "users" && "Users Management"}
              {activeView === "logs" && "Access Logs"}
            </h1>
          </div>
        </header>
        <div className="flex-1 p-6">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
