import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type DirectionsResponse = {
  directions_routes?: any[];
  search_metadata?: {
    google_maps_directions_url?: string;
  };
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: '請提供起點與終點參數' });
  }

  const SERPAPI_KEY = '你的金鑰';
  const startStr = Array.isArray(start) ? start[0] : String(start);
  const endStr = Array.isArray(end) ? end[0] : String(end);

  const url = `https://serpapi.com/search.json?engine=google_maps_directions&start_addr=${encodeURIComponent(startStr)}&end_addr=${encodeURIComponent(endStr)}&travel_mode=3&api_key=${SERPAPI_KEY}`;

  try {
    const response = await axios.get<DirectionsResponse>(url);
    const data = response.data;

    if (data.error) {
      return res.status(502).json({ error: `SerpApi 錯誤：${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('SerpApi 請求失敗:', error.message);
    return res.status(500).json({ error: '無法連線到 SerpApi，請稍後再試' });
  }
}

