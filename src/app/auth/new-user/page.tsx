"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const NewUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <div className="grid h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-lg border border-neutral-100 p-12 shadow">
        <label>
          Email:
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
        </label>
        <Button onClick={handleSubmit}>Sign up</Button>
      </div>
    </div>
  );
};

export default NewUserPage;
