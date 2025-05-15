
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithLeadingZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
}
