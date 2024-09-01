import express from 'express';
import { getGallery } from '../controllers/galleryController.js';

const router = express.Router();

router.get('/' , getGallery)
// router.get('/:id' , getPost)
// router.post('/' , addPost)
// router.delete('/:id' ,deletePost )
// router.put('/:id' , updatePost)

export default router;