// =====================================================
// Date Formatting Utility
// =====================================================
// Converts ISO date strings to a more readable format
// Example: "2025-01-01T00:00:00Z" -> "January 1, 2025"
// If input is invalid or empty, returns an empty string
// =====================================================

export function formatDate(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
