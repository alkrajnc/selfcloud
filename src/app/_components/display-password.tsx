"use client";
import { Button } from "@/components/ui/button";
import { revealPassword } from "@/server/actions/vault";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DisplayPassword = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleOpen} size={"icon"} variant={"ghost"}>
        <Eye />
      </Button>
      {open && <Modal id={id} open={open} handleOpen={handleOpen} />}
    </>
  );
};

const Modal = ({
  id,
  open,
  handleOpen,
}: {
  id: string;
  open: boolean;
  handleOpen: () => void;
}) => {
  const [password, setPassword] = useState<string>();
  useEffect(() => {
    const fetchPassword = async () => {
      const data = await revealPassword(id);
      if (data) {
        setPassword(data);
      }
    };
    fetchPassword();
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="w-max">
        <DialogHeader>
          <DialogTitle>Password</DialogTitle>
        </DialogHeader>
        <p className="text-3xl font-medium">{password}</p>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayPassword;
