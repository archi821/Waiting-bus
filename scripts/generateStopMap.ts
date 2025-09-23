import fs from 'fs';
import path from 'path';

const stopsPath = path.resolve(__dirname, '../public/viatrain_gtfs/stops.txt');
const outputPath = path.resolve(__dirname, '../src/stopMap.ts');

const raw = fs.readFileSync(stopsPath, 'utf-8');
const lines = raw.split('\n').filter((line) => line.trim() !== '');
const headers = lines[0].split(',').map((h) => h.trim());

const stop_id_index = headers.indexOf('stop_id');
const timezone_index = headers.indexOf('stop_timezone');

if (stop_id_index === -1 || timezone_index === -1) {
  throw new Error('❌ stops.txt 缺少 stop_id 或 stop_timezone 欄位');
}

const stopMap: Record<string, string> = {};

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(',').map((c) => c.trim());
  const stop_id = cols[stop_id_index];
  const timezone = cols[timezone_index];

  if (stop_id && timezone) {
    stopMap[stop_id] = timezone;
  }
}

const output = `export const stopMap: Record<string, string> = ${JSON.stringify(stopMap, null, 2)};\n`;

fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`✅ stopMap.ts 已生成，共 ${Object.keys(stopMap).length} 筆`);




