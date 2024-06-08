"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { getSession, signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMediaQuery from "../hooks/useMediaQuery";
import { Button } from "@/components/ui/button";

type User =
  | ({ id: string; access_token: string } & {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    })
  | undefined;

const MainMenu = () => {
  const [userData, setUserData] = React.useState<User | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    const getUserData = async () => {
      const session = await getSession();
      setUserData(session?.user);
    };
    void getUserData();
  }, []);

  if (isDesktop) {
    return (
      <div className="flex w-full justify-end py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="aspect-square p-1" variant={"secondary"}>
              <Menu size={30} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex flex-row gap-3">
              <Avatar>
                <AvatarImage src={userData?.image as string | undefined} />
                <AvatarFallback>
                  {userData?.name?.split(" ")[0]?.[0] +
                    " " +
                    userData?.name?.split(" ")[1]?.[0]}
                </AvatarFallback>
              </Avatar>{" "}
              {userData?.name}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/settings"}>Settings</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await signOut();
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return (
      <Sheet>
        <SheetTrigger className="my-2 self-end" asChild>
          <Button className="aspect-square w-min p-1" variant={"secondary"}>
            <Menu size={30} />
          </Button>
        </SheetTrigger>
        <SheetContent className="pt-8">
          <div className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={userData?.image as string | undefined} />
              <AvatarFallback>
                {userData?.name?.split(" ")[0]?.[0] +
                  " " +
                  userData?.name?.split(" ")[1]?.[0]}
              </AvatarFallback>
            </Avatar>{" "}
            {userData?.name}
          </div>
          <Button variant={"link"}>
            <Link href={"/settings"}>Settings</Link>
          </Button>
          <Button
            onClick={async () => {
              await signOut();
            }}
            variant={"secondary"}
          >
            Sign out
          </Button>
        </SheetContent>
      </Sheet>
    );
  }
};

export default MainMenu;
