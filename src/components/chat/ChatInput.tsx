import { capitalizeFirstLetter } from "@src/lib/util";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import { useCallback, ChangeEvent, useState, FormEvent } from "react";
import { IconButton } from "../IconButton";

import { FiSend } from "react-icons/fi";
import { useAppSelector } from "@src/lib/hooks/redux";
import { Button } from "../Button";
export type ChatInputValue = {
  role: ChatCompletionResponseMessageRoleEnum;
  draft: string;
};
export type ChatInputProps = {
  onChange?: (values: ChatInputValue) => void;
  onSubmit?: (values: ChatInputValue) => void;
  disabled?: boolean;
  draft?: string;
  sendAsRole: ChatCompletionResponseMessageRoleEnum;
};

export function ChatInput({
  onChange,
  draft,
  sendAsRole,
  onSubmit,
  disabled,
}: ChatInputProps) {
  const sendWithShiftEnter = useAppSelector(
    (state) => state.settings.shiftSend
  );
  const roleOptions = ["user", "system", "assistant"];

  const handleDraftChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange({ draft: e.target.value, role: sendAsRole });
    },
    [onChange, sendAsRole]
  );

  const handleSendAsRoleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange &&
        onChange({
          draft: draft ?? "",
          role: e.target.value as ChatCompletionResponseMessageRoleEnum,
        });
    },
    [onChange, draft]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (disabled) return;
      if (!draft) return;

      onSubmit && onSubmit({ draft, role: sendAsRole });
    },
    [disabled, draft, onSubmit, sendAsRole]
  );

  const handleResize = (event: FormEvent<HTMLTextAreaElement>) => {
    const el = event.currentTarget;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    if (e.shiftKey && !sendWithShiftEnter) {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const before = value.substring(0, start);
      const after = value.substring(end, value.length);
      const newValue = before + "\n" + after;
      textarea.selectionStart = start + 1;
      textarea.selectionEnd = start + 1;

      onChange && onChange({ draft: newValue, role: sendAsRole });
      handleResize(e as any);
      return;
    }

    e.preventDefault();
    handleSubmit(e as any);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pointer-events-none mx-auto max-w-2xl"
    >
      <div className="pointer-events-auto">
        <select
          name="chat-role"
          id="chat-role"
          value={sendAsRole}
          className="text-m rounded-md rounded-b-none bg-[#97B34D] p-1 font-semibold text-mirage-600"
          onChange={handleSendAsRoleChange}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {capitalizeFirstLetter(role)}
            </option>
          ))}
        </select>
      </div>
      <div className="pointer-events-auto relative flex  h-fit w-full  max-w-4xl flex-grow flex-row items-center  justify-center rounded-md rounded-tl-none border  border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] ">
        <textarea
          name="chat-input"
          id="chat-input"
          className="z-10  flex h-full w-full  resize-none items-center border-0 bg-transparent py-2 pl-5 text-[#343541]  dark:bg-transparent"
          value={draft}
          onChange={handleDraftChange}
          onKeyDown={handleKeyDown}
          onInput={handleResize}
          style={{
            height: "auto",
            maxHeight: "6em",
            resize: "none",
          }}
          rows={1}
        ></textarea>

        <button
          disabled={disabled}
          aria-label="Send Message"
          className={`m-0  flex  items-center justify-center p-0 px-2 text-mirage-800 hover:text-mirage-400   ${
            disabled && "pointer-events-none cursor-not-allowed"
          }`}
        >
          <FiSend size={20} />
        </button>
      </div>
    </form>
  );
}
