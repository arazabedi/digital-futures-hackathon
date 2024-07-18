import SideBar from "@/components/SideBar";
import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <main className="flex ">
      <SideBar />
      <div className="flex flex-col flex-grow h-full">
        <div>{children}</div>
      </div>
    </main>
  );
}
