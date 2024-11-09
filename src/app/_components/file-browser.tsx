"use client";
import { useEffect, useState } from "react";
import useQuery from "./useQuery";

const Filebrowser = () => {
    const { loading, error, data } = useQuery("/api/cloud/browser/folders");

    return <div className="border w-full h-full"></div>;
};
export default Filebrowser;
