"use client";

import { getLlmById } from "@/services/llmService";
import { useEffect, useState } from "react";
import { LLMDetailsCardProps } from "@/types/types";
import { usePathname } from "next/navigation";

const LLMDetails = () => {
  // const [data, setData] = useState<LLMDetailsCardProps>();

  const path = usePathname();
  const llmName = path.replace("/catalog/", "");
  // useEffect(() => {
  //   getData();
  // }, [data]);

  // const getData = async () => {
  //   const formattedData = await getLlmById(llmId as string);
  //   setData(formattedData);
  // };

  return (
    <>
      {/* <LLMDetails llmData={data} /> */}
      <div>
        <p className="text-8xl m-24">{llmName}</p>
      </div>
    </>
  );
};

export default LLMDetails;
