import Navbar from "../_components/browser-navbar";
import Filebrowser from "../_components/file-browser";

const BrowserPage = () => {
    return (
        <div className="p-8">
            <h1 className="font-bold text-4xl">File browser</h1>
            <div className="flex flex-row border-collapse">
                <Navbar />
                <Filebrowser />
            </div>
        </div>
    );
};

export default BrowserPage;
