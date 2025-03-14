import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut } from "lucide-react";

interface Activity {
  id: number;
  name: string;
  photoUrl: string;
  timestamp: string;
  type: "entry" | "exit";
  apartment: string;
}

interface RecentActivityCardProps {
  activity: Activity;
}

export function RecentActivityCard({ activity }: RecentActivityCardProps) {
  const formattedTime = formatDistanceToNow(new Date(activity.timestamp), {
    addSuffix: true,
  });

  return (
    <div className="flex items-center space-x-4 rounded-md border p-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={activity.photoUrl} alt={activity.name} />
        <AvatarFallback>
          {activity.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{activity.name}</p>
        <p className="text-sm text-muted-foreground">
          {activity.apartment} • {formattedTime}
        </p>
      </div>

      <Badge
        variant={activity.type === "entry" ? "default" : "secondary"}
        className="flex items-center gap-1"
      >
        {activity.type === "entry" ? (
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
  );
}
