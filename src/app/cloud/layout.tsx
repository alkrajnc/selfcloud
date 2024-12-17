import Sidebar from "../_components/browser-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-row p-4">
      <Sidebar />
      {children}
    </div>
  );
}
