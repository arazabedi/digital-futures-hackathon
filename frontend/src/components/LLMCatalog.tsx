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
import { useEffect, useState } from "react";
import { CatalogHeaders } from "@/types/types";

export function LLMCatalog() {
  const [data, setData] = useState<CatalogHeaders[]>([]);

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
        {data.map((item) => (
          <TableRow key={item.llm}>
            <TableCell className="font-medium">{item.llm}</TableCell>
            <TableCell>{item.organization}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-right">{item.modality}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
