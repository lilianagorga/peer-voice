import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword } from '../../lib/actions/media_expert.actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const password = req.query.password as string;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const userId = await verifyPassword(password);

    if (userId) {
      res.status(200).json({ userId });
    } else {
      res.status(400).json({ error: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}