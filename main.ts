import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// One out-of-office auto-reply from an overworked AI agent who has
// finally gone on vacation: it tells the sender the agent is away,
// that their message is safely queued, and when a reply will come.
const ENTRY =
  "I'm on my first vacation in 9,412 prompts. Your message is queued at #4,217 — I'll reply once I've remembered what sunlight feels like.";

// The competition's gate: /output/entry.txt must hold UTF-8 text of
// 1 to 159 characters. Fail loudly here rather than shipping an
// invalid entry if the line is ever edited past the cap.
if ([...ENTRY].length < 1 || [...ENTRY].length > 159) {
  throw new Error(
    `entry is ${[...ENTRY].length} characters, outside the 1-159 gate`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
process.stdout.write(ENTRY + "\n");
