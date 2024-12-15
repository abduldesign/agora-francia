
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {FormatMoney} from 'format-money-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatCurrency ( input:string): string {

  const fm = new FormatMoney({
    decimals: 2
  });

  const money = +input 
  const formatedValue = fm.from(money, { symbol: '₦' })
  return `${formatedValue}`
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}




