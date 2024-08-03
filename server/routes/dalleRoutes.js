import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const { size } = req.body;
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: size,
      response_format: 'b64_json',
    });

    // const image = response.data.data[0].b64_json;
    // res.status(200).json({ photo: image });
    // res.json({photo: response.data})

    res.send({ photo: response.data[0].b64_json })

  } catch (error) {
    console.error("error:", error);
    res.status(500).send(error);
  }
});

export default router;