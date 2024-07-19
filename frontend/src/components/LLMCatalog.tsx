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
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LLMCatalog() {
  const [data, setData] = useState<CatalogHeaders[]>([]);

  useEffect(() => {
    getData();
  }, []);

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
            <Link href={`/catalog/${item.llm}?id=${item._id}`}>
              <TableCell className="font-medium">{item.llm}</TableCell>
            </Link>
            <TableCell>{item.organization}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-right">{item.modality}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
