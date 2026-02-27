import type { Scenario } from "../types";
import { S01 } from "./S01";
import { S02 } from "./S02";
import { S03 } from "./S03";
import { S04 } from "./S04";
import { S05 } from "./S05";

export const scenarios: Scenario[] = [S01, S02, S03, S04, S05];

export const scenarioMap: Record<string, Scenario> = Object.fromEntries(
  scenarios.map((s) => [s.id, s])
);

export { S01, S02, S03, S04, S05 };
