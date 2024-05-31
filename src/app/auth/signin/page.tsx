import SignInForm from "@/app/_components/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const SignInPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid h-screen w-screen items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
