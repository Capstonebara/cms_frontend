"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ArrowUpRight, ArrowDownRight, Home } from "lucide-react";
import { RecentActivityCard } from "./recent-activity-card";
import useWebSocket from "@/hooks/use-websocket";
import { useEffect, useState } from "react";
import { getLogs } from "./fetch";

interface Stats {
  totalUsers: number;
  totalApartments: number;
  todayEntries: number;
  todayExits: number;
}

export interface Activity {
  id: string;
  device_id: string;
  name: string;
  photoUrl: string;
  timestamp: number;
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

  const [logs, setLogs] = useState<Activity[]>([]);

  const websocket = useWebSocket("ws://localhost:5500/client_logs");
  console.log("websocket", websocket.data);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await getLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }
    fetchLogs();
  }, []);

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
              Today&apos;s Entries
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
            <CardTitle className="text-sm font-medium">
              Today&apos;s Exits
            </CardTitle>
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
            <div className="space-y-4 h-[300px] overflow-y-auto pr-5">
              {[...websocket.data].reverse().map((activity) => (
                <RecentActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Activity by Day</CardTitle>
            <CardDescription>
              Entry and exit patterns throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-[300px] overflow-y-auto pr-5">
              {logs.map((activity) => (
                <RecentActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
