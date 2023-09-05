import classNames from "classnames";
import { useState } from "react";
import { FiX, FiMenu, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ChatSelection } from "./ChatSelection";
import { IconButton } from "./IconButton";
import { LogoIcon } from "../assets/LogoIcon";

export function ChatSideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const classes = classNames(
    {
      "translate-x-0": isOpen,
      "-translate-x-full ": !isOpen,
    },
    "fixed left-0 top-0 bottom-0 w-72 transition-transform z-20  border-mirage-600  bg-mirage-900"
  );

  return (
    <>
      <div className="fixed left-0 top-0 z-30 p-2">
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          className=" p-2"
          aria-label={`${isOpen ? "Close" : "Open"} side menu`}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu fill="white" size={20} />}
        </IconButton>
      </div>
      <aside className={classes}>
        <div className="flex w-full items-center justify-center bg-[#303032] p-5">
          <LogoIcon fill="#97B34D" h={30} w={30} />{" "}
          <h1 className="ml-2 text-3xl font-semibold ">
            Local<span className="text-[#97B34D]">GPT</span>
          </h1>
        </div>
        <div className="flex h-full flex-col px-2 pt-14">
          <div className="flex-1 basis-full overflow-y-auto">
            <ChatSelection />
          </div>
          <div className="mx-2 flex-1 py-4">
            <Link to={"/settings"} aria-label="Settings">
              <FiSettings size={20} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
