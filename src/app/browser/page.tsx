import Sidebar from "../_components/browser-navbar";
import Filebrowser from "../_components/file-browser";
import SignoutButton from "../_components/signout-button";

const BrowserPage = () => {
  return (
    <div className="p-8">
      <SignoutButton />
      <h1 className="text-4xl font-bold">File browser</h1>
      <div className="flex border-collapse flex-row">
        <Sidebar />
        <Filebrowser />
      </div>
    </div>
  );
};

export default BrowserPage;
