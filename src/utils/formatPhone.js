// ========================================
// formatPhone
// ----------------------------------------
// Formats a phone number string into a readable format.
// Example: "1234567890" -> "(123) 456-7890"
// If input is invalid or empty, returns an empty string
// ========================================

export function formatPhone(num) {
  if (!num) return "";
  const cleaned = num.replace(/\D/g, ""); // strip non-digits
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return num; // fallback if not 10 digits
}
