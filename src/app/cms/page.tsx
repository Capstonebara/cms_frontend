"use client";

import { useState, useEffect } from "react";
import UserDashboard from "./user-dashboard";
import { Spinner } from "@/components/ui/spinner";

export default function CMS() {
  // get items from local storage
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          Authentication first !
        </div>
      </>
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
