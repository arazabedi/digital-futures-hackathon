"use client";

import { useState, useEffect } from "react";
import withAuth from "@/hoc/withAuth";
import ResponsiveLineComponent from "@/components/ResponsiveLineComponent";
import { getUserWeightLog } from "@/services/userService";
import InputForm from "@/components/InputForm";

function Dashboard() {
  const [data, setData] = useState<{ id: string; color: string; data: any }[]>(
    []
  );

  const fetchData = async () => {
    const data = await getUserWeightLog();
    setData(data.slice(-30));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="h-screen w-screen">
      <div className="">
        <InputForm />
      </div>
      <div className="m-auto h-4/6 w-4/6">
        <h1 className="text-center font-bold">Your last 30 days</h1>
        {data.length > 0 ? (
          <ResponsiveLineComponent
            data={data}
            xTitle="Date"
            yTitle="Weight (kg)"
          />
        ) : null}
      </div>
    </main>
  );
}

export default withAuth(Dashboard);
