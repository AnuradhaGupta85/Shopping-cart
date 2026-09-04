export function validateRequired(value: string, label: string): string {
  return value.trim() ? '' : `${label} is required.`
}

export function validateEmail(value: string): string {
  if (!value.trim()) return 'Email is required.'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address.'
}

export function validateCardNumber(value: string): string {
  if (!value.trim()) return 'Card number is required.'
  return /^\d{16}$/.test(value.replace(/\s/g, '')) ? '' : 'Enter a valid 16-digit card number.'
}

export function validatePassword(value: string): string {
  if (!value) return 'Password is required.'
  return value.length >= 8 ? '' : 'Use at least 8 characters.'
}
