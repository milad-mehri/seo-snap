let { getChanges } = require("./src/getChanges");
require("dotenv").config();
const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function testHuggingFace() {
  try {
    const response = await hf.textGeneration({
      model: "gpt2",
      inputs: `This is the changes that occured in github "${await getChanges()}" Write a note and a title summarizing this. The title should be less than 50 characters.`,
    });

    console.log(response.generated_text);
  } catch (error) {
    console.error("Error:", error);
  }
}

testHuggingFace();
