import NewPasswordModal from "@/app/_components/new-password-modal";
import PasswordList from "@/app/_components/password-list";
import Section from "@/app/_components/section";
import { Button } from "@/components/ui/button";
import React from "react";

const Vault = () => {
  return (
    <div className="w-full space-y-4 p-4">
      <h1 className="text-5xl font-bold">Vault</h1>
      <Section button={<NewPasswordModal />} title="Passwords">
        <PasswordList />
      </Section>
      <Section title="Secrets"></Section>
    </div>
  );
};

export default Vault;
