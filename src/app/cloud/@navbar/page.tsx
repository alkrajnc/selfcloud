"use client";
import { Button } from "@/components/ui/button";
import { Folder, KeyRound, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarContent = [
  { href: "/browser", icon: Folder },
  { href: "/vault", icon: Lock },
  { href: "/passwords", icon: KeyRound },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex min-h-full w-min flex-col gap-2 border p-2">
      {navbarContent.map((link, idx) => {
        return (
          <Button
            key={idx}
            variant={link.href === pathname ? "default" : "ghost"}
          >
            <Link href={link.href}>
              <link.icon />
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default Navbar;
