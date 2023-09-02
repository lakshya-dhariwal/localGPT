import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./lib/hooks/redux";
import { useEffect, useState } from "react";
import { SideBar } from "./components/Sidebar";
import { createChat, switchChat } from "./features/chat";

function App() {
  const state = useAppSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!state.chats.activeId) {
      const firstChat = Object.values(state.chats.chats)[0];

      if (!firstChat) {
        dispatch(createChat({ preamble: state.settings.preamble }));
      } else {
        dispatch(switchChat({ id: firstChat.id }));
      }
      return;
    }

    if (!location.pathname.includes(state.chats.activeId)) {
      navigate(`/${state.chats.activeId}`, { replace: true });
    }
  }, [
    dispatch,
    location.pathname,
    navigate,
    state.chats.activeId,
    state.chats.chats,
    state.settings.preamble,
  ]);

  return (
    <div className="app">
      <SideBar />
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export { App };
