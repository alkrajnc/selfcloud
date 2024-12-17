import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getPasswordList } from "@/server/actions/vault";
import NewPasswordModal from "./new-password-modal";
import Image from "next/image";
import { Dot, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import DisplayPassword from "./display-password";

const PasswordList = async () => {
  const passwords = await getPasswordList();

  return (
    <div>
      {/* <NewPasswordModal /> */}
      <Table className="">
        <TableCaption>Password list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="">Username</TableHead>
            <TableHead className="">Password</TableHead>
            <TableHead className="">Last viewed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passwords &&
            passwords.map((password, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <p className="text font-medium">{password.name}</p>
                    <p className="text font-medium text-neutral-500">
                      {password.website}
                    </p>
                  </TableCell>
                  <TableCell>{password.username}</TableCell>
                  <TableCell className="flex flex-row items-center gap-2">
                    <div className="flex flex-row gap-1">
                      {Array.from({ length: 10 }).map((_, idx) => {
                        return (
                          <div
                            key={idx}
                            className="h-[6px] w-[6px] rounded-full bg-white"
                          ></div>
                        );
                      })}
                    </div>
                    <DisplayPassword id={password.id} />
                  </TableCell>
                  <TableCell>
                    {password.lastAccessed.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PasswordList;
