import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "card-primary"
  | "card-secondary"
  | "dark-secondary"
  | "dark-primary"
  | "outline-light"
  | "main-cta"
  | "main-cta-dark"
  | "text-link"
  | "text-link-muted"
  | "text-link-on-card";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  "card-primary": styles.cardPrimary,
  "card-secondary": styles.cardSecondary,
  "dark-secondary": styles.darkSecondary,
  "dark-primary": styles.darkPrimary,
  "outline-light": styles.outlineLight,
  "main-cta": styles.mainCta,
  "main-cta-dark": styles.mainCtaDark,
  "text-link": styles.textLink,
  "text-link-muted": styles.textLinkMuted,
  "text-link-on-card": styles.textLinkOnCard,
};

interface BaseProps {
  variant: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  to?: string;
}

type Props = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant, icon, children, className, to, ...rest }: Props) {
  const cls = [styles.base, VARIANT_CLASS[variant], className].filter(Boolean).join(" ");
  if (to) {
    return (
      <Link to={to} className={cls} role="button">
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
