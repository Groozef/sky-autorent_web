const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] ?? char);
}

const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /data:text\/html/gi,
  /&#x?[0-9a-f]+;/gi,
];

export function sanitizeText(input: string, maxLength = 500): string {
  let value = input.trim().slice(0, maxLength);
  value = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  for (const pattern of DANGEROUS_PATTERNS) {
    value = value.replace(pattern, "");
  }
  return value;
}

export function sanitizePhone(input: string): string {
  return input.replace(/[^\d+\s()\-]/g, "").slice(0, 20).trim();
}

export function sanitizeEmail(input: string): string {
  return input.trim().toLowerCase().slice(0, 254);
}
