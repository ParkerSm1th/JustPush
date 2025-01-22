"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export const instructionSchema = z.object({
  instructions: z.string().min(1),
});

export type InstructionFormFields = z.infer<typeof instructionSchema>;

export default function InstructionForm({
  instructions,
  updateInstructions,
}: {
  instructions: string;
  updateInstructions: (data: InstructionFormFields) => Promise<void>;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof instructionSchema>>({
    resolver: zodResolver(instructionSchema),
    defaultValues: {
      instructions,
    },
  });

  const onMyFormSubmit = async (data: InstructionFormFields) => {
    setIsSubmitting(true);
    await updateInstructions(data);

    toast({
      title: "Instructions updated",
      description: "Your instructions have been updated",
      variant: "default",
      duration: 3000,
    });
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onMyFormSubmit(data))}
        className="space-y-8 mr-2"
      >
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description Instructions</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Instructions"
                  rows={30}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is how we know how to generate titles & descriptions for
                PRs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
