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
import { useEffect, useMemo, useState } from "react";
import { getLogs } from "./fetch";
import useWebSocketStats from "@/hooks/use-websocket-stats";
import { Spinner } from "@/components/ui/spinner";
import { LogPics } from "./log-pics";
import { formatTimestamp } from "@/lib/common";

export interface Stats {
  total_account: number;
  total_resident: number;
  total_entry: number;
  total_exit: number;
}

export interface Activity {
  id: string;
  device_id: string;
  name: string;
  timestamp: number;
  type: "entry" | "exit";
  apartment: string;
  captured: string;
}

export function DashboardOverview() {
  const [logs, setLogs] = useState<Activity[]>([]);
  const [loading, isLoading] = useState(true);

  const websocket = useWebSocket("wss://api.fptuaiclub.me/client_logs");
  const stats = useWebSocketStats(
    "wss://api.fptuaiclub.me/admin/logs_total_ws"
  );

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await getLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        isLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const piclogs = useMemo(() => {
    return websocket.data[websocket.data.length - 1];
  }, [websocket.data]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Accounts
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.data?.total_account || <Spinner />}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered users in the system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.data?.total_resident !== undefined ? (
                stats.data.total_resident
              ) : (
                <Spinner />
              )}
            </div>
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
            <div className="text-2xl font-bold">
              {stats.data?.total_entry !== undefined ? (
                stats.data?.total_entry
              ) : (
                <Spinner />
              )}
            </div>
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
            <div className="text-2xl font-bold">
              {stats.data?.total_exit !== undefined ? (
                stats.data?.total_exit
              ) : (
                <Spinner />
              )}
            </div>
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
          {!piclogs && (
            <CardHeader>
              <CardTitle>Captured</CardTitle>
              <CardDescription>Images captured real-time</CardDescription>
            </CardHeader>
          )}
          {piclogs && (
            <>
              <CardHeader>
                <CardTitle>Captured</CardTitle>
                <CardDescription>
                  Images captured from the {piclogs.device_id} in{" "}
                  {formatTimestamp(piclogs.timestamp)}
                </CardDescription>
              </CardHeader>
              <LogPics captured={piclogs.captured} />
            </>
          )}
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Activity by Day</CardTitle>
            <CardDescription>
              Entry and exit patterns throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!loading && (
              <div className="space-y-4 h-[300px] overflow-y-auto pr-5">
                {logs.map((activity) => (
                  <RecentActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center h-[300px]">
                <Spinner />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
