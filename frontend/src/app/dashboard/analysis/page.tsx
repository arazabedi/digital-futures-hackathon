"use client";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import withAuth from "@/hoc/withAuth";

const Analysis = () => {
  return (
    <main className="bg-slate-100">
      <div className="h-screen">
        <h1 className="font-semibold text-center mt-8 text-3xl mb-12">
          Your progress in brief
        </h1>
        <div className="p-12 max-w-4/6 max-h-[700px] m-auto flex flex-col">
          <BarChart />
        </div>
      </div>
      <div className="h-screen">
        <h1 className="font-semibold text-center mt-8 text-3xl mb-12"></h1>
        <div className="p-12 max-w-4/6 max-h-[700px] m-auto flex flex-col">
          <LineChart />
        </div>
      </div>
    </main>
  );
};

export default withAuth(Analysis);
