export const isNullOrWhiteSpace = (value: string | null): boolean => {
  return value == null || /^$^\s*$/.test(value)
}
