import { useAppSelector } from "@src/lib/hooks/redux";
import { findObjectById } from "@src/lib/util";
import { useMemo } from "react";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { Link } from "react-router-dom";

export function NavBar() {
  const chats = useAppSelector((state) => state.chats.chats);
  const activeChatId = useAppSelector((state) => state.chats.activeId);
  //chats?.activeChatId.summary ??
  return (
    <nav className="absolute top-0 flex h-[55px] w-full items-center justify-between border-b-2 border-mirage-700">
      <div className=""></div>
      <h1 className="text-center ">
        {chats.activeChatId ? chats?.activeChatId.summary : "New Chat"}
      </h1>
      <Link to="/settings">
        <div className="mr-4 cursor-pointer rounded-full bg-mirage-700 p-3 hover:bg-mirage-600">
          <MdOutlineSettingsSuggest />
        </div>
      </Link>
    </nav>
  );
}
