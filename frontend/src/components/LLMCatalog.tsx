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
import { addLLMBasic, deleteLLM, getCatalogData } from "@/services/llmService";
import { useEffect, useState } from "react";
import { CatalogHeaders } from "@/lib/types/types";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LLMCatalog() {
  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [data, setData] = useState<CatalogHeaders[]>([]);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

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

  const handleDelete = async (llm: CatalogHeaders) => {
    try {
      await deleteLLM(llm._id);
      console.log(llm);
      toast({
        title: "Successfully deleted " + llm.llm + "!",
      });
    } catch (error) {
      toast({
        title: "Couldn't deleted: " + llm.llm + ".\nError: " + error,
      });
    }
  };

  // 0. Define your form schema
  const formSchema = z.object({
    llm: z.string().min(2).max(50),
    organization: z.string().min(2).max(200),
    description: z.string().min(2).max(2000),
    modality: z.string().min(2).max(50),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      llm: "",
      organization: "",
      description: "",
      modality: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      addLLMBasic(values);
      toast({
        title: "Successfully added " + values.llm + ".",
      });
    } catch (error) {
      toast({
        title: "Couldn'y add " + values.llm + ". Error: " + error,
      });
    }
    // console.log(values);
  }

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              {editModeOn ? (
                <TableRow>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="llm"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="GPT-4o" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    {" "}
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="OpenAI" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    {" "}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="The latest LLM from OpenAI..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    {" "}
                    <FormField
                      control={form.control}
                      name="modality"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="text, code, image, audio"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="secondary" type="submit">
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null}

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
                        <Button
                          onClick={() => handleDelete(item)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Form>
    </>
  );
}
