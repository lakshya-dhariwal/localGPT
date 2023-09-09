import React from "react";
import { IModel } from "@src/types";
import { HiDownload } from "react-icons/hi";
import { Button } from "./Button";

export const ModelCard: React.FC<IModel> = (model) => {
  return (
    <div
      className="flex flex-col justify-between rounded-xl bg-mirage-600 p-3"
      key={model.id}
    >
      <div className="mb-2 flex justify-between">
        <h1>{model.name}</h1>{" "}
        <div className="flex h-fit">
          {" "}
          <span className="mx-1 rounded-full bg-brand p-1 px-2 text-xs text-mirage-800">
            {model.requiredRAM} RAM{" "}
          </span>
          <span className="mx-1 rounded-full bg-brand p-1 px-2 text-xs text-mirage-800">
            {model.requiredRAM}GB Size{" "}
          </span>
        </div>
      </div>
      <p className="mb-2 text-[12px] text-mirage-200">{model.description}</p>

      <Button>
        <HiDownload className="mr-1" />
        Download
      </Button>
    </div>
  );
};
