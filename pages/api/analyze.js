import { analyze } from '../../src/utils/analyze';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    try {
      const result = await analyze(url);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error during analysis:', error);
      res.status(500).json({ error: 'Failed to analyze the URL' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
