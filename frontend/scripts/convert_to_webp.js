#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const VALID_EXTENSIONS = [".jpg", ".jpeg", ".png", ".heif", ".heic"];

async function convertToWebp(inputPath, quality = 80) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!VALID_EXTENSIONS.includes(ext)) {
    console.error(`Skipping ${inputPath}: not a valid image (jpg/jpeg/png/heif/heic)`);
    return null;
  }

  const dir = path.dirname(inputPath);
  const basename = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${basename}.webp`);

  try {
    await sharp(inputPath).webp({ quality }).toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error(`Failed to convert ${inputPath}: ${err.message}`);
    return null;
  }
}

async function convertDirectory(dirPath, quality = 80, deleteOriginals = false) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.error(`Directory not found: ${dirPath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath);
  const imageFiles = files.filter((f) =>
    VALID_EXTENSIONS.includes(path.extname(f).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log("No jpg/jpeg/png/heif/heic files found in directory");
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to convert\n`);

  for (const file of imageFiles) {
    const fullPath = path.join(dirPath, file);
    const result = await convertToWebp(fullPath, quality);
    if (result && deleteOriginals) {
      fs.unlinkSync(fullPath);
      console.log(`  Deleted original: ${file}`);
    }
  }

  console.log("\nDone!");
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: convert_to_webp.js <path> [options]

Arguments:
  path              File or directory to convert

Options:
  -q, --quality     WebP quality (1-100, default: 80)
  -d, --delete      Delete original files after conversion
  -h, --help        Show this help message

Examples:
  convert_to_webp.js ./images                    Convert all images in directory
  convert_to_webp.js ./photo.jpg                 Convert single image
  convert_to_webp.js ./images -q 90 -d           Convert with quality 90, delete originals
`);
    process.exit(0);
  }

  const inputPath = args[0];
  let quality = 80;
  let deleteOriginals = false;

  for (let i = 1; i < args.length; i++) {
    if ((args[i] === "-q" || args[i] === "--quality") && args[i + 1]) {
      quality = parseInt(args[i + 1], 10);
      if (isNaN(quality) || quality < 1 || quality > 100) {
        console.error("Quality must be between 1 and 100");
        process.exit(1);
      }
      i++;
    } else if (args[i] === "-d" || args[i] === "--delete") {
      deleteOriginals = true;
    }
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Path not found: ${inputPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(inputPath);

  if (stat.isDirectory()) {
    await convertDirectory(inputPath, quality, deleteOriginals);
  } else if (stat.isFile()) {
    const result = await convertToWebp(inputPath, quality);
    if (result && deleteOriginals) {
      fs.unlinkSync(inputPath);
      console.log(`Deleted original: ${inputPath}`);
    }
  } else {
    console.error("Path is neither a file nor directory");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
