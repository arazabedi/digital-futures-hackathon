"use client"

import Dashboard from "./dashboard/page";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";

function Home() {
	const router = useRouter();

	router.push("/dashboard")
  return (
    <>
      <Dashboard />
    </>
  );
}

export default withAuth(Home)
