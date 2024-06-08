// import { usePathname } from "next/navigation";

import DefaultContainer from "../_components/default-layout";

export default async function SettingsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <DefaultContainer>{children}</DefaultContainer>;
}
