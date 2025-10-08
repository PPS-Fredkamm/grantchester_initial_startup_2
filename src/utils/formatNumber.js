// ========================================
// formatNumber
// ----------------------------------------
// Converts large numeric values into a
// comma-separated, human-readable format.
// Example: 56677654 -> "56,677,654"
// ========================================

export function formatNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return "0";
  return Number(value).toLocaleString("en-US");
}

// ========================================
// formatCurrency
// ----------------------------------------
// Formats a numeric value into USD currency.
// Example: 1234567.89 -> "$1,234,567.89"
// ========================================

export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return "$0.00";
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}