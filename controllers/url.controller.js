import ShortUniqueId from 'short-unique-id';
import { URL } from '../models/url.model.js';

export async function generateNewShortUrl(req, res) {
  const { randomUUID } = new ShortUniqueId({ length: 8 });
  const shortId = randomUUID();
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: 'url is required' });

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

export async function getOriginalUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  console.log(entry);

  res.redirect(entry.redirectURL);
}

export async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId,
  });
  return res.status(200).json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}
