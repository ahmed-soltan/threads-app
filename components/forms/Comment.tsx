"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  commentValidation } from "@/lib/validation/thread";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import {CreateThread} from "@/lib/actions/thread.actions";
import * as z from "zod";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";
type props ={
    image:string,
    userId:string,
    threadId:string,
}
const Comment = ({image , userId , threadId} : props) => {
    const pathname = usePathname();
    const router = useRouter();
    const form = useForm<z.infer<typeof commentValidation>>({
      resolver: zodResolver(commentValidation),
      defaultValues: {
        thread: '',
      }
    });

    console.log(pathname)
  
    const submit = async (values: z.infer<typeof commentValidation>) => {
      try {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(userId),
            pathname
        )
        form.reset()
        // router.push('/');
      } catch (error) {
        console.error("Error creating thread:", error);
        // Handle error, e.g., display error message to the user
      }
    };
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(submit)} className="comment-form">
      <FormField control={form.control} name="thread" render={({ field }) => (
        <FormItem className="flex flex-row items-center w-full">
            <FormLabel className="text-sm text-light-1">
                <Image src={image} alt="profile photo" width={40} height={40} className="rounded-full"/>
            </FormLabel>

          <FormControl className="no-focus border-none bg-transparent w-full gap-x-10">
            <Input type="text" placeholder="Comment..." className="text-sm no-focus outline-none text-light-2 w-full" {...field} />
          </FormControl>
        </FormItem>
      )} />
      <Button type="submit" className="comment-form_btn">Reply</Button>
    </form>
  </Form>
  )
}

export default Comment