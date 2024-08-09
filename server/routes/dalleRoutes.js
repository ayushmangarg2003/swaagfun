import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});


dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const { size } = req.body;

    const input = {
      prompt: prompt,
      aspect_ratio: size
    };

    const response = await replicate.run("black-forest-labs/flux-schnell", { input });

    // const response = await openai.images.generate({
    //   model: "dall-e-3",
    //   prompt,
    //   n: 1,
    //   size: size,
    //   response_format: 'b64_json',
    // });

    // const image = response.data.data[0].b64_json;
    // res.status(200).json({ photo: image });
    res.json({ photo: response })
    // console.log(response);

    // res.send({ photo: response.data[0].b64_json })
    // res.send({ photo: response.data[0].b64_json })

  } catch (error) {
    console.error("error:", error);
    res.status(500).send(error);
  }
});

export default router;