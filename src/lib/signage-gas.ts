import "server-only";

import { env } from "@/lib/env";

export type SignageArenaStatus = {
  day: 1 | 2;
  progress: number;
};

type GasResponse =
  | { ok: true; status: SignageArenaStatus }
  | { ok: false; error?: string };

function getConfig() {
  if (!env.SIGNAGE_GAS_URL || !env.SIGNAGE_GAS_SECRET) {
    throw new Error("SIGNAGE_GAS_URL and SIGNAGE_GAS_SECRET are required");
  }
  return {
    url: env.SIGNAGE_GAS_URL,
    secret: env.SIGNAGE_GAS_SECRET,
  };
}

async function callGas(body: Record<string, unknown>) {
  const config = getConfig();
  const response = await fetch(config.url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...body, secret: config.secret }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`GAS request failed with status ${response.status}`);
  }
  const result = (await response.json()) as GasResponse;
  if (!result.ok) {
    throw new Error(result.error ?? "GAS request failed");
  }
  return result.status;
}

export function getSignageArenaStatus() {
  return callGas({ action: "get" });
}

export function saveSignageArenaStatus(status: SignageArenaStatus) {
  return callGas({ action: "set", ...status });
}
