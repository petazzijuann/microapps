import Link from "next/link";
import type { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
  ariaLabel?: string;
  id?: string;
};

type LinkVariant = BaseProps & {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
};

type ButtonVariant = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type GlowButtonProps = LinkVariant | ButtonVariant;

const sizeClasses: Record<"md" | "lg", string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function GlowButton(props: GlowButtonProps) {
  const { children, className = "", size = "lg", ariaLabel, id } = props;

  const innerClasses = [
    "flex items-center justify-center gap-2 rounded-full bg-background font-medium text-foreground",
    "transition-colors duration-200 hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed",
    sizeClasses[size],
    className,
  ].join(" ");

  if (props.href) {
    return (
      <Link id={id} href={props.href} aria-label={ariaLabel} className="neon-aura inline-block">
        <span className={innerClasses}>{children}</span>
      </Link>
    );
  }

  return (
    <span id={id} className="neon-aura inline-block">
      <button
        type={props.type ?? "button"}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={ariaLabel}
        className={innerClasses}
      >
        {children}
      </button>
    </span>
  );
}
