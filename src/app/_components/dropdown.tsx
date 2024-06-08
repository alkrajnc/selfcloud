"use client";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, Search } from "lucide-react";
import React, { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type DropdownData = {
  label: string;
  value: string;
};

interface DropdownProps {
  data: DropdownData[];
  value: string;
  placeholder?: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ data, value, placeholder, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="relative max-w-[12vw]">
        <div
          className="rounded-lg border border-neutral-200 bg-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-row items-center justify-between pl-2">
            <p className="text-sm font-medium text-neutral-900 ">
              {value
                ? data.find((option) => option.value === value)?.label
                : placeholder}
            </p>
            <ChevronsUpDown color={"gray"} />
          </div>
        </div>
        {isOpen && (
          <div className="absolute left-0 top-12 z-50 w-full rounded-lg border border-neutral-200 bg-white">
            <div className="m-2 pb-2">
              <Input
                className=" w-full"
                placeholder="Search..."
                onChange={() => {
                  ("");
                }}
              />
            </div>

            <div className="space-y-3">
              {data.map((item, index) => (
                <div
                  className="cursor-pointer rounded-lg p-1 pl-4 hover:bg-neutral-100"
                  key={index}
                  onClick={() => {
                    onSelect(item.value);
                    setIsOpen(false);
                  }}
                >
                  <div className="p-1">
                    <p className="">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DrawerTrigger asChild>
          <Button variant={"outline"}>
            {value
              ? data.find((option) => option.value === value)?.label
              : placeholder}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select a platform</DrawerTitle>

            {
              <>
                <div className="m-2 pb-2">
                  <Input
                    className="w-full"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                <div>
                  {data
                    .filter((item) =>
                      item.label.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((item, index) => (
                      <div
                        className="cursor-pointer  rounded-lg p-1 pl-4 hover:bg-neutral-100"
                        key={index}
                        onClick={() => {
                          onSelect(item.value);
                          setIsOpen(false);
                        }}
                      >
                        <p className="text-left">{item.label}</p>
                      </div>
                    ))}
                </div>
              </>
            }
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default Dropdown;
