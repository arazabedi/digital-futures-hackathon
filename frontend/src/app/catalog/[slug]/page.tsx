"use client";

import { getLlmById } from "@/services/llmService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LLMDetailsCard from "@/components/LLMDetailsCard";

const LLMDetails = () => {
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

	console.log(id);
  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  const getData = async (id: string) => {
    const formattedData = await getLlmById(id);
    setData(formattedData);
  };

  // console.log(data);

  if (data) {
    return (
      <section className="p-32">
        <LLMDetailsCard llmData={data} />
        <div>
          <p className="text-8xl m-24">{}</p>
        </div>
      </section>
    );
  }
};

export default LLMDetails;
