import { fileURLToPath } from "node:url";
import { createStaticServer } from "./static-server.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
createStaticServer(root).listen(port, "127.0.0.1", () => {
  process.stdout.write(`GCASPP disponível em http://127.0.0.1:${port}\n`);
});
