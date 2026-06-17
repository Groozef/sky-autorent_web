/**
 * Оптимизация GLB модели через @gltf-transform (лучше gltf-pipeline — активнее поддерживается).
 *
 * Использование:
 *   npm run optimize:model
 *   npm run optimize:model -- public/models/maserati.glb
 */
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

const input = process.argv[2] ?? "public/models/maserati.glb";
const parsed = path.parse(input);
const output = path.join(parsed.dir, `${parsed.name}.optimized.glb`).replace(/\\/g, "/");

if (!existsSync(input)) {
  console.error(`File not found: ${input}`);
  console.error("Place your .glb in public/models/ and run again.");
  process.exit(1);
}

const before = statSync(input).size;
console.log(`Input:  ${input} (${(before / 1024 / 1024).toFixed(1)} MB)`);
console.log(`Output: ${output}`);
console.log("Optimizing (Draco + meshopt + texture resize)...");

try {
  execSync(
    `npx gltf-transform optimize "${input.replace(/\\/g, "/")}" "${output}" --compress draco --texture-compress webp --texture-size 1024`,
    { stdio: "inherit" },
  );
} catch {
  console.error("Optimization failed.");
  process.exit(1);
}

const after = statSync(output).size;
const saved = ((1 - after / before) * 100).toFixed(0);
console.log(`\nDone: ${(after / 1024 / 1024).toFixed(1)} MB (−${saved}%)`);
console.log(`\nUpdate .env:`);
console.log(`NEXT_PUBLIC_MODEL_3D_PATH=${output.replace(/^public/, "")}`);
