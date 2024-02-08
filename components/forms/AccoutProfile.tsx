"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validation/user";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import userPhoto from "../../assets/user.svg";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
type AccountProfilePropsType = {
  user: {
    userId: string;
    objectId: string | undefined;
    username: string | undefined;
    name: string | undefined;
    bio: string | undefined;
    image: string | undefined;
  };
  btnTitle: string;
};

const AccoutProfile = ({ user, btnTitle }: AccountProfilePropsType) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
      image: user?.image || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        // Assuming URL is stored in the 'url' property
        values.image = imgRes[0].url;
      }
    }

    await updateUser({
      userId: user.userId,
      image: values.image,
      name: values.name,
      username: values.username,
      bio: values.bio,
      path: pathname,
    });
    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
    console.log(values);
  };
  const handleImage = (e: any, fieldChange: (value: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-6 justify-start"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field?.value}
                    alt={field?.value}
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src={userPhoto}
                    alt="userPhoto"
                    width={46}
                    height={46}
                    className="rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload Photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-start gap-2 flex-col">
              <FormLabel className="text-base-semibold text-light-1">
                Name
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="text"
                  placeholder="Enter Your username "
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-start gap-2 flex-col">
              <FormLabel className="text-base-semibold text-light-1">
                username
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="text"
                  placeholder="Enter Your username "
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex items-start gap-2 flex-col">
              <FormLabel className="text-base-semibold text-light-1">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Textarea
                  rows={7}
                  placeholder="Enter Your Bio "
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccoutProfile;
