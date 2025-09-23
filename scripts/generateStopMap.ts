import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// 🔧 stops.txt 的絕對路徑（不動它）
const inputPath = path.resolve(
  '/workspaces/Waiting-bus/public/viatrain_gtfs/stops.txt'
);
const raw = fs.readFileSync(inputPath, 'utf8');

// ✅ 定義 stops.txt 的欄位型別
type StopRow = {
  stop_id: string;
  stop_name: string;
  stop_timezone?: string;
};

// ✅ 解析 CSV 成物件陣列
const records = parse(raw, {
  columns: true,
  skip_empty_lines: true,
}) as StopRow[];

// ✅ 建立 stopMap：以 stop_id 為 key
const stopMap: Record<string, StopRow> = {};

for (const row of records) {
  if (!row.stop_id || !row.stop_name) {
    console.warn(`⚠️ 無效資料列，略過: ${JSON.stringify(row)}`);
    continue;
  }

  stopMap[row.stop_id] = {
    stop_id: row.stop_id,
    stop_name: row.stop_name,
    stop_timezone: row.stop_timezone,
  };

  if (!row.stop_timezone) {
    console.warn(`⚠️ stop_id ${row.stop_id} (${row.stop_name}) 缺少 stop_timezone`);
  }
}

// ✅ 輸出成 TypeScript 檔案（你可以自由指定位置）
const outputPath = path.resolve(__dirname, '../src/stopMap.ts');
const outputContent = `export const stopMap = ${JSON.stringify(stopMap, null, 2)};\n`;

fs.writeFileSync(outputPath, outputContent);

console.log(`✅ stopMap.ts 已產生，共 ${Object.keys(stopMap).length} 筆站點`);


