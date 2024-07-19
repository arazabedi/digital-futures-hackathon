"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCatalogData } from "@/services/llmService";
import { MouseEvent, useEffect, useState } from "react";
import { CatalogHeaders } from "@/types/types";
import { useRouter } from "next/navigation";

export function LLMCatalog() {
  const [data, setData] = useState<CatalogHeaders[]>([]);

  const router = useRouter();

  useEffect(() => {
    getData();
  }, [data]);

  const getData = async () => {
    const formattedData = await getCatalogData();
    setData(formattedData);
  };

  return (
    <Table>
      <TableCaption>Current LLM models</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">LLM</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Modality</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
						<a className="m-0 p-0" href={`/catalog/${item.llm}`}>
              <TableCell className="font-medium">{item.llm}</TableCell>
            </a>
            <TableCell>{item.organization}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-right">{item.modality}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
