"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadWebsiteIcon, newPassword } from "@/server/actions/vault";
import { Image, Plus, Trash, UserPlus, X } from "lucide-react";

import React, { useEffect, useState } from "react";

const calculatePasswordEntropy = (password: string) => {
  const chars: string[] = [];
  for (let i = 0; i < password.length; i++) {
    if (!chars.includes(password[i]!)) {
      chars.push(password[i]!);
    }
  }
  return Math.log2(Math.pow(chars.length, password.length));
};

const NewPasswordModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Plus />
        New Password
      </Button>
      {open && <Modal open={open} handleOpen={handleOpen} />}
    </>
  );
};

const Modal = ({
  open,
  handleOpen,
}: {
  open: boolean;
  handleOpen: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [passwordEntropy, setPasswordEntropy] = useState<number>(0);
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  useEffect(() => {
    setPasswordEntropy(calculatePasswordEntropy(password));
    if (passwordEntropy < 25) {
      setPasswordStrength("Very weak");
    } else if (passwordEntropy > 25 && passwordEntropy < 45) {
      setPasswordStrength("Moderate");
    } else if (passwordEntropy > 45 && passwordEntropy < 65) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Extremly strong");
    }
  }, [password]);

  const handleSavePassword = async () => {
    if (newPassword(username, website, password, name) !== null) {
      setPassword("");
      setName("");
      setWebsite("");
      setUsername("");
      handleOpen();
    }
  };

  return (
    <>
      <div className="absolute right-0 top-0 z-30 m-4 h-[calc(100%-2rem)] min-w-[30%] rounded-lg border bg-background">
        <div className="flex h-full flex-col">
          <Button
            onClick={handleOpen}
            className="m-2 self-end"
            size={"icon"}
            variant={"ghost"}
          >
            <X />
          </Button>
          <div className="flex flex-row items-center gap-2 px-4">
            <Image className="text-neutral-400" size={64} />
            <div>
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-neutral-500">{website}</p>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between">
            <div className="p-4">
              <h3 className="mb-4 text-lg font-semibold">Login details</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <Label htmlFor="username">Username or email:</Label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    id="username"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password:</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                  />

                  {passwordEntropy > 0 && (
                    <>
                      <div
                        className="my-2 h-1 max-w-[100%] rounded-full bg-green-400"
                        style={{ width: `${passwordEntropy! * 1.1}%` }}
                      ></div>
                      <p className="text-xs font-medium text-neutral-500">
                        Password strength: {passwordStrength}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <Label htmlFor="name">Entry name:</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    id="name"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website:</Label>
                  <Input
                    type="text"
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                    id="website"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between border-t px-4 py-2">
              <div className="space-x-2">
                <Button variant={"outline"} size={"icon"}>
                  <Trash />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                  <UserPlus />
                </Button>
              </div>
              <div className="space-x-4">
                <Button onClick={handleOpen} variant={"secondary"}>
                  Cancel
                </Button>
                <Button onClick={handleSavePassword}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/70"></div>
    </>
  );
};

export default NewPasswordModal;
