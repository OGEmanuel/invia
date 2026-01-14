import { clsx, type ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthenticated = () => {
  return Boolean(Cookies.get('rf'));
};

export function formatDateToShortMonth(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatDateToFullWithWeekday(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function scrollToFirstError(form: any, offset = 120) {
  const entries = Object.entries(form.state.fieldMeta) as [
    string,
    { errors: unknown[] },
  ][];

  const firstErrorEntry = entries.find(([, meta]) => meta.errors.length > 0);

  if (!firstErrorEntry) return;

  const [fieldName] = firstErrorEntry;

  const input = document.querySelector(
    `[name="${CSS.escape(fieldName)}"]`,
  ) as HTMLElement | null;

  if (!input) return;

  const y = input.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: 'smooth' });
  input.focus();
}

export function parseExpiryToMs(text: string): number {
  const lower = text.toLowerCase();

  const numberMatch = lower.match(/\d+/);
  if (!numberMatch) return 60_000; // fallback: 1 min

  const value = parseInt(numberMatch[0], 10);

  if (lower.includes('second')) return value * 1000;
  if (lower.includes('minute')) return value * 60_000;
  if (lower.includes('hour')) return value * 3_600_000;
  if (lower.includes('day')) return value * 86_400_000;

  return 60_000; // fallback
}

export const scrollToBottom = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;

      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    });
  });
};
