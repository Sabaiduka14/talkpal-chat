/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SettingsIcon } from "lucide-react";

export default function ChatSidebar() {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col border-r h-full bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>SI</AvatarFallback>
            </Avatar>
            <span className="font-medium">By @saba idukashvili</span>
          </div>
          <Button size="icon" variant="ghost">
            <SettingsIcon className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <div className="flex items-center bg-gray-200 p-2 rounded-lg gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>CH</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Whole Chat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
