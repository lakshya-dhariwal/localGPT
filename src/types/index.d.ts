import type { ElectronAPI } from "../../electron/preload";

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

type IModel = {
  requiredRAM: string;
  name: string;
  id: string;
  description: string;
  downloadURL: string;
  fileSize: string;
  image?: string;
};
