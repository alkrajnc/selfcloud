"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignInForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        // console.error("Failed to sign in", response?.error);
        setError("Wrong password or email. Please try again.");
      } else {
        router.push(
          "/" + callbackUrl?.split("/").slice(3).join("/") ?? "/dashboard",
        );
      }
    });
  }

  return (
    <div className="flex min-w-[20vw] flex-col items-center gap-4 rounded-lg border border-neutral-100 p-12 shadow">
      {error && <p className="font-medium text-red-400">{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full self-center" type="submit">
              Sign In
            </Button>
            <Separator />
            <Link
              href={"/auth/forgot-password"}
              className=" text-center font-light"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
