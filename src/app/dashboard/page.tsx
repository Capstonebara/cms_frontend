"use client";

import { useState, useEffect } from "react";
import UserDashboard from "./user-dashboard";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function CMS() {
  // get items from local storage
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const valid = localStorage.getItem("valid");
    setIsValid(!!valid);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center gap-x-2">
        <Spinner />
        <span>Loading</span>
      </div>
    );
  }

  if (!isValid) {
    router.push("/auth");
    return (
      <div className="flex h-screen items-center justify-center">
        Redirecting to login...
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <UserDashboard />
      </main>
    </>
  );
}
