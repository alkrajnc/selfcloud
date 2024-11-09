"use client";
import { Button } from "@/components/ui/button";
import { Folder, KeyRound, Lock } from "lucide-react";
import { usePathname } from "next/navigation";

const navbarContent = [
    { href: "/browser", icon: Folder },
    { href: "/vault", icon: Lock },
    { href: "/passwords", icon: KeyRound },
];

const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col min-h-full gap-2 w-min p-2 border">
            {navbarContent.map((link, idx) => {
                return (
                    <Button
                        key={idx}
                        variant={link.href === pathname ? "default" : "ghost"}
                    >
                        <link.icon />
                    </Button>
                );
            })}
        </div>
    );
};

export default Navbar;
