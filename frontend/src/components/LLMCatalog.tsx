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
import { CatalogHeaders } from "@/lib/types/types";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export function LLMCatalog() {
  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [data, setData] = useState<CatalogHeaders[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const formattedData = await getCatalogData();
    setData(formattedData);
  };

  const handleCheckedChange = (checked: boolean) => {
    setEditModeOn(checked);
  };

  return (
    <>
      {isAdmin ? (
        <div className="flex items-center space-x-2 mb-5">
          <Switch
            onCheckedChange={(checked) => handleCheckedChange(checked)}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Edit</Label>
        </div>
      ) : null}

      <Table>
        <TableCaption>Current LLM models</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">LLM</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Modality</TableHead>
            {editModeOn ? (
              <TableHead className="text-center">Edit</TableHead>
            ) : null}
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
              {editModeOn ? (
                <TableCell className="text-right">
                  <div className="flex flex-col flex-grow gap-3">
                    <Button variant="outline">
                      <Pencil />
                    </Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
