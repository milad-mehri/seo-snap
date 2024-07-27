export const analyze = async (url) => {
  let score = {};

  // Get important data
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // Meta and title tags

  const metaTitle = $("title").text()
    ? (score["metaTitle"] = [100])
    : (score["metaTitle"] = [0, "Missing"]);
  const metaDescription = $('meta[name="description"]').attr("content")
    ? (score["metaTitle"] = [100])
    : (score["metaTitle"] = [0, "Missing"]);
  const metaKeywords = $('meta[name="keywords"]').attr("content")
    ? (score["metaDescription"] = [100])
    : (score["metaDescription"] = [0, "Missing"]);
  const goodDescription =
    metaDescription && metaDescription.length <= 140
      ? (score["goodDescription"] = [100])
      : (score["goodDescription"] = [0, "Too long"]);

      

};
