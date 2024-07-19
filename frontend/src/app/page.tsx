"use client";

import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

function Home() {
  const router = useRouter();

  router.push("/catalog");
  return (
    <>
    </>
  );
}

export default withAuth(Home);
