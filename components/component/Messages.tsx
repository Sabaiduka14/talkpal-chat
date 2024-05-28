"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  LogIn,
  MoveHorizontalIcon,
  PhoneIcon,
  SendIcon,
  VideoIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { supabase } from "@/lib/supabase/client";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "../ui/dialog";

interface Message {
  id: number;
  message: string;
  user_id: string;
  username: string;
  created_at: string;
}

const Messages: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from<Message>("chats")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data);
    }
  };

  const insertMessage = async () => {
    if (!message || !username) return;

    const { error } = await supabase
      .from("chats")
      .insert([{ message, user_id: userId, username }]);

    if (error) {
      console.error("Error inserting message:", error);
    } else {
      setMessage("");
      fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);
    };

    getUser();

    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };
  return (
    <div className="min-h-full md:w-full w-[370px] grid">
      <div className="flex flex-col">
        <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{`${username}`}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <PhoneIcon className="h-5 w-5" />
              <span className="sr-only">Call</span>
            </Button>
            <Button size="icon" variant="ghost">
              <VideoIcon className="h-5 w-5" />
              <span className="sr-only">Video</span>
            </Button>
            <Button size="icon" variant="ghost">
              <MoveHorizontalIcon className="h-5 w-5" />
              <span className="sr-only">More</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.username === username ? "justify-end" : ""
                }`}
              >
                {msg.username !== username && (
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
                <div className="max-w-[75%] space-y-1">
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      msg.username === username
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {msg.username} -{" "}
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </div>
                </div>
                {msg.username === username && (
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t px-4 py-3 dark:border-gray-800">
          {isUsernameSet ? (
            <>
              <Input
                className="flex-1 resize-none rounded-lg border-none bg-gray-100 p-2 text-sm shadow-none focus:ring-0 dark:bg-gray-800"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                onClick={insertMessage}
              >
                <SendIcon className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger>
                <Button className="w-[344px] md:w-[1200px] flex gap-2 items-center">
                  <LogIn />
                  Type username to join
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Input
                  className="w-full mt-6 py-3"
                  placeholder="Your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button className="w-full" onClick={handleUsernameSubmit}>
                  Join
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
