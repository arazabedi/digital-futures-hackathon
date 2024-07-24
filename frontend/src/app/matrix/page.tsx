"use client";

import ScatterPlot from "@/components/ScatterPlot";
import { useState } from "react";
import withAuth from "@/hoc/withAuth";

const data = [
  {
    id: 'Gemini',  // Series label for Gemini
    data: [
      { x: 76, y: 87.5, size: 10, modelId: "6696b6423ef220089f769114" }
    ],
  },
  {
    id: 'Llama 3',  // Series label for Llama 3
    data: [
      { x: 73, y: 82, size: 20, modelId: "6696b6483ef220089f769182" }
    ],
  },
  {
    id: 'Jukebox',  // Series label for Jukebox
    data: [
      { x: 59.5, y: 60, size: 30, modelId: "6696b6433ef220089f769127" }
    ],
  },
  {
    id: 'GPT-4',  // Series label for GPT-4
    data: [
      { x: 78.5, y: 88.5, size: 40, modelId: "6696b6443ef220089f769132" }
    ],
  },
  {
    id: 'GPT-2',  // Series label for GPT-2
    data: [
      { x: 59, y: 65.75, size: 50, modelId: "6696b6433ef220089f769120" }
    ],
  },
  {
    id: 'StableLM 2',  // Series label for StableLM 2
    data: [
      { x: 59.5, y: 61, size: 60, modelId: "6696b63c3ef220089f7690a8" }
    ],
  },
  {
    id: 'BLOOM',  // Series label for BLOOM
    data: [
      { x: 46.9, y: 79.25, size: 70, modelId: "6696b6483ef220089f76918b" }
    ],
  },
  {
    id: 'Ferret',  // Series label for Ferret
    data: [
      { x: 66, y: 65, size: 80, modelId: "6696b63b3ef220089f769096" }
    ],
  },
];

const Matrix = () => {
  // const [data, setData] = useState();

  return (
    <main className="ml-44 mr-44 mt-24">
      <section className="h-screen flex flex-col items-center">
        <ScatterPlot data={data} />
      </section>
    </main>
  );
};

export default withAuth(Matrix);
