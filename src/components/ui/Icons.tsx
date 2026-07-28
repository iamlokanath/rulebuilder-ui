interface IconProps {
  className?: string;
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconEdit({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4 14.5V16h1.5L14 7.5 12.5 6 4 14.5zM15.2 5.3l-1.5-1.5 1.1-1.1a1 1 0 011.4 0l1.1 1.1a1 1 0 010 1.4l-1.1 1.1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconGrip({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <circle cx="7" cy="6" r="1.2" />
      <circle cx="13" cy="6" r="1.2" />
      <circle cx="7" cy="10" r="1.2" />
      <circle cx="13" cy="10" r="1.2" />
      <circle cx="7" cy="14" r="1.2" />
      <circle cx="13" cy="14" r="1.2" />
    </svg>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M15.5 11.2A6.2 6.2 0 018.8 4.5 6.5 6.5 0 1015.5 11.2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSun({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.6 4.6l1.3 1.3M14.1 14.1l1.3 1.3M15.4 4.6l-1.3 1.3M5.9 14.1l-1.3 1.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBraceOpen({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 20" fill="none" className={className} aria-hidden>
      <path
        d="M10 3c-2.5 0-3.5 1.4-3.5 3.2v2.1C6.5 10 5 10.8 5 12s1.5 2 1.5 3.7v1.1C6.5 18.6 7.5 20 10 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBraceClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 20" fill="none" className={className} aria-hidden>
      <path
        d="M6 3c2.5 0 3.5 1.4 3.5 3.2v2.1C9.5 10 11 10.8 11 12s-1.5 2-1.5 3.7v1.1C9.5 18.6 8.5 20 6 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
