import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

export function createStaticServer(root) {
  return createServer(async (request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch {
      response.writeHead(400).end("Endereço inválido");
      return;
    }

    const file = resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
    if (relative(root, file).startsWith("..")) {
      response.writeHead(403).end();
      return;
    }

    try {
      const body = await readFile(file);
      response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Página não encontrada");
    }
  });
}
