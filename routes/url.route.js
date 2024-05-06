import { Router } from 'express';
import { generateNewShortUrl, getOriginalUrl, getAnalytics } from '../controllers/url.controller.js';

const router = Router();

router.post('/', generateNewShortUrl).get('/:shortId', getOriginalUrl).get('/analytics/:shortId', getAnalytics);

export default router;
