"use client";
import { Button } from "@/components/ui/button";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Folder, Image, Settings, User, Vault } from "lucide-react";

interface NavbarItemProps {
  name: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
}

const navbarContent = [
  { href: "/cloud/drive", name: "Files", icon: Folder },
  { href: "/cloud/vault", name: "Vault", icon: Vault },
  { href: "/cloud/photos", name: "Photos", icon: Image },
  { href: "/cloud/settings", name: "Settings", icon: Settings },
];

const Navbar = () => {
  return (
    <div className="flex flex-col gap-2">
      {navbarContent.map((link, idx) => {
        return (
          <NavbarItem
            key={idx}
            name={link.name}
            href={link.href}
            Icon={link.icon}
          />
        );
      })}
    </div>
  );
};

const NavbarItem = ({ name, Icon, href }: NavbarItemProps) => {
  const pathname = usePathname();
  return (
    <Button
      variant={href === pathname ? "default" : "ghost"}
      className="min-w-48 justify-start"
    >
      <Link
        className="flex flex-row items-center justify-between gap-2"
        href={href}
      >
        <Icon />
        <span>{name}</span>
      </Link>
    </Button>
  );
};

export default Navbar;
