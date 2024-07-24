"use client";

import ScatterPlot from "@/components/ScatterPlot";
import { useState } from "react";
import withAuth from "@/hoc/withAuth";
import { matrixData } from "../../../data/matrixData";

const Matrix = () => {
  // const [data, setData] = useState();

  return (
    <main className="ml-44 mr-44 mt-24">
      <section className="h-screen flex flex-col items-center">
        <ScatterPlot data={matrixData} />
      </section>
    </main>
  );
};

export default withAuth(Matrix);
