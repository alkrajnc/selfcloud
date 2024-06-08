"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";
import { addNewClient } from "./action";
import Dropdown from "../_components/dropdown";
import { useRouter } from "next/navigation";

const NewClientPage = () => {
  const [info, setInfo] = React.useState({ message: "", error: false });
  const [platform, setPlatform] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const router = useRouter();
  const onSubmit = async () => {
    await addNewClient(clientName, platform).then((res) => {
      setInfo(res);
      if (!res.error) {
        setClientName("");
        setPlatform("");
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center  gap-8 md:p-12">
        <Breadcrumb className="self-start">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Client</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          className={
            " space-y-2 rounded-xl border border-neutral-300 bg-neutral-50 "
          }
        >
          <div className="space-y-4 px-4 py-6">
            <h3 className="text-2xl font-semibold">New client</h3>

            <Label htmlFor="client-name">
              Client name
              <Input
                id="client-name"
                className="max-w-[300px]"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                }}
              />
            </Label>
            <Dropdown
              data={[
                { label: "Android", value: "android" },
                { label: "Windows", value: "windows" },
                { label: "Linux", value: "linux" },
              ]}
              onSelect={(selected) => {
                setPlatform(selected);
              }}
              value={platform}
              placeholder="Select a platform..."
            />
          </div>
          <div className="flex w-full flex-row items-center justify-between border-t border-neutral-300 px-4 py-2">
            <p className={info.error ? "text-red-300" : "text-green-500"}>
              {info.message}
            </p>
            <Button
              className="self-end"
              variant={"default"}
              onClick={() => {
                void onSubmit();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewClientPage;
