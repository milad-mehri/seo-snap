require('dotenv').config();
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function testHuggingFace() {
  try {
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: 'How are you?',
    });

    console.log(response.generated_text);
  } catch (error) {
    console.error('Error:', error);
  }
}

testHuggingFace();
