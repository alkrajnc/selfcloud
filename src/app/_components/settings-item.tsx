"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

interface SettingsItemProps {
  title: string;
  description: string;
  className?: string;
  onAction?: () => void;
  action?: { label: string; type: "destructive" | "default" };
  input?: { value: string; onChange: (value: string) => void };
}

const SettingsItem = ({
  title,
  description,
  className,
  onAction,
  action,
  input,
}: SettingsItemProps) => {
  return (
    <div
      className={cn(
        "space-y-2 rounded-xl border border-neutral-300 bg-neutral-50 ",
        className,
      )}
    >
      <div className="space-y-2 px-4 py-6">
        <h3 className="text-2xl font-medium">{title}</h3>
        <p>{description}</p>
        {input && (
          <Input
            className="max-w-[300px]"
            value={input.value}
            onChange={(e) => input.onChange(e.target.value)}
          />
        )}
      </div>
      <div className="flex w-full flex-row justify-end border-t border-neutral-300 px-4 py-2">
        {action && (
          <Button className="self-end" variant={action.type} onClick={onAction}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SettingsItem;
