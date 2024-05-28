import ChatSidebar from "../ChatSidebar";
import Messages from "./Messages";

export function Chat() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[300px_1fr]">
      <div className="hidden md:flex">
        <ChatSidebar />
      </div>
      <div className="w-full">
      <Messages />
      </div>
    </div>
  );
}
