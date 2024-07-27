const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const validator = require("html-validator");

export const analyze = async (url) => {
    console.log (url)
  let score = {};
  try {
    // Get important data
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Meta and title tags
    const metaTitle = $("title").text();
    score["metaTitle"] = metaTitle ? [100] : [0, "Missing"];

    const metaDescription = $('meta[name="description"]').attr("content");
    score["metaDescription"] = metaDescription ? [100] : [0, "Missing"];

    const metaKeywords = $('meta[name="keywords"]').attr("content");
    score["metaKeywords"] = metaKeywords ? [100] : [0, "Missing"];

    const goodDescription = metaDescription && metaDescription.length <= 140;
    score["goodDescription"] = goodDescription ? [100] : [0, "Too long"];

    // Thumbnails
    const unfurlImage = $('meta[property="og:image"]').attr("content");
    score["unfurlImage"] = unfurlImage ? [100] : [0, "Missing"];

    const twitterImage = $('meta[name="twitter:image"]').attr("content");
    score["twitterImage"] = twitterImage ? [100] : [0, "Missing"];

    // Image optimization
    //   const images = $("img");
    //   let imagesWithoutAlt = 0;
    //   let imagesWithoutCaption = 0;

    //   images.each((_, img) => {
    //     if (!$(img).attr("alt")) imagesWithoutAlt++;
    //     if (!$(img).attr("title")) imagesWithoutCaption++;
    //   });

    //   score["imagesWithoutAlt"] =
    //     images.length > 0
    //       ? [
    //           ((images.length - imagesWithoutAlt) / images.length) * 100,
    //           `Missing alt: ${imagesWithoutAlt}`,
    //         ]
    //       : [0, "No images"];
    //   score["imagesWithoutCaption"] =
    //     images.length > 0
    //       ? [
    //           ((images.length - imagesWithoutCaption) / images.length) * 100,
    //           `Missing captions: ${imagesWithoutCaption}`,
    //         ]
    //       : [0, "No images"];

    // Section tags for nav bar items ?

    // Hyperlinks and button tags ?

    // Image size and URL shorteners ?

    // Page Loading Speed

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

    // W3C Validation
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

    // Mobile-Friendliness
    const viewport = $('meta[name="viewport"]').attr("content");
    score["mobileFriendliness"] = viewport
      ? [100, "Viewport tag present"]
      : [0, "No viewport tag"];

    // Accessibility Checks
    const ariaRoles = $("[role]");
    score["accessibility"] = ariaRoles.length
      ? [100, `ARIA roles present: ${ariaRoles.length}`]
      : [0, "No ARIA roles"];
  } catch (e) {
    // console.log(e)
    score["Link invalid"] = [0, "Error"];
  }
  return score;
};

// const websiteUrl = "https://milad-mehri.github.io/";
// analyze(websiteUrl).then((score) => console.log(score));
