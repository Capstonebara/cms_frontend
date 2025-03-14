"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ArrowUpRight, ArrowDownRight, Home, Clock } from "lucide-react";
import { RecentActivityCard } from "./recent-activity-card";

interface Stats {
  totalUsers: number;
  totalApartments: number;
  todayEntries: number;
  todayExits: number;
}

interface Activity {
  id: number;
  name: string;
  photoUrl: string;
  timestamp: string;
  type: "entry" | "exit";
  apartment: string;
}

export function DashboardOverview() {
  // Mock data for the dashboard
  const stats: Stats = {
    totalUsers: 42,
    totalApartments: 28,
    todayEntries: 15,
    todayExits: 12,
  };

  // Mock data for recent activity
  const recentActivity: Activity[] = [
    {
      id: 1,
      name: "John Doe",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
      type: "entry",
      apartment: "A-1203",
    },
    {
      id: 2,
      name: "Jane Doe",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
      type: "exit",
      apartment: "B-2104",
    },
    {
      id: 3,
      name: "Robert Smith",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(), // 90 minutes ago
      type: "entry",
      apartment: "C-3305",
    },
    {
      id: 4,
      name: "Emily Johnson",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
      type: "exit",
      apartment: "A-1506",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users in the system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Apartments
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApartments}</div>
            <p className="text-xs text-muted-foreground">
              Apartments with registered residents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Entries
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayEntries}</div>
            <p className="text-xs text-muted-foreground">
              People entered today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Exits</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayExits}</div>
            <p className="text-xs text-muted-foreground">People exited today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest entries and exits in the building
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <RecentActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Activity by Hour</CardTitle>
            <CardDescription>
              Entry and exit patterns throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground flex flex-col items-center">
              <Clock className="h-10 w-10 mb-2 opacity-50" />
              <p>Activity chart would appear here</p>
              <p className="text-xs">Showing hourly entry/exit data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
