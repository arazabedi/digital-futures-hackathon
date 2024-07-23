"use client";

import ScatterPlot from "@/components/ScatterPlot";
import { useState } from "react";
import withAuth from "@/hoc/withAuth";

const data = [
  {
    id: 'Gemini',  // Series label for Gemini
    data: [
      { x: 88, y: 76, size: 10 }
    ],
  },
  {
    id: 'Llama 3',  // Series label for Llama 3
    data: [
      { x: 82, y: 73, size: 20 }
    ],
  },
  {
    id: 'Jukebox',  // Series label for Jukebox
    data: [
      { x: 60, y: 60, size: 30 }
    ],
  },
  {
    id: 'GPT-4',  // Series label for GPT-4
    data: [
      { x: 88, y: 78, size: 40 }
    ],
  },
  {
    id: 'GPT-2',  // Series label for GPT-2
    data: [
      { x: 66, y: 59, size: 50 }
    ],
  },
  {
    id: 'StableLM 2',  // Series label for StableLM 2
    data: [
      { x: 61, y: 60, size: 60 }
    ],
  },
  {
    id: 'BLOOM',  // Series label for BLOOM
    data: [
      { x: 79, y: 47, size: 70 }
    ],
  },
  {
    id: 'Ferret',  // Series label for Ferret
    data: [
      { x: 65, y: 66, size: 80 }
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
