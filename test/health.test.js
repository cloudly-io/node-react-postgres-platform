import { after, test } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import app from "../src/app.js";

const server = app.listen(0);
await once(server, "listening");

const baseUrl = `http://127.0.0.1:${server.address().port}`;

after(() => {
  server.close();
});

test("GET /api/health returns ok", async () => {
  const response = await fetch(`${baseUrl}/api/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("GET /api/health/live returns alive", async () => {
  const response = await fetch(`${baseUrl}/api/health/live`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "alive" });
});
