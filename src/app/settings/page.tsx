import React from "react";
import { settingsList } from "./settings";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SettingsPage = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="">
        <h1 className="border-b p-4 text-4xl font-semibold">Settings</h1>
        <div className="divide-y">
          {settingsList.map((setting) => {
            return (
              <div key={setting.label} className="py-4">
                <Link href={setting.link}>
                  <h2 className="font-base text-lg">{setting.label}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
