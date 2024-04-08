export default function CloudLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section className="p-4 md:p-24">{children}</section>;
}
