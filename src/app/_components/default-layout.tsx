import MainMenu from "./main-menu";

const DefaultContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto flex h-full min-h-screen max-w-[100vw] flex-col px-4 py-4 md:max-w-7xl md:px-4 md:py-8">
      <MainMenu />
      <div>{children}</div>
    </div>
  );
};

export default DefaultContainer;
