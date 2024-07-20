import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPasskey } from '../../lib/actions/media_expert.actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const passkey = req.query.passkey as string;

    if (!passkey) {
      return res.status(400).json({ error: 'Passkey is required' });
    }

    const userId = await verifyPasskey(passkey);

    if (userId) {
      res.status(200).json({ userId });
    } else {
      res.status(400).json({ error: 'Invalid passkey' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}