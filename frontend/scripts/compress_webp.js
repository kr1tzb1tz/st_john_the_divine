#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DEFAULT_MAX_SIZE_KB = 500;
const MIN_QUALITY = 20;
const QUALITY_STEP = 10;

async function compressWebp(inputPath, maxSizeKB = DEFAULT_MAX_SIZE_KB) {
  const ext = path.extname(inputPath).toLowerCase();
  if (ext !== ".webp") {
    console.error(`Skipping ${inputPath}: not a webp file`);
    return false;
  }

  const originalSize = fs.statSync(inputPath).size;
  const originalSizeKB = originalSize / 1024;

  if (originalSizeKB <= maxSizeKB) {
    console.log(`${inputPath}: ${originalSizeKB.toFixed(1)}KB - already under ${maxSizeKB}KB`);
    return true;
  }

  console.log(`${inputPath}: ${originalSizeKB.toFixed(1)}KB - compressing...`);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  let quality = 80;
  let scale = 1;

  while (quality >= MIN_QUALITY) {
    const width = Math.round(metadata.width * scale);
    const buffer = await sharp(inputPath)
      .resize(width)
      .webp({ quality })
      .toBuffer();

    const newSizeKB = buffer.length / 1024;

    if (newSizeKB <= maxSizeKB) {
      await sharp(buffer).toFile(inputPath);
      console.log(`  -> ${newSizeKB.toFixed(1)}KB (quality: ${quality}, scale: ${(scale * 100).toFixed(0)}%)`);
      return true;
    }

    // Try reducing quality first
    if (quality > MIN_QUALITY) {
      quality -= QUALITY_STEP;
    } else if (scale > 0.5) {
      // Then try scaling down
      scale -= 0.1;
      quality = 80;
    } else {
      break;
    }
  }

  // Final attempt with minimum settings
  const buffer = await sharp(inputPath)
    .resize(Math.round(metadata.width * 0.5))
    .webp({ quality: MIN_QUALITY })
    .toBuffer();

  await sharp(buffer).toFile(inputPath);
  const finalSizeKB = buffer.length / 1024;
  console.log(`  -> ${finalSizeKB.toFixed(1)}KB (minimum settings applied)`);

  return finalSizeKB <= maxSizeKB;
}

async function compressDirectory(dirPath, maxSizeKB) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.error(`Directory not found: ${dirPath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath);
  const webpFiles = files.filter((f) => path.extname(f).toLowerCase() === ".webp");

  if (webpFiles.length === 0) {
    console.log("No webp files found in directory");
    return;
  }

  console.log(`Found ${webpFiles.length} webp file(s)\n`);

  for (const file of webpFiles) {
    await compressWebp(path.join(dirPath, file), maxSizeKB);
  }

  console.log("\nDone!");
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: compress_webp.js <path> [options]

Compresses webp files to be under a target size by reducing quality and/or dimensions.

Arguments:
  path              File or directory to compress

Options:
  -s, --size        Max file size in KB (default: ${DEFAULT_MAX_SIZE_KB})
  -h, --help        Show this help message

Examples:
  compress_webp.js ./images                     Compress all webp files under ${DEFAULT_MAX_SIZE_KB}KB
  compress_webp.js ./photo.webp                 Compress single file
  compress_webp.js ./images -s 200              Compress to under 200KB
`);
    process.exit(0);
  }

  const inputPath = args[0];
  let maxSizeKB = DEFAULT_MAX_SIZE_KB;

  for (let i = 1; i < args.length; i++) {
    if ((args[i] === "-s" || args[i] === "--size") && args[i + 1]) {
      maxSizeKB = parseInt(args[i + 1], 10);
      if (isNaN(maxSizeKB) || maxSizeKB < 1) {
        console.error("Size must be a positive number");
        process.exit(1);
      }
      i++;
    }
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Path not found: ${inputPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(inputPath);

  if (stat.isDirectory()) {
    await compressDirectory(inputPath, maxSizeKB);
  } else if (stat.isFile()) {
    await compressWebp(inputPath, maxSizeKB);
  } else {
    console.error("Path is neither a file nor directory");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
