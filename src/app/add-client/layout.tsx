// import { usePathname } from "next/navigation";

import DefaultContainer from "../_components/default-layout";

export default function NewClientContainer({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // const currentPath = usePathname();

  return <DefaultContainer>{children}</DefaultContainer>;
}
