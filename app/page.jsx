import fs from "fs";
import path from "path";

function extractBody() {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<script\s+src=["']app\.js["']><\/script>\s*<\/body>/i);
  return bodyMatch ? bodyMatch[1] : "";
}

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: extractBody() }} />;
}