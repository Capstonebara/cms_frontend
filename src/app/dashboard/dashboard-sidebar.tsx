"use client";

import Link from "next/link";
import {
  Users,
  Clock,
  LogOut,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type ViewType = "dashboard" | "users" | "logs" | "accounts";

interface DashboardSidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export function DashboardSidebar({
  activeView,
  setActiveView,
}: DashboardSidebarProps) {
  const router = useRouter();

  const handleSignOut = useCallback(() => {
    localStorage.clear();
    router.push("/auth");
  }, [router]);

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Avatar className="h-8 w-8">
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
              isActive={activeView === "accounts"}
              onClick={() => setActiveView("accounts")}
            >
              <UserCircle className="h-5 w-5" />
              <span>Accounts</span>
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
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={handleSignOut}
            >
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
