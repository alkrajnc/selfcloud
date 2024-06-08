import SettingsItem from "@/app/_components/settings-item";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const MyAccountSettings = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-8">
        <h1 className="border-b p-4 text-4xl font-semibold">
          Account Settings
        </h1>
        <div className="space-y-8">
          <SettingsItem
            title="Avatar"
            description="This is your profile picture"
          />
          <SettingsItem
            title="Display Name"
            description="Please enter your full name, or a display name you are comfortable with."
            action={{ label: "Save", type: "default" }}
            /* input={{
              value: "John Doe",
              onChange: (value) => {
                console.log(value);
              },
            }} */
          />
          <SettingsItem
            className="border-red-300"
            title="Delete Account"
            action={{ label: "Delete Account", type: "destructive" }}
            description="Permanently remove your Account and all of its contents from Selfcloud. This action is not reversible, so please continue with caution."
          />
        </div>
      </div>
    </>
  );
};

export default MyAccountSettings;
