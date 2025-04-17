"use client";

import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/cms");

  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}
