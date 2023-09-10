import { useAppDispatch, useAppSelector } from "@src/lib/hooks/redux";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { HiDownload } from "react-icons/hi";
import { IconButton } from "../components/IconButton";
import { Button } from "@src/components/Button";
import {
  setModel,
  setPreamble,
  setShiftKey,
  setShowPreamble,
} from "@src/features/settings";
import { createToast } from "@src/features/toasts/thunks";
import { CHATGPT_MODELS, ChatGPTModel } from "@src/lib/constants/openai";
import { MODELS } from "@src/lib/constants/models";
import { ModelCard } from "@src/components/ModelCard";

type SettingItemProps = {
  label?: string;
  labelFor?: string;
  help?: JSX.Element;
  children: React.ReactNode;
};

export function SettingItem({
  label,
  labelFor,
  help,
  children,
}: SettingItemProps) {
  const labelClasses = classNames({
    "absolute top-0": !!help,
  });

  return (
    <div className="mb-4 flex flex-col">
      {(!!help || !!label) && (
        <div className="relative mb-2 flex flex-col">
          {label && (
            <label className={labelClasses} htmlFor={labelFor}>
              {label}:
            </label>
          )}
          {help && (
            <details className="top-0 z-10 w-full self-end">
              <summary className="text-right hover:cursor-pointer">?</summary>
              <div className="italic text-mirage-500">{help}</div>
            </details>
          )}
        </div>
      )}

      {children}
    </div>
  );
}

export function SettingsPage() {
  const dispatch = useAppDispatch();

  const preamble = useAppSelector((state) => state.settings.preamble);
  const model = useAppSelector((state) => state.settings.model);
  const shiftSend = useAppSelector((state) => state.settings.shiftSend);
  const showPreambleMessage = useAppSelector(
    (state) => state.settings.showPreamble
  );

  const navigate = useNavigate();
  console.log({ model });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const preambleForm = formData.get("preamble");
    const modelForm = e.currentTarget.elements.model.value;
    const shiftSendForm = formData.get("shiftSend");
    const showPreambleMessageForm = formData.get("preamble-message");

    if (preambleForm) {
      dispatch(setPreamble({ preamble: preambleForm.toString() }));
    }
    if (modelForm) {
      dispatch(setModel({ model: modelForm }));
    }

    dispatch(
      setShiftKey({
        shiftSend: shiftSendForm?.toString() === "on" ? true : false,
      })
    );

    dispatch(
      setShowPreamble({
        show: showPreambleMessageForm?.toString() === "on" ? true : false,
      })
    );

    dispatch(
      createToast({
        message: "Settings saved!",
        duration: 2000,
        type: "success",
      })
    );
  };

  return (
    <div className="m-auto max-w-3xl px-4 py-4">
      <div className="relative">
        <IconButton
          onClick={() => {
            navigate("/");
          }}
          aria-label="Go Back"
          className="right-full top-0 mb-2 md:absolute md:ml-0 md:mr-4 "
        >
          <FiChevronLeft size={20} />
        </IconButton>
        <h1 className="mb-4 text-2xl">Settings</h1>
      </div>
      <div className="mb-5">
        <h2>Download Model:</h2>
        <div className="mt-1 grid grid-cols-1 gap-2 lg:grid-cols-2">
          {MODELS.map((model) => (
            <ModelCard key={model.id} {...model} />
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto">
        <SettingItem
          label="Model file"
          labelFor="modelFile"
          help={
            <p>Set the downloaded GGML based model file local location here</p>
          }
        >
          <label htmlFor="model" className="rounded-md bg-mirage-700 p-1 px-2">
            <span>{typeof model === "string" ? model : "No File Chosen"}</span>
            <input
              name="model"
              id="model"
              accept=".bin"
              type="file"
              className="hidden"
            />
          </label>
        </SettingItem>
        <SettingItem
          label="System Context"
          labelFor="preamble"
          help={
            <p>
              This is the preamble that will be send to your selected model as a
              system message. You can use this to set the context of the
              conversation and alter the personality of the bot.
            </p>
          }
        >
          <textarea
            className="rounded-md bg-mirage-700 p-1"
            name="preamble"
            id="preamble"
            rows={10}
            defaultValue={preamble}
          ></textarea>
        </SettingItem>

        <SettingItem>
          <div className="flex flex-row items-center">
            <label htmlFor="shiftSend">Press Shift + Enter to send:</label>
            <input
              defaultChecked={shiftSend}
              className="ml-2 rounded-md bg-mirage-700 transition-all checked:accent-green-700"
              type="checkbox"
              name="shiftSend"
              id="shiftSend"
            />
          </div>
        </SettingItem>
        <SettingItem>
          <div className="flex flex-row items-center">
            <label htmlFor="preamble-message">Show the preamble message:</label>
            <input
              defaultChecked={showPreambleMessage}
              className="ml-2 rounded bg-mirage-700 transition-all checked:accent-green-700"
              type="checkbox"
              name="preamble-message"
              id="preamble-message"
            />
          </div>
        </SettingItem>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
