const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const validator = require("html-validator");

export const analyze = async (url) => {
  let score = {};
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const metaTitle = $("title").text();
    score["metaTitle"] = metaTitle ? [100] : [0, "Missing"];

    const metaDescription = $('meta[name="description"]').attr("content");
    score["metaDescription"] = metaDescription ? [100] : [0, "Missing"];

    const metaKeywords = $('meta[name="keywords"]').attr("content");
    score["metaKeywords"] = metaKeywords ? [100] : [0, "Missing"];

    const goodDescription = metaDescription && metaDescription.length <= 140;
    score["goodDescription"] = goodDescription ? [100] : [0, "Too long"];

    const unfurlImage = $('meta[property="og:image"]').attr("content");
    score["unfurlImage"] = unfurlImage ? [100] : [0, "Missing"];

    const twitterImage = $('meta[name="twitter:image"]').attr("content");
    score["twitterImage"] = twitterImage ? [100] : [0, "Missing"];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    const pageLoadTime =
      performanceTiming.loadEventEnd - performanceTiming.navigationStart;
    await browser.close();

    score["pageLoadTime"] = [
      100 - Math.min(pageLoadTime / 100, 100),
      `Page load time (ms): ${pageLoadTime}`,
    ];

    const validationOptions = {
      format: "json",
      data,
    };

    const validationResult = await validator(validationOptions);
    const validationErrors = validationResult.messages.filter(
      (msg) => msg.type === "error"
    ).length;

    score["W3CValidation"] =
      validationErrors === 0
        ? [100, "No validation errors"]
        : [100 - validationErrors, `${validationErrors} validation errors`];

    const viewport = $('meta[name="viewport"]').attr("content");
    score["mobileFriendliness"] = viewport
      ? [100, "Viewport tag present"]
      : [0, "No viewport tag"];

    const ariaRoles = $("[role]");
    score["accessibility"] = ariaRoles.length
      ? [100, `ARIA roles present: ${ariaRoles.length}`]
      : [0, "No ARIA roles"];


    const images = $("img");
    const imagesWithoutAlt = images.filter((_, img) => !$(img).attr("alt")).length;
    score["imagesWithoutAlt"] = imagesWithoutAlt === 0 ? [100, "All images have alt attributes"] : [100 - (imagesWithoutAlt / images.length) * 100, `${imagesWithoutAlt} images missing alt attributes`];

    const h1Count = $("h1").length;
    score["headings"] = h1Count === 1 ? [100, "One H1 heading present"] : [0, `Found ${h1Count} H1 headings`];

    const internalLinks = $('a[href^="/"], a[href^="#"]');
    const externalLinks = $('a[href^="http"], a[href^="//"]');
    score["internalLinks"] = [100, `${internalLinks.length} internal links`];
    score["externalLinks"] = [100, `${externalLinks.length} external links`];

    score["https"] = url.startsWith("https") ? [100, "Uses HTTPS"] : [0, "Does not use HTTPS"];

    const canonical = $('link[rel="canonical"]').attr("href");
    score["canonicalTag"] = canonical ? [100, "Canonical tag present"] : [0, "Canonical tag missing"];

    try {
      await axios.get(new URL("/robots.txt", url).toString());
      score["robotsTxt"] = [100, "robots.txt present"];
    } catch {
      score["robotsTxt"] = [0, "robots.txt missing"];
    }

    try {
      await axios.get(new URL("/sitemap.xml", url).toString());
      score["sitemapXml"] = [100, "sitemap.xml present"];
    } catch {
      score["sitemapXml"] = [0, "sitemap.xml missing"];
    }

    const favicon = $('link[rel="icon"]').attr("href");
    score["favicon"] = favicon ? [100, "Favicon present"] : [0, "Favicon missing"];

  } catch (e) {
    score["Link invalid"] = [0, "Error"];
  }
  return score;
};
