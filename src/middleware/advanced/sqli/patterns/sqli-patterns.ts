// Catégorie 1 : Boolean-based SQLi
export const BOOLEAN_PATTERNS = [
  " or 1=1",
  "' or '1'='1",
  '" or "1"="1',
  " or true--",
  " and 1=1",
];

// Catégorie 3 : Union-based SQLi
export const UNION_PATTERNS = [
  "union select",
  "union all select",
  "union distinct",
];

// Catégorie 4 : Error-based SQLi
export const ERROR_PATTERNS = [
  "extractvalue(",
  "updatexml(",
  "floor(rand(",
  "benchmark(",
];

// Catégorie 5 : Time-based SQLi
export const TIME_PATTERNS = ["sleep(", "pg_sleep(", "waitfor delay"];

// Catégorie 6 : Stack queries
export const STACKED_PATTERNS = [
  "; select",
  "; drop",
  "; insert",
  "; update",
  "; delete",
];

// Catégorie 7 : Dangerous SQL sequences (PAS de mots isolés)
export const KEYWORD_PATTERNS = [
  "select * from",
  "insert into",
  "update ",
  "delete from",
  "drop table",
  "alter table",
  "create table",
  "exec ",
  "xp_cmdshell",
];

// Export global
export const SQLI_PATTERNS = [
  ...BOOLEAN_PATTERNS,
  ...UNION_PATTERNS,
  ...ERROR_PATTERNS,
  ...TIME_PATTERNS,
  ...STACKED_PATTERNS,
  ...KEYWORD_PATTERNS,
];
