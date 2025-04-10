import { CardContent } from "@/components/ui/card";

import Image from "next/image";

export function LogPics({ captured }: { captured: string }) {
  return (
    <>
      <CardContent>
        <div className="space-y-4 h-[300px] overflow-y-auto flex items-center justify-center">
          <Image
            src={captured}
            alt="Captured Image Real-time"
            height={400}
            width={400}
          />
        </div>
      </CardContent>
    </>
  );
}
