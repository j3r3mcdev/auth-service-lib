// Tags dangereux
export const TAG_PATTERNS = [
  "<script",
  "</script",
  "<img",
  "<svg",
  "<iframe",
  "<object",
  "<embed",
  "<link",
  "<meta",
];

// Attributs dangereux
export const ATTR_PATTERNS = [
  "onerror=",
  "onload=",
  "onclick=",
  "onfocus=",
  "onmouseover=",
  "onmouseenter=",
  "oninput=",
  "onchange=",
];

// Protocoles dangereux
export const PROTOCOL_PATTERNS = ["javascript:", "data:text/html", "vbscript:"];

// Encodages XSS
export const ENCODED_PATTERNS = [
  "%3Cscript",
  "%3Cimg",
  "&#x3c;script",
  "&lt;script",
];

// Payloads connus
export const PAYLOAD_PATTERNS = [
  "<script>alert(",
  "alert(",
  "prompt(",
  "confirm(",
];

// Export global
export const XSS_PATTERNS = [
  ...TAG_PATTERNS,
  ...ATTR_PATTERNS,
  ...PROTOCOL_PATTERNS,
  ...ENCODED_PATTERNS,
  ...PAYLOAD_PATTERNS,
];
