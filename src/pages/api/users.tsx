import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient, mapUserProfiles } from '@/utils';
import config from '@/config';


export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method === 'GET') {
        try {
            const { searchTerm, page, limit } = req.query || {}
            if (!searchTerm) {
                return res.status(400).json({ message: 'Missing searchTerm query parameter' });
            }

            const result = await apiClient.get(`${config.api.usersUrlPath}?q=${searchTerm || ''}&page=${page || ''}&per_page=${limit || ''}`)

         res.status(200).json(mapUserProfiles(result?.data?.items || []))
        } catch (error) {
            console.error(error);
            res.status(500).json({ error });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}