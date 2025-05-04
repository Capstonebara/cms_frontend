import { useEffect, useState } from "react";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";

export function LogPics({ captured }: { captured: string }) {
  const [imgUrl, setImgUrl] = useState(`${captured}?t=${Date.now()}`);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;
  const retryDelay = 1500; // 1.5 giây

  useEffect(() => {
    setError(false);
    setRetryCount(0);
    setImgUrl(`${captured}?t=${Date.now()}`);
  }, [captured]);

  useEffect(() => {
    if (error && retryCount < maxRetries) {
      const timer = setTimeout(() => {
        setImgUrl(`${captured}?t=${Date.now()}`);
        setError(false);
        setRetryCount(retryCount + 1);
      }, retryDelay);

      return () => clearTimeout(timer);
    }
  }, [error, retryCount, captured]);

  return (
    <CardContent>
      <div className="space-y-4 h-[300px] overflow-y-auto flex items-center justify-center">
        {!error ? (
          <Image
            src={imgUrl}
            alt="Captured Image Real-time"
            height={400}
            width={400}
            onError={() => setError(true)}
          />
        ) : retryCount >= maxRetries ? (
          <div className="text-center text-sm text-red-400">
            Image failed to load
          </div>
        ) : (
          <div className="text-center text-sm text-gray-400">Retrying...</div>
        )}
      </div>
    </CardContent>
  );
}
