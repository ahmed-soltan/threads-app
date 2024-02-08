"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { threadValidation } from "@/lib/validation/thread";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {CreateThread} from "@/lib/actions/thread.actions";
import * as z from "zod";

const PostThread = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: '',
      accountId: userId
    }
  });

  const submit = async (values: z.infer<typeof threadValidation>) => {
    try {
      await CreateThread({
        text: values.thread,
        auther: userId,
        communityId: null,
        path: pathname
      });
      router.push('/');
    } catch (error) {
      console.error("Error creating thread:", error);
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-8 my-10 flex flex-col justify-start gap-10">
        <FormField control={form.control} name="thread" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-light-1">Content</FormLabel>
            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
              <Textarea rows={7} placeholder="Enter Your Thread" className="text-sm" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" className="bg-primary-500 py-5">Post Thread</Button>
      </form>
    </Form>
  );
};

export default PostThread;
