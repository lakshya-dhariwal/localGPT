import { useAppSelector } from "@src/lib/hooks/redux";
import { findObjectById } from "@src/lib/util";
import { useMemo } from "react";

export function NavBar() {
  const chats = useAppSelector((state) => state.chats.chats);
  const activeChatId = useAppSelector((state) => state.chats.activeId);

  return (
    <nav className="absolute top-0 flex h-[55px] w-full items-center justify-center border-b-2 border-mirage-700">
      <h1 className="text-center ">{chats?.activeChatId.summary ?? "Chat"}</h1>
    </nav>
  );
}
