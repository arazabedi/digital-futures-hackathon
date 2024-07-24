"use client";
import { LLMUpdateProps } from "@/lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateModel } from "@/services/llmService";
import { useToast } from "./ui/use-toast";

// Define the schema using zod
const formSchema = z.object({
  type: z.string().optional(),
  name: z.string().min(1, { message: "Name is required." }),
  organization: z.string().min(1, { message: "Organization is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  url: z.string().optional(),
  datasheet: z.string().optional(),
  modality: z.string().min(1, { message: "Modality is required." }),
  size: z.string().optional(),
  sample: z.string().optional(),
  analysis: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  included: z.string().optional(),
  excluded: z.string().optional(),
  quality_control: z.string().optional(),
  access: z.string().optional(),
  license: z.string().optional(),
  intended_uses: z.string().optional(),
  prohibited_uses: z.string().optional(),
  monitoring: z.string().optional(),
  feedback: z.string().optional(),
  model_card: z.string().optional(),
  training_emissions: z.string().optional(),
  training_time: z.string().optional(),
  training_hardware: z.string().optional(),
  adaptation: z.string().optional(),
  output_space: z.string().optional(),
  terms_of_service: z.string().optional(),
  monthly_active_users: z.string().optional(),
  user_distribution: z.string().optional(),
  failures: z.string().optional(),
});

function LLMEdit({
  llmData,
  modelId,
}: {
  llmData: LLMUpdateProps;
  modelId: string;
}) {
  const defaultValues = {
    type: llmData.type,
    name: llmData.name,
    organization: llmData.organization,
    description: llmData.description,
    url: llmData.url,
    datasheet: llmData.datasheet,
    modality: llmData.modality,
    size: llmData.size,
    sample: llmData.sample,
    analysis: llmData.analysis,
    dependencies: llmData.dependencies,
    included: llmData.included,
    excluded: llmData.excluded,
    quality_control: llmData.quality_control,
    access: llmData.access,
    license: llmData.license,
    intended_uses: llmData.intended_uses,
    prohibited_uses: llmData.prohibited_uses,
    monitoring: llmData.monitoring,
    feedback: llmData.feedback,
    model_card: llmData.model_card,
    training_emissions: llmData.training_emissions,
    training_time: llmData.training_time,
    training_hardware: llmData.training_hardware,
    adaptation: llmData.adaptation,
    output_space: llmData.output_space,
    terms_of_service: llmData.terms_of_service,
    monthly_active_users: llmData.monthly_active_users,
    user_distribution: llmData.user_distribution,
    failures: llmData.failures,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { toast } = useToast();

  const onSubmit = (data: LLMUpdateProps) => {
    try {
      updateModel(data, modelId);
      toast({
        title: "Edit successful",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Edit unsuccessful",
      });
    }
  };

  function capitalizeFieldName(name: string) {
    if (name === "url") {
      return name.toUpperCase();
    }

    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <Card
      style={{ maxWidth: "75%" }}
      className="mx-auto shadow-lg border rounded-lg p-6 bg-white"
    >
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-2x1 font-semibold  mb-2">Edit</CardTitle>
        <CardDescription>LLM Model Information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {Object.keys(defaultValues).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof typeof defaultValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{capitalizeFieldName(field.name)}</FormLabel>
                    <FormControl>
                      {field.toString() === "description" ||
                      field.toString() === "analysis" ||
                      field.toString() === "intended_uses" ||
                      field.toString() === "prohibited_uses" ? (
                        <Textarea placeholder={field.toString()} {...field} />
                      ) : (
                        <Input placeholder={field.toString()} {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LLMEdit;
