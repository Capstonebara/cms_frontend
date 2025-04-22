"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isValid = localStorage.getItem("valid");
    if (isValid) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      Redirecting...
    </div>
  );
}
