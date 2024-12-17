import { Folder, Image, Settings, User, Vault } from "lucide-react";

import NavbarItem from "./navbar";
import { getServerAuthSession } from "@/server/auth";
import Navbar from "./navbar";

const Sidebar = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex min-h-full w-min flex-col gap-6 rounded-l-xl p-2 pr-12">
      <div className="flex flex-row items-center gap-1 p-2">
        <div className="flex items-center justify-center rounded-full bg-secondary p-2">
          <User />
        </div>
        <div>
          <p className="text-sm font-semibold">{session?.user.name}</p>
          <p className="text-sm text-neutral-500">{session?.user.email}</p>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Sidebar;
