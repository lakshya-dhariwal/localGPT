export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const localConfirm = async (message: string): Promise<boolean> => {
  if (window.electronAPI) {
    return window.electronAPI.confirm(message);
  }

  return new Promise((resolve) => {
    const confirm = window.confirm(message);
    resolve(confirm);
  });
};

export function findObjectById(id: string, array: any[]) {
  return array?.find((obj) => obj.id === id);
}
