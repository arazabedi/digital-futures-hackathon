"use client";

import ScatterPlot from "@/components/ScatterPlot";
import BusinessValueInfo from "@/components/BusinessValueInfo";
import { useState } from "react";
import withAuth from "@/hoc/withAuth";
import { matrixData } from "../../../data/matrixData";
import WordPullUp from "@/components/ui/word-pull-up";

const Matrix = () => {
  // const [data, setData] = useState();

  return (
    <main className="ml-44 mr-44 mt-24">
      <section className="m-8">
        <WordPullUp
          className="text-xl font-bold tracking-[-0.02em] text-black dark:text-white"
          words="Matrix Overview: Evaluating LLMs on Business Readiness and Perceived Value"
        />
      </section>
      <section className="h-screen flex flex-col items-center mb-[750px] gap-6">
        <ScatterPlot data={matrixData} />
        <BusinessValueInfo />
      </section>
    </main>
  );
};

export default withAuth(Matrix);
