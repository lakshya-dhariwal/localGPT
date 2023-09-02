import { DetailedHTMLProps } from "react";

interface IconButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
}

export function IconButton({ children, className, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      className={`flex aspect-square items-center justify-center rounded-full bg-[#32333E] p-2 shadow-sm transition-colors hover:bg-mirage-600 active:bg-mirage-800 ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
}
