"use client";

import Link from "next/link";
import { Users, Clock, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type ViewType = "dashboard" | "users" | "logs" | "settings";

interface DashboardSidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export function DashboardSidebar({
  activeView,
  setActiveView,
}: DashboardSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Logo" />
              <AvatarFallback>BD</AvatarFallback>
            </Avatar>
            <span>Admin Dashboard</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeView === "dashboard"}
              onClick={() => setActiveView("dashboard")}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeView === "users"}
              onClick={() => setActiveView("users")}
            >
              <Users className="h-5 w-5" />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeView === "logs"}
              onClick={() => setActiveView("logs")}
            >
              <Clock className="h-5 w-5" />
              <span>Access Logs</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeView === "settings"}
              onClick={() => setActiveView("settings")}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
