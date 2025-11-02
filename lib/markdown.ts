import fs from "fs";
import path from "path";

export function loadGuideMarkdown(fileName: string) {
  const full = path.join(process.cwd(), "data", "guides", "content", fileName);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, "utf8");
}
