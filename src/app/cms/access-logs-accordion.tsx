"use client";

import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut } from "lucide-react";

interface AccessLog {
  id: number;
  name: string;
  photoUrl: string;
  timestamp: string;
  type: "entry" | "exit";
  apartment: string;
}

type AccessLogsByDate = {
  [date: string]: AccessLog[];
};

// Mock access log data grouped by date
const accessLogsByDate: AccessLogsByDate = {
  Today: [
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
  ],
  Yesterday: [
    {
      id: 5,
      name: "Michael Wilson",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(
        Date.now() - 24 * 60 * 60000 - 2 * 60 * 60000
      ).toISOString(), // Yesterday, 2 hours ago
      type: "entry",
      apartment: "D-4207",
    },
    {
      id: 6,
      name: "John Doe",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(
        Date.now() - 24 * 60 * 60000 - 3 * 60 * 60000
      ).toISOString(), // Yesterday, 3 hours ago
      type: "exit",
      apartment: "A-1203",
    },
    {
      id: 7,
      name: "Jane Doe",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(
        Date.now() - 24 * 60 * 60000 - 5 * 60 * 60000
      ).toISOString(), // Yesterday, 5 hours ago
      type: "entry",
      apartment: "B-2104",
    },
  ],
  "Last Week": [
    {
      id: 8,
      name: "Robert Smith",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(), // 3 days ago
      type: "exit",
      apartment: "C-3305",
    },
    {
      id: 9,
      name: "Emily Johnson",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60000).toISOString(), // 4 days ago
      type: "entry",
      apartment: "A-1506",
    },
    {
      id: 10,
      name: "Michael Wilson",
      photoUrl: "/placeholder.svg?height=40&width=40",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60000).toISOString(), // 5 days ago
      type: "exit",
      apartment: "D-4207",
    },
  ],
};

export function AccessLogsAccordion() {
  // Calculate total logs
  const totalLogs = Object.values(accessLogsByDate).reduce(
    (total, logs) => total + logs.length,
    0
  );

  // Format time for display
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Access Logs</h2>
        <p className="text-sm text-muted-foreground">
          Total {totalLogs} access records
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(accessLogsByDate).map(([date, logs]) => (
          <Accordion
            key={date}
            type="single"
            collapsible
            className="border rounded-md"
          >
            <AccordionItem value={date} className="border-none">
              <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center">
                  <span className="font-medium">{date}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({logs.length} {logs.length === 1 ? "record" : "records"})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-2 px-4">
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center gap-4 p-3 rounded-md border"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={log.photoUrl} alt={log.name} />
                        <AvatarFallback>
                          {log.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="font-medium">{log.name}</p>
                          <p className="ml-2 text-sm text-muted-foreground">
                            {log.apartment}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </p>
                      </div>

                      <Badge
                        variant={log.type === "entry" ? "default" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {log.type === "entry" ? (
                          <>
                            <LogIn className="h-3 w-3" />
                            Entry
                          </>
                        ) : (
                          <>
                            <LogOut className="h-3 w-3" />
                            Exit
                          </>
                        )}
                      </Badge>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
