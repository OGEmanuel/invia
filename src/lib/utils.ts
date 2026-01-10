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
