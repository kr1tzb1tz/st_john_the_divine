const fs = require("fs");
const path = require("path");

const baseUrl = "https://stjohngochurch.org";
const currentDate = new Date().toISOString().split("T")[0];

const pages = [
  {
    url: "",
    priority: "1.0",
    changefreq: "weekly",
  },
  //{
  //url: "/ministries",
  //priority: "0.8",
  //changefreq: "monthly",
  //},
  //{
  //url: "/clergy",
  //priority: "0.8",
  //changefreq: "yearly",
  //},
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(sitemapPath, sitemap, "utf8");
console.log(`✅ Generated sitemap.xml with date: ${currentDate}`);
