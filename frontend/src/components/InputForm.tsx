"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FadeText } from "@/components/magicui/fade-text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { logWeight } from "@/services/userService";

const formSchema = z.object({
  weight: z.number().min(0).max(140),
  calories: z.number().min(0).max(5000),
});

function InputForm() {
  const [weight, setWeight] = useState<number>(70);
  const [calories, setCalories] = useState<number>(2000);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 70,
      calories: 2500,
    },
  });

  const handleLogWeight = async (weight: number) => {
    await logWeight(weight);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log({ weight: weight, calories: calories });
    handleLogWeight(weight);
  }

  return (
    <main className="flex flex-col p-28 gap-5 h-1/6 w-4/6 m-auto text-center">
      <FadeText
        className="text-3xl"
        text="A new day, and new entry into your log"
        direction="down"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-5">
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    className="w-32 h-32 text-4xl text-center"
                    type="number"
                    placeholder="kg"
                    value={weight}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setWeight(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormDescription>kg</FormDescription>
                <Slider
                  name="weightSlider"
                  defaultValue={[weight]}
                  min={0}
                  max={140}
                  step={0.1}
                  onValueChange={(value) => {
                    setWeight(value[0]);
                  }}
                  value={[weight]}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-col items-center h-1/4 gap-5"></div>
    </main>
  );
}

export default InputForm;
